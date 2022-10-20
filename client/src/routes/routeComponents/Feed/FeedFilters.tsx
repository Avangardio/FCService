import React, { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {ReduxStoreType} from "../../../redux/types/reduxStoreTypes";
import allActions from '../../../redux/actions/userAction';
import {useNavigate} from "react-router-dom";

export default function FeedFilters(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filter = useSelector((state: ReduxStoreType) => state.feedState.filter);

    function handleClick(event: React.MouseEvent<HTMLElement>){
        const target = event.target as HTMLElement;
        const targetChoice = target.closest('div.ChatFilter')!.getAttribute("data-choice");
        if(targetChoice === null) return;
        dispatch(allActions.setFilter(targetChoice));
        navigate('/feed');
    }
    return (
        <div className={'ChatAppFilters'}>
            <div className={filter === 'none' ? 'ChatFilter selected': 'ChatFilter'} data-choice={'none'}       onClick={event => handleClick(event)}>Все чаты</div>
            <div className={filter === 'unRead' ? 'ChatFilter selected': 'ChatFilter'} data-choice={'unRead'} onClick={event => handleClick(event)}>Непрочитанные</div>
        </div>
    )
}