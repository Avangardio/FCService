import React, { useState, useEffect } from 'react';

export default function Home(){

    const [data, dataUpdate] = useState({data:''});


    useEffect(() => {
        async function fetchData() {
            let response =  await fetch('http://localhost:8080/home/');
            let fetchedData = await response.text();
            dataUpdate({data: `${fetchedData}`});

        };
        fetchData().catch(error => {console.log(error); dataUpdate({data: 'Server Unavaible'})});
    }, []);

    return(
        <div>
            <p>This is a HOME page :)</p>
            <p>{data.data}</p>
        </div>
    )
}