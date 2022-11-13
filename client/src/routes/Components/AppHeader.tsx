import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReduxStoreType} from "../../redux/types/reduxStoreTypes";
import axios from "axios";
import {pageDataTypes} from "../routeComponents/Page/Page";
import {useNavigate} from "react-router-dom";
import FindUsersChat from "./FindUsersChat";
import {useMediaQuery} from "react-responsive";
const {getPageConfiguration} = require('../../components/axiosConfigs/getPageConfiguration');


export default function AppHeader(){
    const navigate = useNavigate();
    const [user, setUser] = useState<pageDataTypes>();
    const {uId, myPage} = useSelector((state: ReduxStoreType) => state.userState);
    const isDesktopOrMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });
    let pageCabinet;

    useEffect(()=>{
        if(!uId || !myPage) return;
        axios(getPageConfiguration(uId))
            .then(result => {
                setUser(result.data.page);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, [uId])

    if(user) {
        pageCabinet = (
            <>
            <img className='ChatHeaderImage' src={user.profilePhoto}/>
            <div>
                <div className='Cabinet'>
                    <span>{"Привет, " + user.firstName}</span>
                    <a onClick={() => navigate(`/${uId}`)}>Моя Страница</a>
                    <a onClick={() => navigate(`/logout`)}>Выйти</a>
                </div>
            </div>
            </>
        )
    }

    return (
      <div className={isDesktopOrMobile ? 'AppHeader': 'AppHeader Mobile'}>
          <div onClick={event => navigate('/')}>
          <img className='LogoHeader' src={'LogoHeader.svg'}/>
          </div>
          {isDesktopOrMobile ? <img className='TextHeader' src={'TextHeader.svg'}/> : null}
          <FindUsersChat source={'app'}/>
          {isDesktopOrMobile ? (pageCabinet ||
              <div className='Cabinet'>
                  <span>Привет, Гость!</span>
                  <div onClick={() => navigate(`/login`)}>Войти</div>
                  <div onClick={() => navigate(`/registration`)}>Зарегистрироваться</div>
              </div>)
          : null}
      </div>
    );
}