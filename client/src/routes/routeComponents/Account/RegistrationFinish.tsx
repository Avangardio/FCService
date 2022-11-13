import React, {ReactElement} from 'react';
import PageSetup from "../Page/PageSetup";

export interface finishProps {
    userId?: string
}

export default function RegistrationFinish({userId}: finishProps): ReactElement {
    return (<PageSetup userId={userId}></PageSetup>)
}