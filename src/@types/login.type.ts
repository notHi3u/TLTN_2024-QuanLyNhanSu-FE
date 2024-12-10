export type LoginType = {
    email:string;
    password: string;
    // rememberMe: boolean;
};

export type RefreshType = {
    grantType : string;
    userId : number;
};