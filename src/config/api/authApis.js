import {  postRequest } from "../url";
import { SIGNIN_URL ,REFRESH_TOKEN_URL} from "../../constants/authConstants";

export const signInApi = (user) => postRequest(`${SIGNIN_URL}`, user);

export const refreshTokenApi = () => postRequest(`${REFRESH_TOKEN_URL}`);
