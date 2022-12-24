import {
  SIGNIN_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
} from "../../constants/authConstants";
import * as api from "../../config/api/authApis";
import { message } from "antd";

export const signIn = (body, onSuccess, onFailure) => async (dispatch) => {
  try {
    let { data } = await api.signInApi(body);
    let user = JSON.stringify(data);

    localStorage.setItem("user", user);
    localStorage.setItem("token", data.access_token);

    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    dispatch(onSuccess({ message: "Login Success", data: data }));
  } catch (error) {
    // message.error(error.response?.data?.message);
  }
};

export const refreshTokenAction = () => async (dispatch) => {
  try {
    let { data } = await api.refreshTokenApi();
    localStorage.setItem("token", data.access_token);
    dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: data });
  } catch (error) {
    // message.error(error.response?.data?.message);
  }
};
