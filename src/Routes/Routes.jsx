import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../pages/Home/Home";
import Measurement from "../pages/Measurement/Measurement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
               path: "/",
               element: <Home></Home>
            },
            {
                path: "/measurement",
                element: <Measurement></Measurement>
            }
        ]
    }
])


export default router;