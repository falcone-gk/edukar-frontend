export interface userData {
    isAuthenticated: boolean,
    token: string | null
    username: string | null
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