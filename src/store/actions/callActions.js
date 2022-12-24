import { message } from "antd";

import {
  GET_CALLS_RECORD_SUCCESS,
  GET_CALL_DETAIL_BY_ID_SUCCESS,
  ADD_NOTE_SUCCESS,
  ARCHIVE_SUCCESS,
} from "../../constants/callConstants";
import * as api from "../../config/api/callApis";

export const getCallsRecordAction = (offsetLimit) => async (dispatch) => {
  try {
    let { data } = await api.getCallsRecordApi(offsetLimit);
    dispatch({ type: GET_CALLS_RECORD_SUCCESS, payload: data });
  } catch (error) {
    message.error(error.response?.data?.message);
  }
};

export const getCallDetailByIdAction = (id) => async (dispatch) => {
  try {
    let { data } = await api.getCallDetailByIdApi(id);
    dispatch({ type: GET_CALL_DETAIL_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    // message.error(error.response?.data?.message);
  }
};
export const addNoteByIdAction =
  (id, body, onSuccess, onFailure) => async (dispatch) => {
    try {
      let { data } = await api.addNoteByIdApi(id, body);
      dispatch({ type: ADD_NOTE_SUCCESS, payload: data });
      dispatch(onSuccess({ message: "Successfully Added", data: data }));
    } catch (error) {
      // message.error(error.response?.data?.message);
    }
  };
export const archiveByIdAction =
  (id, onSuccess, onFailure) => async (dispatch) => {
    try {
      let { data } = await api.archiveByIdApi(id);
      dispatch({ type: ARCHIVE_SUCCESS, payload: data });
      dispatch(onSuccess({ message: "Successfully Updated", data: data }));
    } catch (error) {
      // message.error(error.response?.data?.message);
    }
  };
