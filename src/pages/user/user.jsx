import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, Button, Modal, Table, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqUsers, reqDeleteUsers, reqAddOrUpdateUsers } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import LinkButtom from "../../components/link-buttom";
import UserForm from "./user-form";

export default function User() {
  const [columns, setColumns] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [show, setShow] = useState(false);
  const [rolesName, setRolesName] = useState([]);
  const [user, setUser] = useState({});
  const FormValues = useRef();
  // This is a useMemo hook to optimize the render performance (ex: Pure Component)
  const userForm = useMemo(() => <UserForm ref={FormValues} roles={roles} user={user}></UserForm>, [
    roles,
    user,
  ]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    initColumns();
  }, [rolesName]);

  useEffect(() => {
    initRoleNames(roles);
  }, [roles]);

  async function getUsers() {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      setUsers(users);
      setRoles(roles);
    }
  }

  async function deleteUser(user) {
    Modal.confirm({
      title: "Delete User",
      content: `Delete ${user.username} in our system?`,
      onOk: async () => {
        const result = await reqDeleteUsers(user._id);
        console.log(result);
        if (result.status === 0) {
          message.success(`Delete ${user.username} Success!`);
          getUsers();
        }
      },
    });
  }

  async function addOrUpdateUser() {
    const form = FormValues.current.formInstance;
    // form validate Fields, only process when all rule passed!
    try {
      const formValues = await form.validateFields();
      console.log(formValues);
      // check if has user value, if we have, means we update the user info
      if (Object.keys(user).length && user._id) formValues._id = user._id;
      // clear existing input
      form.resetFields();
      // close modal
      setShow(false);
      // request to backend to add new or update user
      const result = await reqAddOrUpdateUsers(formValues);
      if (!result.status === 0) message.error("Error with user opration process!");
      if (result.status === 0) {
        message.success(`User Operation Success!`);
        getUsers();
      }
    } catch (e) {
      // handle exception to output to console
      console.log(e);
    }
  }

  function initColumns() {
    const columns = [
      {
        title: "Name",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: formateDate,
      },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (role) => rolesName[role],
      },
      {
        title: "Action",
        render: (role) => (
          <span>
            <LinkButtom onClick={() => deleteUser(role)}>Delete</LinkButtom>
            <LinkButtom onClick={() => showUpdate(role)}>Update</LinkButtom>
          </span>
        ),
      },
    ];
    setColumns(columns);
  }

  function initRoleNames(roles) {
    // This a another way to reduce to an object by using comma (,) operator
    // const roleName = roles.reduce((prev, role) => ((prev[role._id] = role.name), prev), {});
    // const roleName = roles.reduce((prev, role) => ({ ...prev, [role._id]: role.name }), {});
    const roleName = roles.reduce((prev, role) => {
      prev[role._id] = role.name;
      return prev;
    }, {});
    setRolesName(roleName);
  }

  function showUpdate(role) {
    setShow(true);
    setUser(role);
  }

  return (
    <Card
      size="small"
      title={
        <Button
          type="primary"
          onClick={() => {
            setUser({});
            setShow(true);
          }}
        >
          Create a new user
        </Button>
      }
    >
      <Table
        bordered
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
      />
      <Modal
        title={user._id ? `Update ${user.username} Profile` : `Add a New User`}
        visible={show}
        onOk={addOrUpdateUser}
        onCancel={() => {
          // clear all form info
          FormValues.current.formInstance.resetFields();
          setShow(false);
        }}
      >
        {/* This is use useMemo to optimize render performance (ex: Pure Component) */}
        {userForm}
      </Modal>
    </Card>
  );
}
