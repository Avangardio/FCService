export const loginConfiguration = <AxiosPageDataTypes>(email: AxiosPageDataTypes, password: AxiosPageDataTypes) => ({
    method: "post",
    url: "https://avangardio-1.ru/account/login",
    withCredentials: true,
    data: {
        email,
        password,
    },
});
