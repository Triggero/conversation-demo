import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";
import Conversation from "./pages/Conversation";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Home
          <Link to={"/conversation"}>Conversation</Link>
        </div>
      ),
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/conversation",
      element: <Conversation />,
      errorElement: <div>404 Not Found</div>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
