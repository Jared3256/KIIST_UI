import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation, useNavigate} from "react-router";
import {selectAuth} from "src/redux/auth/selectors";
import useRefreshToken from "src/service/useRefreshToken";
import RequireAuthLayout from "./RequireAuthLayout";
import PageLoader from "src/components/PageLoader";
import useAxiosPrivate from "src/service/useAxiosPrivate.ts";
import {GetFinance} from "src/redux/finance/actions.ts";
import {selectFinance} from "src/redux/finance/selectors.ts";

export default function PersistAccess() {
    const {current} = useSelector(selectAuth);
    const {currentFinance} = useSelector(selectFinance);
    const refresh = useRefreshToken();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [financeInfo, setFinanceInfo] = useState({});
    const hotAxiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch();


    const checkAuthenticationStatus = async () => {
        // await refresh();
        if (current.UserInfo === null) {
            setIsLoading(false);
            return <Navigate to={"/auth/login"} state={{from: location}} replace/>;
        }
    };

    const checkSuspensionStatus = async () => {
        if (current?.UserInfo?.entity?.suspended) {

            navigate("/suspended", {
                replace: true
            })
        }
    }

    const checkFinanceStatus = async () => {

        if (current.UserInfo.role === "student") {

            dispatch(GetFinance({
                role: current.UserInfo.role,
                id: current.UserInfo.entity._id,
                hotAxiosPrivate: hotAxiosPrivate,
                entity: "finance"
            }))
        }
    }


    useEffect(() => {
        const systemChecker = async () => {
            await checkAuthenticationStatus();
            await checkSuspensionStatus()
            await checkFinanceStatus()
        }
        systemChecker()

        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        !current.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);
    return (
        <>
            {current?.UserInfo ? (
                <RequireAuthLayout/>
            ) : isLoading ? (
                <PageLoader/>
            ) : (
                <RequireAuthLayout/>
            )}
        </>
    );
}
