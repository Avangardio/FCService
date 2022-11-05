import {AxiosPageDataTypes} from "./axiosTypes";

export const pageSetupConfiguration = (uId: AxiosPageDataTypes, data: AxiosPageDataTypes) => ({
    method: "post",
    url: "https://avangardio-1.ru/page/pageSetup",
    withCredentials: true,
    data: {
        uId: uId,
        pageData: data
    }
});