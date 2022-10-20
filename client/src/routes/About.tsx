import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import {ReduxStoreType} from "../redux/types/reduxStoreTypes";
import {getPageConfiguration} from "../components/axiosConfigs/getPageConfiguration";

export default function About(){
    axios(getPageConfiguration('id0'))
        .then(result => console.log( result.data.page))
        .catch(error => console.log(error));
    useEffect(() => {
        }, []);

    return(
        <div>
            <p>This is a ABOUT page :)</p>
        </div>
    )
}