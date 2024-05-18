import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";
import App from "../App";
import ProtectedRoute from "../layout/ProtectedRoute";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";
import SalesHistory from "../pages/SalesHistory";
import EditProduct from "../pages/EditProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><App /></ProtectedRoute>,
        children: [
            // {
            //     path: "/",
            //     element: <Dashboard />
            // },
            {
                path: "/",
                element: <ManageProducts />
            },
            {
                path: "/add-product",
                element: <AddProduct />
            },
            {
                path: "/edit-product/:id",
                element: <EditProduct />
            },
            {
                path: "/sales-history",
                element: <SalesHistory />
            },
        ]
    },
    {
        path: "/auth/sign-in",
        element: <SignIn />,
    },
    {
        path: "/auth/sign-up",
        element: <SignUp />,
    },
]);

export default router;