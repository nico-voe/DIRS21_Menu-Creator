import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Form from "./components/Form";
import Edit from "./components/Edit";
import MenuCard from "./components/MenuCard";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="root">
        <Form />
        <div className="open-menu">
          <Link to="/menu">Go to Menu</Link>
        </div>
      </div>
    ),
  },
  {
    path: "menu",
    element: (
      <div className="root">
        <MenuCard />
        <div className="open-menu-edit">
          <Link to="/">Add Dish</Link>
        </div>
      </div>
    ),
  },
  {
    path: "menu/edit/:id",
    element: (
      <div className="root">
        <Edit />
        <div className="open-menu-edit">
          <Link to="/menu">Go to Menu</Link>
        </div>
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
