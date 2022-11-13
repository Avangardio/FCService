export default function Home() {

    const today = new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <p>Добро пожаловать на сайт проекта <b>Friends Club!</b></p>
            <p><b>Сегодня {today}</b></p>
            <p>Код проекта и прочее можно найти <a href={"https://github.com/Avangardio/FCService"} target={'_blank'}>здесь</a></p>
            <p>Почта для связи с автором: <b>avangardio1458@gmail.com</b>.</p>
            <p>Благодарю, хорошего дня!</p>
        </div>
    )
}