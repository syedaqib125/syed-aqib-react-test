import { getRequest, postRequest, putRequest } from "../url";
import {
  GET_CALLS_RECORD_URL,
  GET_CALL_DETAIL_BY_ID_URL,
  ADD_NOTE_URL,
  ARCHIVE_URL,
} from "../../constants/callConstants";

export const getCallsRecordApi = (offsetLimit) =>
  getRequest(
    `${GET_CALLS_RECORD_URL}?offset=${offsetLimit.offset}&limit=${offsetLimit.limit}`
  );

export const getCallDetailByIdApi = (id) =>
  getRequest(`${GET_CALL_DETAIL_BY_ID_URL}/${id}`);

export const addNoteByIdApi = (id, body) =>
  postRequest(`${ADD_NOTE_URL}/${id}/note`, body);

export const archiveByIdApi = (id) =>
  putRequest(`${ARCHIVE_URL}/${id}/archive`);
