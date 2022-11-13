export const getPageConfiguration = (id: string) => ({
    method: "get",
    url: `https://avangardio-1.ru/page/${id}`,
    withCredentials: true,
});
