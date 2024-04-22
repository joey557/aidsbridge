import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MediaCard from "./pages/ArticlesPage";
import EventsAccordion from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LocatorPage from "./pages/LocatorPage";
import LoginPage from "./pages/LoginPage";


const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                Component: HomePage,
                index: true
            },
            {
                path: '/articles',
                Component: MediaCard
            },
            {
                path: '/events',
                Component: EventsAccordion
            },
            {
                path: '/find-services',
                Component: LocatorPage
            },
            {
                path: '/login',
                Component: LoginPage
            }
        ]
    }
]);

export default router;