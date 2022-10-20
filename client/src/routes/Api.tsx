import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector, useDispatch, useStore } from 'react-redux';
import {ReduxStoreType} from "../redux/types/reduxStoreTypes";


const cookies = new Cookies();

export default function Api(){

    const feedStore = useSelector((state: ReduxStoreType) => state.feedState);
    console.log(feedStore)


    return(
        <div>
            <p>This is a API page :)</p>
            <p>{}</p>
        </div>
    )
}