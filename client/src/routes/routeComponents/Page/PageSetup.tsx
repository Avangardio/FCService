import React, {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {ReduxStoreType} from "../../../redux/types/reduxStoreTypes";
import {toast} from "react-toastify";
import {SocketIO} from "../../../components/socket/socketIO";
import 'react-image-crop/dist/ReactCrop.css'

import ReactCrop, {Crop} from 'react-image-crop'

const socket = SocketIO.instance.socket;

const {pageSetupConfiguration} = require('../../../components/axiosConfigs/pageSetupConfiguration');
const {getPageConfiguration} = require('../../../components/axiosConfigs/getPageConfiguration');



export interface finishProps {
    userId?: string
}

export default function PageSetup({userId}: finishProps){
 //todo сделать верификацию изменения страницы чтоб мидлвэйром чекала айди пользователя и изменения!!!! отправляем uId свой чекаем с session userId и тогда пропускаем.
    const uId = useSelector((state: ReduxStoreType) => state.userState.uId);

    const [pageLoaded, setPageLoaded]       = useState  <boolean> (false);

    const [pageExist, setPageExist]         = useState  <boolean> ();

    const[newPhoto, setNewPhoto] = useState<boolean>(false);

    const [uploadedFile, setUploadedFile] = useState<string>('');
    const [uploadedFileScale, setUploadedFileScale] = useState<{width: number, height: number}>({width: 0, height: 0});
    const [uploadedAvatar, setUploadedAvatar] = useState();
    const [uploadedMiniAvatar, setUploadedMiniAvatar] = useState();

    const [firstName, setFirstName]         = useState  <string>  ('');
    const [lastName, setLastName]           = useState  <string>  ('');
    const [city, setCity]                   = useState  <string>  ('');
    const [aboutMe, setAboutMe]             = useState  <string>  ('');
    const [birthDay, setBirthDay]           = useState  <string>  ('');

    const [response, setResponse]           = useState  <string>  ('');
    const [crop, setCrop] = useState<Crop>({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    })



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios(pageSetupConfiguration(uId || userId, {firstName, lastName, profilePhoto: uploadedFile, uploadedAvatar, uploadedMiniAvatar, city, aboutMe, birthDay}))
            .then(result => {
                setResponse(result.data.message === "Page Update Success!" ? "Страница обновлена успешно" : result.data.message)
            })
            .catch(error => {
                if (error) console.log(error);
            })

    };
  //  const {firstName, lastName, profilePhoto, city, aboutMe}\
    function uploadFile(event: ChangeEvent<HTMLInputElement>){
        const file = event.target.files![0];
       if(file.size > 2097152*3) {
           toast.error('Файл слишком большой!');
           return;
       }
        socket.emit('UPLOAD_PHOTO', file, file.name);
    };

    useEffect(()=>{
        if(!uId && !userId) return;
        axios(getPageConfiguration(uId || userId))
            .then(result => {
                setPageLoaded(true);

                setPageExist(true);
                const page = result.data.page;
                setFirstName        (page ? page.firstName    : '');
                setLastName         (page ? page.lastName     : '');
                setNewPhoto(false);
                setUploadedFile     (page ? page.profilePhoto : '');
                setCity             (page ? page.city         : '');
                setAboutMe          (page ? page.aboutMe      : '');
                setBirthDay         (page ? page.birthDay     : '');

            })
            .catch(error => {
                setPageLoaded(true)
                if (error.response.status === 404) setPageExist(false);
            })
        socket.on('UPLOAD_PHOTO_ANSWER', function (file){
            const image = new Image();
            image.src = file;
            image.onload = () => {
                setNewPhoto(true);
                setUploadedFileScale({height: image.height, width: image.width});
                setUploadedFile(file);
            }

        });
        return (() => {
            socket.off('UPLOAD_PHOTO_ANSWER' );
        });
    },[uId])

    let pageSetupElements;

        if(pageLoaded) {
             pageSetupElements =
        <div className='PageSetup'>

                {pageExist ? <h1>Редактирование страницы</h1> : <h1>Создание страницы</h1>}
            <div className='PageSetupForm'>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="firstName"><b>Имя:</b></label>
                        <input name='firstName'  required={true}    value={firstName}    onChange={(event) => setFirstName(event.target.value) }    placeholder={'Ваше имя.'}/>
                    </div>
                    <div>
                        <label htmlFor="lastName"><b>Фамилия</b></label>
                        <input name='lastName'   required={true}   value={lastName}     onChange={(event) => setLastName(event.target.value)  }     placeholder={'Ваша фамилия.'}/>
                    </div>
                    <div>
                        <label htmlFor="age"><b>Дата рождения:</b></label>
                        <input name='age'           value={birthDay}     onChange={(event) => setBirthDay(event.target.value)  }   type={"date"} />
                    </div>
                    <div>
                        <label htmlFor="city"><b>Город:</b></label>
                        <input name='city'          value={city}     onChange={(event) => setCity(event.target.value)}         placeholder={'Ваш город.'}/>
                    </div>
                    <div>
                        <label htmlFor="aboutMe"><b>О себе:</b></label>
                        <textarea name='aboutMe'    value={aboutMe}      onChange={(event) => setAboutMe(event.target.value)}      placeholder={'Расскажите о себе.'}/>
                    </div>
                    <div className="PageSetupAvatar">
                        <input type={'button'} onClick={() => document.querySelector<HTMLElement>('#ChatImageLoad')!.click()}/>
                        {uploadedFile ? <img className='UserPageImage' src={uploadedFile}/> : null}
                        <input type='file' onChange={uploadFile} accept={'image/png, image/jpeg'} id={'ChatImageLoad'}/>
                    </div>
                        <button type="submit"><b>Внести изменения</b></button>
                </form>
            </div>
                <p>{response}</p>
        </div>
            }
        return (
            <div>{pageSetupElements}</div>
        )
}