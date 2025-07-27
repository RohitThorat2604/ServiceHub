import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AdminHome from './admin-component/AdminHome';
import AdminDashboard from './admin-component/AdminDashboard';
import ErrorPage from './admin-component/ErrorPage';
import AddProviderForm from './admin-component/AddProviderForm';
import ManageCategories from './admin-component/ManageCategories';
import ManageProviders from './admin-component/ManageProviders';
import AddServiceCategoryForm from './admin-component/AddServiceCategory';
import UserDashboard from './user-component/UserDashboard';
import UserHome from './user-component/UserHome';
import ManageRequests from './admin-component/ManageRequests';
import BookServiceForm from './user-component/BookServiceForm';
import ServiceCategoryList from './user-component/ServiceCategoryList';
import AllProviders from './user-component/AllProviders';
import EditProvider from './admin-component/EditProvider';
import './UserHome.css';
import AboutUs from './user-component/AboutUs';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from './Context/AuthContext';
import UserServiceRequests from './user-component/UserServiceRequests';







let routes= createBrowserRouter([
   {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
 {
    path: "/admin",
    element: <AdminDashboard />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/admin",
        index: true,
        element: <AdminHome />
      },
       {
        path: "/admin/services",        
        element: <ManageCategories/>  
      },
      {
        path: "services/add",
        element: <AddServiceCategoryForm />
      },
     
      {
        path: "/admin/providers/:categoryId",
        element: <ManageProviders/>
      },
       {
        path: "/admin/providers/add", 
        element: <AddProviderForm />
      },
      {
        path: "/admin/requests",
        element: <ManageRequests />
      },
      {
       path: "/admin/edit-provider/:providerId",
       element: <EditProvider/>
      }
     
    
    
    ]
  },
  {
  path: "/",
  element: <Navigate to="/user" />
},
{
  path: "/user",
  element: <UserDashboard />,
  children: [
    {
      index: true,
      element: <UserHome />
    },
    {
      path: 'services',
      element: <ServiceCategoryList />
    },
    {
      path: 'book/:categoryId/:providerId',
      element: <BookServiceForm/>
    },
    
    {
      path: "/user/providers/:id",
      element: <AllProviders />
    },
  
    {
      path:"/user/aboutUs",
      element:<AboutUs/>
    },
    {
      path: "/user/requests",
      element: <UserServiceRequests/>
    }

   

   
   
  ]
},



]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <RouterProvider router={routes}/>
<AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
);


