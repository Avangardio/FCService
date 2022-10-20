import React, {Suspense, useEffect, useState} from 'react';
import {BrowserRouter as Router}              from 'react-router-dom';
import AppRoutes                              from "./routes/AppRoutes";
import Navbar                                 from "./routes/Components/Navbar";
import {ToastContainer, toast}                from "react-toastify";
import allActions                             from './redux/actions/userAction';
import NewMessage                             from "./components/utities/NewMessageHandler";
import axios                                  from "axios";
import {useSelector, useDispatch}             from 'react-redux';
import {ReduxStoreType}                       from "./redux/types/reduxStoreTypes";
import {SocketIO}                             from  './components/socket/socketIO';
import {QueryParamProvider}                   from "use-query-params";
import AppHeader                              from "./routes/Components/AppHeader";
import {useMediaQuery}                        from "react-responsive";
import {ReactRouter6Adapter}                  from "use-query-params/adapters/react-router-6";
const {authConfiguration}                     = require('./components/axiosConfigs/authConfiguration');
const socket = SocketIO.instance.socket;

export default function App (){
    const dispatch = useDispatch();
    const {uId, myPage} = useSelector((state: ReduxStoreType) => state.userState);
    const [appLoaded, setAppLoaded] = useState<boolean>(false);
    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });

    if(!isDesktopOrMobile) {
    }

    useEffect(()=> {
        // make the API call
        if(!appLoaded) {
            axios(authConfiguration())
                .then((response) => {
                    dispatch(allActions.authUser(response.data.uId, response.data.myPage));
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => setAppLoaded(true))
        }
        if(!uId) return;
        socket.emit("FEED_INIT", {user: uId});
//todo доделать адаптивку и чтоб апп знал при загрузке\изменении
        socket.on("NEW_MESSAGE", function (data) {
            if(isDesktopOrMobile) toast(<NewMessage newMessage={data}/>, {
                position: "bottom-right",
                    autoClose: 5000,
                className: 'NewMessageNotification',
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
            });
            dispatch(allActions.newMessage(data.chatId, data.message, data.chatProfiles));
        });
        socket.on("CHAT_USER_READ_ANSWER", function ({chatId, host}){
            console.log('Got '+ host);
            const calcHost = chatId.replace(host, "");
            dispatch(allActions.markAsRead(chatId, calcHost));
        });
        socket.on("FEED_INIT_ANSWER" , function (answer) {
            console.log(answer);
            dispatch(allActions.initFeed(answer));
        });

        return () => {
            socket.off('connect'              );
            socket.off('NEW_MESSAGE'          );
            socket.off('FEED_INIT_ANSWER'     );
            socket.off("CHAT_USER_READ_ANSWER");
        };
        },[uId])

    return (

        <Router>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
            <AppHeader />
            {<Navbar/>}
            <Suspense fallback={<div>Loading...</div>}>
                 <AppRoutes />
            </Suspense>
            <ToastContainer />
            </QueryParamProvider>
        </Router>

    )
};
