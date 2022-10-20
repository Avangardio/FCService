import React, {useEffect, useState, useRef} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {ReduxStoreType} from "../../../redux/types/reduxStoreTypes";
import {useParams} from "react-router-dom";
import userPageCalcAge from '../../../components/utities/userPageCalcAge'

const {pageSetupConfiguration} = require('../../../components/axiosConfigs/pageSetupConfiguration');
const {getPageConfiguration} = require('../../../components/axiosConfigs/getPageConfiguration');


export interface pageDataTypes  {
    aboutMe       : string
    albums        : string[]
    city          : string | ""
    firstName     : string
    friends       : string[]
    lastName      : string
    posts         : string
    profilePhoto  : string
    uId           : string
    birthDay      : string
}

export default function UserPage(){

        const uId = useSelector((state: ReduxStoreType) => state.userState.uId);

        const {pageId} = useParams()

        const [pageLoaded, setPageLoaded] = useState<boolean>()
        const [pageExist, setPageExist]   = useState<boolean>()
        const [pageData, setPageData] =     useState<pageDataTypes>()

        console.log(pageExist);

        useEffect(()=>{
            axios(getPageConfiguration(pageId))
                .then(result => {
                    setPageData(result.data.page);
                    setPageExist(true)
                    setPageLoaded(true);
                    document.title = result.data.page.firstName + ' ' + result.data.page.lastName;
                })
                .catch(error => {
                    setPageLoaded(true);
                    if (error.response.status === 404) setPageExist(false);
                    document.title = "Страница";
                })
        },[pageId])

        let userPageLoaded;
        if(pageExist === false) return <div>Страница не найдена.</div>;

        if(pageLoaded) {
            userPageLoaded =
                <div className='UserPage'>
                    <div>
                        <h1>{`${pageData?.firstName} ${pageData?.lastName}`}</h1>
                        <div><b>{pageData?.birthDay ? userPageCalcAge(pageData?.birthDay) : null}</b></div>
                        <p><b>Город: </b>{`${pageData?.city}`}</p>
                        <p><b>О себе: </b>{pageData?.aboutMe}</p>

                    </div>
                    <img src={pageData?.profilePhoto} />
                </div>
        }

        return (
            userPageLoaded ? userPageLoaded : <p>Loading page...</p>
        )
    }
