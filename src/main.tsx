import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Creator from "./components/Creator.tsx";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { brown, green, indigo, purple, yellow } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    primary: purple,
    secondary: brown,
  },
});

theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/create",
            element: <Creator />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
