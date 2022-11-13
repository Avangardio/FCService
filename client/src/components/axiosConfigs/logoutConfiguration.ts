export const logoutConfiguration = () => ({
    method: "get",
    url: "http://localhost:8080/account/logout",
    withCredentials: true
});