import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import OrderPage from "../pages/OrderPage/OrderPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import AdminLoginPage from "../pages/AdminLoginPage/AdminLoginPage";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Error from "../pages/Error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path: "/order",
                element: <OrderPage/>
            },
            {
                path: "/contact",
                element: <ContactPage/>
            },
            {
                path: "/admin/login",
                element: <AdminLoginPage/>
            },
            {
                path: "/admin/dashboard",
                element: (
                    <ProtectedRoute>
                        <AdminDashboard/>
                    </ProtectedRoute>
                )
            }
        ],
        errorElement: <Error />
    }
])


export default router