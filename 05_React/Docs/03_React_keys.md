### Prop keys
React **`keys`** are like identifiers for components on a webpage. In the list example, if the list were to change, one of two things should happen:
1. we completely re-render the entire list, or:
2. we hunt down the specific items that were changed and only re-render those.

Assuming we want to hunt down that one specific item that was changed and NOT re-render the entire list, we need something to track that specific item. We can track down a specific item by using a `key`. <br>

When the list is updated for whatever reason (either from a server or a user interaction), React matches the `keys` of each of the previous list items to the updated list. If there were any changes, React will only update the items that have changed. <br>

As long as `keys` remain consistent and unique, React can handle the *DOM* effectively and efficiently. Keys are passed into the component or a DOM 
element as a prop. 
```JS
<Component key={keyValue} />
//or
<div key={keyValue} />
```

### What should be used for keys?
Ideally, there should be some identifier that is unique to each item in the list. Most databases assign a unique id to each entry, so you shouldn’t 
have to worry about assigning an id yourself. <br>

If you are defining data yourself, it is good practice to assign a unique id to each item. You can use the 
[crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) function to generate a unique id.

```JS
// a list of todos, each todo object has a task and an id
const todos = [
  { task: "mow the yard", id: crypto.randomUUID() },
  { task: "Work on Odin Projects", id: crypto.randomUUID() },
  { task: "feed the cat", id: crypto.randomUUID() },
];

function TodoList() {
  return (
    <ul>
      {todos.map((todo) => (
        // here we are using the already generated id as the key.
        <li key={todo.id}>{todo.task}</li>
      ))}
    </ul>
  );
}
```

>[!Important]
> Additionally, if you’re sure the list ***will remain unchanged*** throughout the application’s life, you can use the array index as a key. However, this is not recommended since it can lead to confusing bugs if the list changes when items are deleted, inserted, or rearranged.

Keys should never be generated on the fly. Using `key={Math.random()}` or `key={crypto.randomUUID()}` while rendering the list defeats the purpose of 
the key, as now a new key will get created for every render of the list.
```JS
// DON'T do the following i.e. generating keys during render
<li key={crypto.randomUUID()}>{todo.task}</li>
```

Different sources of data provide different sources of keys:
- **Data from a database**: If your data is coming from a database, you can use the database keys/IDs, which are unique by nature.
- **Locally generated data**: If your data is generated and persisted locally (e.g. notes in a note-taking app), use an incrementing counter, 
  `crypto.randomUUID()` or a package like `uuid` when creating items.


***Keys must be unique among siblings***. However, it’s okay to use the same keys for JSX nodes in different arrays.


- Conditions to use index as key
  1. The items in your list do not have a unique id.
  2. The list is a static list and will not change.
  3. The list will never be reordered or filtered.


Check out this [article](https://www.developerway.com/posts/react-key-attribute) for best practices for setting the key attribute.