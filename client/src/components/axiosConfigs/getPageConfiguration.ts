
export const getPageConfiguration = (id: string) => ({
    method: "get",
    url: `http://localhost:8080/page/${id}`,
    withCredentials: true,
});
