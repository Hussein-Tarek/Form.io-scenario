import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./custom.css";
import { Formio } from "formiojs";
import "./form.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./testingForms/Home";
import CreateForm from "./testingForms/CreateForm";
import EditForm from "./pages/EditForm";
import "./i18n";
import Form from "./pages/Form";
import CreateForm2 from "./testingForms/CreateForm2";
import Login from "./testingForms/Login";
import Wizard from "./pages/Wizard/Wizard";

export const projectUrl = "http://k8s.formio.com/fanknyjocegbdzz";
// Formio.setProjectUrl(projectUrl);
Formio.setApiUrl(projectUrl);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/create", element: <CreateForm /> },
      { path: "/create2", element: <CreateForm2 /> },
      { path: "/edit/:id", element: <EditForm /> },
      { path: "/login", element: <Login /> },
      { path: "/forms/:name/:path?", element: <Form /> },
      { path: "/wizard", element: <Wizard /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
