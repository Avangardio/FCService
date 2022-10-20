import {useEffect} from "react";
import axios from "axios";
import {logoutConfiguration} from '../../../components/axiosConfigs/logoutConfiguration';
import {useNavigate} from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();
    useEffect(() => {
       axios(logoutConfiguration())
           .then(result => {
               navigate('/');
               window.location.reload();
           })
           .catch(error => {
               window.location.reload();
           })
    }, []);
    return <div>Loading</div>
}