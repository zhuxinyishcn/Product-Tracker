import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Modal, Table, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRoles, reqUpdateRoles } from "../../api";
import AddForm from "./add-from";
import AuthForm from "./auth-form";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
export default function Role() {
  const [columns, setColumns] = useState([]);
  const [roles, setRoles] = useState([]);
  // This a variable to store current selected role
  const [role, setRole] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const addFormValue = useRef();

  useEffect(() => {
    getRoles();
    initColumns();
  }, []);

  function initColumns() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: formateDate,
      },
      {
        title: "Auth Time",
        dataIndex: "auth_time",
        render: formateDate,
      },
      {
        title: "Authorize Requests By",
        dataIndex: "auth_name",
      },
    ];
    setColumns(columns);
  }

  function onRowClick(role) {
    return {
      onClick: () => {
        setRole(role);
      },
    };
  }

  async function addRole() {
    const form = addFormValue.current.formInstance;
    // form validate Fields, only process when all rule passed!
    try {
      setShowAdd(false);
      const formValues = await form.validateFields();
      const { roleName } = formValues;
      // clear existing input
      form.resetFields();
      // request to backend to add new role
      const result = await reqAddRoles(roleName);
      if (!result.status === 0) message.error("Error with Add role process!");
      if (result.status === 0) {
        message.success("Add Role Success!");
        // update role array with previous state
        setRoles((state) => [...state, result.data]);
      }
    } catch (e) {
      // handle exception to output to console
      console.log(e);
    }
  }

  async function updateRole() {
    setShowAuth(false);
    // receive checkedKeys from auth Form
    const authCheckedKeys = addFormValue.current.authCheckedKeys;
    // get current selected user and update with new menu
    role.menus = authCheckedKeys;
    role.auth_time = Date.now();
    // update auth person
    role.auth_name = memoryUtils.user.username;
    const result = await reqUpdateRoles(role);
    if (result.status === 1) message.error("Update Role Failed:(");
    if (result.status === 0) {
      message.success("Update Role Successed!");
      // update roles array. Since role is in the array, so once role changded, the array also changed.
      setRoles([...roles]);
    }
  }

  async function getRoles() {
    const result = await reqRoles();
    if (result.status === 0) setRoles(result.data);
  }

  return (
    <Card
      size="small"
      title={
        <span>
          <Button
            type="primary"
            onClick={() => {
              setShowAdd(true);
            }}
          >
            Create a new role
          </Button>
          &nbsp;
          <Button
            type="primary"
            disabled={!role._id}
            onClick={() => {
              setShowAuth(true);
            }}
          >
            Set authorization
          </Button>
        </span>
      }
    >
      <Table
        rowSelection={{
          type: "radio",
          selectedRowKeys: [role._id],
        }}
        onRow={onRowClick}
        bordered
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />
      <Modal
        title="Add a New Role"
        visible={showAdd}
        onOk={addRole}
        onCancel={() => {
          setShowAuth(false);
        }}
      >
        <AddForm ref={addFormValue}></AddForm>
      </Modal>
      <Modal
        title="Set Auth For This Role"
        visible={showAuth}
        onOk={updateRole}
        onCancel={() => {
          setShowAuth(false);
        }}
      >
        <AuthForm ref={addFormValue} role={role}></AuthForm>
      </Modal>
    </Card>
  );
}
