import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";
import {ReduxStoreType} from "../../redux/types/reduxStoreTypes";
const {pathArray} = require('../../components/pathArray');

export default function Navbar() {


    const uId = useSelector((state: ReduxStoreType) => state.userState.uId);

    const navigate = useNavigate();
    const location = useLocation();

    const [userId, setUserId]    = useState <string  >     (uId);
    const [navPaths, setNavPath] = useState <string[]>     ();
    const currentLocation = location.pathname.slice(1) === "" ? 'home' : location.pathname.slice(1);
    let routs = pathArray;

    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });

    function handleClick([locate, name]: string[]) {
        document.title = name;
        navigate(`/${locate === 'Home' ? '' : locate}`);
    };

    useEffect(() => {
        if(uId){
            routs = pathArray.slice(0,4);
            setUserId(uId);
        } else {
            routs = pathArray.slice(4);
        }

        setNavPath(routs.map((item: string[]) => {
            let element = (
                <li key={item[0]} className={currentLocation.toLowerCase() === item[0].toLowerCase() ? `${item[0]} selected` : `${item[0]}`} onClick={() => handleClick(item)}> {isDesktopOrMobile ? item[1] : null}
                </li>
            );
            return element;
        }));
    },[uId, currentLocation])

    let userElement;

    //if(userId) userElement = uId ? <p className="userIn" >{'Welcome: ' + uId}</p> : <p className="userGuest" >{"ЗДравствуй десперато..."}</p>


    return(
        <div className={isDesktopOrMobile ? 'Navbar-Desktop' : "Navbar-Mobile"}>
            <ol className={isDesktopOrMobile ? 'Navbar-Desktop' : "Navbar-Mobile"}>{navPaths}</ol>
        </div>
            );
}

//TODO: попробовать сделать список хуйни и ченить срендерить