import {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";

export default function PageLayout() {
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        // Detect network changes
        window.addEventListener("offline", () => {
            // navigate("/offline", {state: location});

        });

        window.addEventListener("online", () => {
            // navigate(location.state.pathname);

        });
    }, []);
    return <Outlet/>;
}
