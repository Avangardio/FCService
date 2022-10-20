import React, {useEffect} from "react";
import PageSetup from "./routeComponents/Page/PageSetup";
const {pageOptionsConfiguration} = require('../components/axiosConfigs/pageSetupConfiguration')

export default function PageSetupRoute(){

    return (
        <PageSetup/>
    )
}