import * as React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home";
import './App.css'

export default function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children:{
        path: "/:keyword",
        element: <Home />
      }
    },
  ]);

  return element;
}