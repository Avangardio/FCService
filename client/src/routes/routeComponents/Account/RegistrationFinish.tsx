import React, {useState, useEffect, ReactElement} from 'react';
import axios from "axios";
import PageSetup from "../Page/PageSetup";
export interface finishProps {
    userId?: string
}

export default function RegistrationFinish({userId}: finishProps): ReactElement{
    return (<PageSetup userId={userId}></PageSetup>)
}