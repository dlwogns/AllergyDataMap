import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const AboutUsPage = lazy(() => import("../pages/AboutUsPage.js"));
const UserManagePage = lazy(() => import("../pages/UserManagePage"));
const TotalDataPage = lazy(() => import("../pages/TotalDataPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const MakeFilePage = lazy(() => import("../pages/MakeFilePage"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/totaldatapage" /> },
      { path: "/aboutus", exact: true, element: <AboutUsPage /> },
      { path: "/usermanagepage", exact: true, element: <UserManagePage /> },
      { path: "/totaldatapage", exact: true, element: <TotalDataPage /> },
      { path: "/searchpage", exact: true, element: <SearchPage /> },
      { path: "/makefilepage", exact: true, element: <MakeFilePage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
];

export default ThemeRoutes;
