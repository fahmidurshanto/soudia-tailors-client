import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import OrderPage from "../pages/OrderPage/OrderPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import AdminLoginPage from "../pages/AdminLoginPage/AdminLoginPage";

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
            }
        ]
    }
])


export default router