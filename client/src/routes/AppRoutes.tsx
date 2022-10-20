import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import React, {lazy} from "react";
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {useSelector} from "react-redux";
import {ReduxStoreType} from "../redux/types/reduxStoreTypes";
import {useMediaQuery} from "react-responsive";

const Home             = lazy(()=>  import('./Home')                            );
const About            = lazy(()=>  import('./About')                           );
const Feed             = lazy(()=>  import('./Feed')                            );
const RegistrationPage = lazy(()=>  import('./RegistrationPage')                );
const LoginPage        = lazy(()=>  import('./LoginPage')                       );
const ProtectedRoutes  = lazy(()=>  import('./ProtectedRoute')                  );
const PageSetup        = lazy(()=>  import('./routeComponents/Page/PageSetup')  );
const UserPage         = lazy(()=>  import('./routeComponents/Page/Page')       );
const Logout           = lazy(() => import('./routeComponents/Account/Logout'));

export default function AppRoutes() {
    const {uId, myPage} = useSelector((state: ReduxStoreType) => state.userState);
    const navigate = useNavigate();
    const currentLocation = window.location.pathname.toLowerCase();
    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });

    if((!myPage && currentLocation !== '/pagesetup') && (currentLocation.slice(0,3) !== '/id') && ['login', 'registration'].includes(currentLocation)) navigate('/pageSetup');

    return (
            <div className={isDesktopOrMobile ? "AppRoutes Desktop" : "AppRoutes Mobile"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path='/:pageId' element={<UserPage/>}/>

                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/pageSetup" element={<PageSetup/>}/>
                        <Route path="/feed/" element={<Feed/>}/>
                    </Route>

                    <Route path={"/logout"} element={<Logout/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
    );
}