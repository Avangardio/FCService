import React, {useState, useRef, useEffect, lazy}                           from 'react';
import { useQueryParam, NumberParam, StringParam, ArrayParam, withDefault } from 'use-query-params';
import {useSelector, useDispatch, useStore}                                 from 'react-redux';
import {SocketIO}                                                           from  '../components/socket/socketIO';
import {useMediaQuery}                                                      from "react-responsive";

const FeedChat    = lazy(() => import('./routeComponents/Feed/FeedChat'   ));
const FeedOverall = lazy(() => import('./routeComponents/Feed/FeedOverall'));
const FeedFilters = lazy(() => import('./routeComponents/Feed/FeedFilters'));

const socket = SocketIO.instance.socket;

 export default function Feed() {
     const [currentChat, setCurrentChat] = useQueryParam('chat', StringParam);
     const [filter, setFilter] = useState();
     const isDesktopOrMobile = useMediaQuery({
         query: '(min-width: 500px)'
     });

     let chatOption;

     chatOption = (<FeedOverall/>);
     if(currentChat !== undefined) chatOption = (<FeedChat/>);

     return (
         <div className='ChatApp'>
             {chatOption}
             {isDesktopOrMobile ? <FeedFilters/> : null}
         </div>
     )
 };
