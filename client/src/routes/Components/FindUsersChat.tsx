import React, {ReactNode, useEffect, useId, useState} from "react";
import {SocketIO} from "../../components/socket/socketIO";
import {ChatProfilesType} from "../../redux/types/reduxStoreTypes";
import {useNavigate} from "react-router-dom";
import {StringParam, useQueryParam} from "use-query-params";
import {useMediaQuery} from "react-responsive";

const socket = SocketIO.instance.socket;

export default function FindUsersChat({source}: {source: string}){
    const [search, setSearch]  = useState<string>();
    const [focus, updateFocus] = useState<boolean>(false);
    const [result, setResult]  = useState<ReactNode[]>();
    const navigate = useNavigate();
    const [currentChat, setCurrentChat] = useQueryParam('chat', StringParam);
    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });

    useEffect(() => {
        socket.on("FIND_USERS_INPUT_ANSWER", function (data){
            setResult(data.map((result: ChatProfilesType) => {
                const {firstName, lastName, profilePhoto, uId} = result;
                return (
                    <li onMouseDown={event => {
                        handleClick(source, uId!);
                    }}>
                        <img src={profilePhoto} alt={firstName}/>
                        <div>{firstName + " " + lastName}</div>
                    </li>
                )
            }))
        });
        return (()=> {
            socket.off('FIND_USERS_INPUT_ANSWER');
        })
    }, []);
    function handleClick(source: string, uId: string){
        if(source !== 'app') {
            setCurrentChat!(uId);
            return;
        }
            navigate(`/${uId}`);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        setSearch(value);
        updateFocus(true)
    };
    function handleBlur(event: React.FocusEvent<HTMLElement>) {
            setSearch('');
            updateFocus(false);
            setResult([])
            return;
    };


    useEffect(() => {
        if(search === '') {
            setResult([]);
            return;
        }
        socket.emit('FIND_USERS_INPUT', search);
    }, [search])

//{focus ? {visibility: 'visible', display: 'block'} : {visibility: 'hidden', display: "none"}

    return (
        <div className={isDesktopOrMobile ? "FindUsersInput" : "FindUsersInput Mobile"} onBlur={handleBlur}>
            <input placeholder={'Найти собеседника...'} value={search} onChange={event => {setSearch(event.target.value)}} onFocus={handleChange} />
            <ol style={focus ? {visibility: 'visible', display: 'grid'} : {visibility: 'hidden', display: 'none'}} className={'FindUsersInput'}>
                {result}
            </ol>
        </div>
    )
}