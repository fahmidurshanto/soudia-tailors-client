import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import OrderPage from "../pages/OrderPage/OrderPage";

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
            }
        ]
    }
])


export default router