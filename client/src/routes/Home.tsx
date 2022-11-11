import React, {useEffect, useState} from 'react';

export default function Home() {

    const [data, dataUpdate] = useState({data: ''});
    const today = new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
//9
    return (
        <div>
            Добро пожаловать на сайт проекта Friends Club!
            Сегодня {today}
            Код проекта и прочее можно найти <a href={"https://github.com/Avangardio/FCService"} target={'_blank'}>здесь</a>.
            Почта для связи с автором: <b>avangardio1458@gmail.com</b>.
            Благодарю, хорошего дня!
        </div>
    )
}