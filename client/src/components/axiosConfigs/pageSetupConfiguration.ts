import {AxiosPageDataTypes} from "./axiosTypes";

export const pageSetupConfiguration = <AxiosPageDataTypes>(uId:AxiosPageDataTypes , data:AxiosPageDataTypes) => ({
    method: "post",
    url: "http://localhost:8080/page/pageSetup",
    withCredentials: true,
    data: {
        uId: uId,
        pageData: data
    }
});
