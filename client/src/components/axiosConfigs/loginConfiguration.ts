import {AxiosPageDataTypes} from "./axiosTypes";

export const loginConfiguration = <AxiosPageDataTypes>(email: AxiosPageDataTypes, password: AxiosPageDataTypes) => ({
        method: "post",
        url: "http://localhost:8080/account/login",
        withCredentials: true,
        data: {
            email,
            password,
        },
    });
