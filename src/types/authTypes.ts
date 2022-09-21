export interface userData {
    isAuthenticated?: boolean,
    access: string,
    refresh: string
    username: string,
    email: string,
    picture: string
}
export interface userRegisterData {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    re_password: string,
    profile: string,
    about_me: string
}
export interface userLoginData {
    username: string,
    password: string
}