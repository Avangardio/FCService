import React, { useState, useEffect } from 'react';
import axios from "axios";
import allActions from '../../../redux/actions/userAction';


import { useSelector, useDispatch, useStore } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {ReduxStoreType} from "../../../redux/types/reduxStoreTypes";
import RegistrationFinish from "./RegistrationFinish";


const {loginConfiguration} = require('../../../components/axiosConfigs/loginConfiguration');

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState<string>();
    const [nextStep, setNextStep]       = useState<boolean>(false);
    const [newId, setNewId]             = useState<string> ('');

    const navigate = useNavigate();


    const uId = useSelector((state: ReduxStoreType) => state.userState.uId);
    const dispatch = useDispatch();

    if(uId && window.location.pathname.toLowerCase() === '/login') navigate('/');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // make the API call
                axios(loginConfiguration(email, password))
                    .then((response) => {
                        if(!response.data.registrationCompleted) {
                            setNewId(response.data.user);
                            setNextStep(true);
                            return;
                        }
                            dispatch(allActions.authUser(response.data.uId, response.data.registrationCompleted));
                            setLoginResponse('Login Success');
                            window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoginResponse(error.response.data.message);
                    });
    };
    if(nextStep) return (<RegistrationFinish userId={newId}/>);
    return(
        <div>
            <form className={'LoginForm'} onSubmit={(e) => handleSubmit(e)}>
                <input value={email}     onChange={(e) => setEmail(e.target.value)}    required={true}  name="email"     placeholder={`Введите почту...`}   />
                <input value={password}  onChange={(e) => setPassword(e.target.value)} required={true}  name='password'  placeholder={`Введите пароль...`}/>
                <button type={"submit"}>Войти</button>
            </form>
            {loginResponse}
        </div>
    )

};