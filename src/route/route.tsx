import { createBrowserRouter } from "react-router";
import Admin from "../layout/admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Admin/>
    }
]);

export default router;