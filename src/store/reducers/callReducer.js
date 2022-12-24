import {
  GET_CALLS_RECORD_SUCCESS,
  GET_CALL_DETAIL_BY_ID_SUCCESS,
  ADD_NOTE_SUCCESS,
  ARCHIVE_SUCCESS,
} from "../../constants/callConstants";

const INITIAL_STATE = {
  allCallsRecord: [],
  callDetail: null,
  addNoteRes: null,
};

const callReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CALLS_RECORD_SUCCESS:
      return { ...state, allCallsRecord: action.payload };
    case GET_CALL_DETAIL_BY_ID_SUCCESS:
      return { ...state, callDetail: action.payload };
    case ADD_NOTE_SUCCESS:
      return { ...state, addNoteRes: action.payload };
    case ARCHIVE_SUCCESS:
      return { ...state, archiveRes: action.payload };

    default:
      return state;
  }
};

export default callReducer;
