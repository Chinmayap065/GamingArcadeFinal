import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import CreateMemberPage from './pages/CreateMemberPage.jsx';
import AddGamePage from './pages/AddGamePage.jsx';
import MemberDetailsPage from './pages/MemberDetailsPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import ManageGamesPage from './pages/ManageGamesPage.jsx';
import ManageMembersPage from './pages/ManageMembersPage.jsx';
import RechargePage from './pages/RechargePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "member/:phone", element: <MemberDetailsPage /> },
      { path: "create-member", element: <CreateMemberPage /> },
      { path: "recharge-member", element: <RechargePage /> },
      { path: "add-game", element: <AddGamePage /> },
      { path: "manage-games", element: <ManageGamesPage /> },
      { path: "manage-members", element: <ManageMembersPage /> },
      { path: "collections", element: <CollectionsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
  </React.StrictMode>,
);