import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Modal } from "antd";

import { getCallDetailByIdAction } from "../../../store/actions/callActions";

const CallDetailViewModal = ({ handleClose, visible, callId }) => {
  const dispatch = useDispatch();
  const { callDetail } = useSelector((state) => state.callReducer);

  const handleCancel = () => {
    handleClose(false);
  };

  useEffect(() => {
    if (callId) {
      dispatch(getCallDetailByIdAction(callId));
    }
  }, [callId]);
  return (
    <>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        width={670}
        footer={null}
      >
        <Descriptions title="Call Detail">
          <Descriptions.Item label={<h4>Call Type</h4>}>
            {callDetail?.call_type}
          </Descriptions.Item>
          <Descriptions.Item label={<h4>Direction</h4>}>
            {callDetail?.direction}
          </Descriptions.Item>
          <Descriptions.Item label={<h4>Duration</h4>}>
            {callDetail?.duration}
          </Descriptions.Item>
          <Descriptions.Item label={<h4>From</h4>}>
            {callDetail?.from}
          </Descriptions.Item>
          <Descriptions.Item label={<h4>To</h4>}>
            {callDetail?.to}
          </Descriptions.Item>
          <Descriptions.Item label={<h4>Via</h4>}>
            {callDetail?.via}
          </Descriptions.Item>
          {callDetail &&
            callDetail?.notes.map((note, index) => {
              return (
                <Descriptions.Item label={<h4>{`Note${index + 1}`}</h4>}>
                  {note.content}
                </Descriptions.Item>
              );
            })}
        </Descriptions>
      </Modal>
    </>
  );
};

export default CallDetailViewModal;
