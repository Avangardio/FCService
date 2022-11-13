import React, {useState} from 'react';
import axios from "axios";
import RegistrationFinish from "./RegistrationFinish";

export default function Registration() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [regResponse, setRegResponse] = useState<string>();
    const [nextStep, setNextStep] = useState<boolean>(false);
    const [newId, setNewId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "https://avangardio-1.ru/account/register",
            data: {
                email,
                password,
            },
        };
        axios(configuration)
            .then((result) => {
                setRegResponse(result.data.message);
                if (!result.data.userData.registrationCompleted) {
                    setNewId(result.data.userData.uId);
                    setNextStep(true);
                }
            })
            .catch((error) => {
                setRegResponse("Данные не подходят")
            });
    };

    if (nextStep) return (<RegistrationFinish userId={newId}/>);


    return (
        <div>
            <form className={'RegistrationForm'} onSubmit={(e) => handleSubmit(e)}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required={true} name="email"
                       placeholder={`Введите почту...`}/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required={true} name='password'
                       placeholder={`Введите пароль...`}/>
                <button type={"submit"}>Регистрация</button>
            </form>
            {regResponse}
        </div>
    )

};