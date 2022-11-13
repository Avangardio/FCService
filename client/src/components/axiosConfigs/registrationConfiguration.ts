import {AxiosPageDataTypes} from "./axiosTypes";

export const pageSetupConfiguration = (uId: AxiosPageDataTypes, data: AxiosPageDataTypes) => ({
    method: "post",
    url: "http://localhost:8080/page/pageSetup",
    withCredentials: true,
    data: {
        uId: uId,
        pageData: data
    }
});