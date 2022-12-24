import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";

import { addNoteByIdAction } from "../../../store/actions/callActions";

const AddNoteModal = ({ handleClose, visible, callId, handleAction }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const handleCancel = () => {
    handleClose(false);
  };

  const onSuccess = (data) => {
    handleAction();
    form.resetFields();
    handleCancel();
  };
  const onFailure = () => {};
  const onFinish = (values) => {
    dispatch(addNoteByIdAction(callId, values, onSuccess, onFailure));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title={<h2>Add New Note</h2>}
        visible={visible}
        onCancel={handleCancel}
        width={570}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Note"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input Note!",
              },
            ]}
          >
            <Input className="formField" placeholder="Enter note here" />
          </Form.Item>
          <Form.Item>
            <Button key="submit" htmlType="submit" type="primary">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNoteModal;
