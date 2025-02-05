import ErrorPage from "./error-page";
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from "./routes/Contact";
import { action as destroyAction } from "./routes/Destroy";
import EditContact, {
  action as editAction,
} from "./routes/edit";
import Index from "./routes/Index";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "./routes/root";

const routes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [{
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {path: "contacts/:contactId", 
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ]
      }]
    },
]

export { routes };
