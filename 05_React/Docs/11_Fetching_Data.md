### Fetching Data
Data in client components can mainly be retriebed using `useEffects`. Server components can use ***async/await*** which is not available outside 
useEffects in client components. When using useEffect, you need to account for 
1. The data you're trying to retrieve
2. The error state
3. The loading state

These 3 values cannot be retrieved as variables when using the fetch api, hence they're best monitored using `useState()` hooks. An example below
```JS
const Image = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURL(response[0].url))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>An image</h1>
      <img src={imageURL} alt={"placeholder text"} />
    </>
  );
};

```
shows how 3 state variables are updated during the lifecycle of the fetch request. This enables us to properly rendering data if the request is 
successful, capture specific errors, and display modals like loading animations for pending data. Whenever fetch requests are replicated across 
components, it makes sense to create custom hooks to reduce repeated code
```JS
import { useState, useEffect } from "react";

const useImageURL = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setImageURL(response[0].url))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { imageURL, error, loading };
};

const Image = () => {
  const { imageURL, error, loading } = useImageURL();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>An image</h1>
      <img src={imageURL} alt={"placeholder text"} />
    </>
  );
};
```
>[!Note]
> The custom hooks can only be used in client components. Wrappers will have to defined to **`render data`** from useEffect hooks in server components.

### Improving performance when loading Data.
This section is culled from this blog [post](https://www.developerway.com/posts/how-to-fetch-data-in-react).When dealing with multiple children requesting for data, writing individual 
useEffects/hooks in each component leads to a waterfall effect where each component is delayed from rendering till the other components get data

<div style="width:500px; margin: 0 auto;">
<img src="https://www.developerway.com/assets/how-to-fetch-data-in-react/classic-waterfall-example.png">
<div style="text-align: center">React data requests waterfall example</div>
</div>

> [!Important]
> `await` is asynchronous ***blocking***, `fetch` is asynchronous ***non-blocking***

Defining a single `useEffect` hook with all the data like below is inefficient
```JS
useEffect(async () => {
  const sidebar = await fetch('/get-sidebar');
  const issue = await fetch('/get-issue');
  const comments = await fetch('/get-comments');
}, []);
```
And causes the same serial fetch issues as when the effects are triggered independently in each component. A potential resolution to improve performance will be to use 
**`Promise.all()`** to retrieve the data in a parent component and pass the data independently to each child component using **props**
```JS
const useAllData = () => {
  const [sidebar, setSidebar] = useState();
  const [comments, setComments] = useState();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      // waiting for allthethings in parallel
      const result = (
        await Promise.all([
          fetch(sidebarUrl),
          fetch(issueUrl),
          fetch(commentsUrl),
        ])
      ).map((r) => r.json());

      // and waiting a bit more - fetch API is cumbersome
      const [sidebarResult, issueResult, commentsResult] =
        await Promise.all(result);

      // when the data is ready, save it to state
      setSidebar(sidebarResult);
      setIssue(issueResult);
      setComments(commentsResult);
    };

    dataFetch();
  }, []);

  return { sidebar, comments, issue };
};

const App = () => {
  // all the fetches were triggered in parallel
  const { sidebar, comments, issue } = useAllData();

  // show loading state while waiting for all the data
  if (!sidebar || !comments || !issue) return 'loading';

  // render the actual app here and pass data from state to children
  return (
    <>
      <Sidebar data={sidebar} />
      <Issue comments={comments} issue={issue} />
    </>
  );
};
```

<div style="width:400px; margin: 0 auto;">
<img src="https://www.developerway.com/assets/how-to-fetch-data-in-react/promise-all-example.png">
<div style="text-align: center">Concurrent data requests from parent component with single re-render example</div>
</div>

This gives a more performant application, but the biggest issue is that data is rendered only when the slowest component loads. The time it takes to render the component on the app 
is now determined by how long the slowest component takes to load (in this case, the fetch comments). <br><br>

**Parallel promises** can be implemented to imporove on this design. In a single `useEffect`, trigger all the data requests using **non-blocking** `fetch`. Still drawing from the 
parent -> props pipeline, every fetch request is fired in parallel but resolved independently. 
```JS
fetch('/get-sidebar')
  .then((data) => data.json())
  .then((data) => setSidebar(data));
fetch('/get-issue')
  .then((data) => data.json())
  .then((data) => setIssue(data));
fetch('/get-comments')
  .then((data) => data.json())
  .then((data) => setComments(data));
```
This results in a solution where components that receive data first are rendered before others. This is a on demand solution.

<div style="width:400px; margin: 0 auto;">
<img src="https://www.developerway.com/assets/how-to-fetch-data-in-react/parallel-promises-example.png">
<div style="text-align: center">Concurrent data requests from parent component with multiple re-render example</div>
</div>

The caveat of this approach is that we’re triggering state change three times independently, which will cause three re-renders of the parent component. If any of the components 
are heavy, it can also result in a loss of performance but other techniques like the `useMemo()` hook can be used to minimize state re-renders. Check this blog 
[post](https://www.developerway.com/posts/react-re-renders-guide) for additional info related to minimizing re-renders, and this 
[one](https://www.developerway.com/posts/react-elements-children-parents) to improve understanding of how parent and child components affect each other during re-rendering.<br><br>

To minimize dealing with props passing from parent to child components, we can also use **context providers**. Context providers allow us to request for data high up in the 
tree, and multiple context providers can be wrapped around each other, while still maintaining the parallel fetch requests we've come to like so much e.g.
```JS
export const VeryRootApp = () => {
  return (
    <SidebarDataProvider>
      <IssueDataProvider>
        <CommentsDataProvider>
          <App />
        </CommentsDataProvider>
      </IssueDataProvider>
    </SidebarDataProvider>
  );
};
```
This means that to access data in any of the child components within `<App />`, we can use custom hooks like `const comments = useComments();`. This means that on state change 
in any of the contextProviders, only components that use data/context from that provider will be re-rendered. To learn more about improving performance with context, check out 
this [blog post](https://www.developerway.com/posts/how-to-write-performant-react-apps-with-context). <br>

Lastly, learn how `useSWR()` hook works for data fetching. Don't forget, you still have to follow the rules above to make the app performant, the custom hooks just simplify some 
specific tasks like individual fetch requests, error handling, and caching.
