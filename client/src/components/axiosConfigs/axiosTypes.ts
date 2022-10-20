export type AxiosPageDataTypes = {
    firstName        ?: string
    lastName         ?: string
    profilePhoto     ?: string
    city             ?: string
    aboutMe          ?: string
    birthDay         ?: string

}

export type AxiosDataTypes = {
    uId         ?:  string
    pageData    ?:  AxiosPageDataTypes
    email       ?:  string
    password    ?:  string

}


export interface AxiosInterface {
    method          : string
    url             : string
    withCredentials : boolean
    data            : AxiosDataTypes
}