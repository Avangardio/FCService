import React, {ReactNode, useEffect, useState} from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {ReduxStoreType} from "../redux/types/reduxStoreTypes";
import axios from "axios";
import allActions from "../redux/actions/userAction";
import {authConfiguration} from "../components/axiosConfigs/authConfiguration";
const cookies = new Cookies();


interface Props {
    children?: ReactNode
}

// receives component and any other props represented by ...rest
export default function ProtectedRoutes ({ children, ...rest }: Props) {

    const [pageLoaded, setPageLoaded] = useState(false);
    const [userLogged, setUserLogged] = useState(false);


    useEffect(() => {
        axios(authConfiguration())
            .then((response) => {
                setPageLoaded(true);
                setUserLogged(true);
            })
            .catch((error) => {
                setPageLoaded(true);
                setUserLogged(false);
            });

    },[])

    let pageStatus;

    if(pageLoaded)
        pageStatus =
            userLogged ? <Outlet/> : <Navigate to={'/login'}/>

    return (
        <div>{pageStatus}</div>
    )
};