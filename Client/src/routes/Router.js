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
const DetailRegionPage = lazy(() => import("../pages/DetailRegionPage"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <Navigate to="/totaldatapage" /> },
      { path: "/aboutUs", exact: true, element: <AboutUsPage /> },
      { path: "/userManagePage", exact: true, element: <UserManagePage /> },
      { path: "/totalDataPage", exact: true, element: <TotalDataPage /> },
      { path: "/searchPage", exact: true, element: <SearchPage /> },
      { path: "/makeFilePage", exact: true, element: <MakeFilePage /> },
      { path: "/detailRegionPage", exact: true, element: <DetailRegionPage /> },
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
