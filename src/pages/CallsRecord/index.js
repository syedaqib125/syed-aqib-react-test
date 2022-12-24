import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  PageHeader,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";

import {
  archiveByIdAction,
  getCallsRecordAction,
} from "../../store/actions/callActions";
import CallDetailViewModal from "./components/callDetailViewModal";
import callsRecordTableColumns from "../../data/callsRecordTableColumns.json";
import AddNoteModal from "./components/addNoteModal";

const CallsRecord = () => {
  const { Option } = Select;

  const dispatch = useDispatch();
  const { allCallsRecord } = useSelector((state) => state.callReducer);

  const [records, setRecords] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [filterValue, setFilterValue] = useState(null);
  const [offsetLimit, setOffsetLimit] = useState({
    offset: 1,
    limit: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddNoteModalVisible, setIsAddNoteModalVisible] = useState(false);
  const [callId, setCallId] = useState(null);

  const handleFilter = () => {
    if (filterValue && allCallsRecord?.nodes?.length > 0) {
      let filteredArray = allCallsRecord?.nodes?.filter(
        (item) => item.call_type === filterValue
      );
      setRecords(filteredArray);
    }
  };

  const onShowSizeChange = (current, pageSize) => {
    setOffsetLimit({
      offset: current,
      limit: pageSize,
    });
  };

  const handleOpenModal = (id) => {
    setCallId(id);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenAddNoteModal = (id) => {
    setCallId(id);
    setIsAddNoteModalVisible(true);
  };
  const handleCloseAddNoteModal = () => {
    setIsAddNoteModalVisible(false);
  };

  const handleAction = () => {
    dispatch(getCallsRecordAction(offsetLimit));
  };

  const onSuccess = () => {
    handleAction();
  };
  const onFailure = () => {};

  const handleIsArchive = (id) => {
    dispatch(archiveByIdAction(id, onSuccess, onFailure));
  };

  useEffect(() => {
    if (allCallsRecord?.nodes?.length > 0) {
      setFilterValue(null);
      setRecords(allCallsRecord?.nodes);
    }
  }, [allCallsRecord]);

  useEffect(() => {
    if (records) {
      const tableData = [];
      records.map((item) => {
        const {
          id,
          call_type,
          direction,
          duration,
          from,
          to,
          via,
          created_at,
          is_archived,
        } = item;
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        return tableData.push({
          key: id,
          call_type:
            call_type === "missed" ? (
              <h4 style={{ color: "red" }}>{call_type}</h4>
            ) : (
              <h4 style={{ color: "blue" }}>{call_type}</h4>
            ),
          direction: direction,
          duration: (
            <div>
              <p>{`${minutes} minutes  ${seconds} seconds`}</p>
              <p>({duration})</p>
            </div>
          ),
          from: from,
          to: to,
          via: via,
          created_at: created_at.split("T")[0],
          is_archived: (
            <Tag
              color={is_archived ? "cyan" : "volcano"}
              style={{ cursor: "pointer" }}
              onClick={() => handleIsArchive(id)}
            >
              {is_archived ? "Archived" : "UnArchived"}
            </Tag>
          ),
          actions: (
            <Space
              direction="horizontal"
              size="small"
              style={{
                display: "flex",
              }}
            >
              <Tooltip title="View Call Detail">
                <Button
                  shape="circle"
                  size="middle"
                  icon={<EyeOutlined />}
                  onClick={() => handleOpenModal(id)}
                />
              </Tooltip>

              <Button
                type="primary"
                size="middle"
                onClick={() => handleOpenAddNoteModal(id)}
              >
                Add Note
              </Button>
            </Space>
          ),
        });
      });
      setDataSource(tableData);
    }
  }, [records]);

  useEffect(() => {
    handleAction();
  }, [offsetLimit]);

  return (
    <>
      <CallDetailViewModal
        visible={isModalVisible}
        handleClose={handleCloseModal}
        callId={callId}
      />
      <AddNoteModal
        visible={isAddNoteModalVisible}
        handleClose={handleCloseAddNoteModal}
        handleAction={handleAction}
        callId={callId}
      />
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <PageHeader
            ghost
            className="searching-bar"
            extra={[
              <Select
                defaultValue="Select"
                style={{ width: "200px" }}
                onChange={(value) => setFilterValue(value)}
                value={filterValue}
              >
                <Option value="missed">missed</Option>
                <Option value="voicemail">voicemail</Option>
                <Option value="answered">answered</Option>
              </Select>,
              <Button
                size="middle"
                icon={<FilterOutlined />}
                onClick={handleFilter}
              >
                Filter
              </Button>,
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Table
            columns={callsRecordTableColumns}
            dataSource={dataSource}
            pagination={{
              total: allCallsRecord?.totalCount,
              onChange: onShowSizeChange,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default CallsRecord;
