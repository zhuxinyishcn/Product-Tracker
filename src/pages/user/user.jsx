import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, Button, Modal, Table, message } from "antd";
import { PAGE_SIZE } from "../../utils/constants";
import { reqRoles, reqAddRoles, reqUpdateRoles } from "../../api";
export default function User() {
  // return (
  //   <Card
  //     size="small"
  //     title={
  //       <span>
  //         <Button
  //           type="primary"
  //           onClick={() => {
  //             setShowAdd(true);
  //           }}
  //         >
  //           Create a new role
  //         </Button>
  //         &nbsp;
  //         <Button
  //           type="primary"
  //           disabled={!role._id}
  //           onClick={() => {
  //             setShowAuth(true);
  //           }}
  //         >
  //           Set authorization
  //         </Button>
  //       </span>
  //     }
  //   >
  //     <Table
  //       rowSelection={{
  //         type: "radio",
  //         selectedRowKeys: [role._id],
  //       }}
  //       onRow={onRowClick}
  //       bordered
  //       columns={columns}
  //       dataSource={roles}
  //       rowKey="_id"
  //       pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
  //     />
  //     <Modal
  //       title="Add a New Role"
  //       visible={showAdd}
  //       onOk={addRole}
  //       onCancel={() => {
  //         setShowAuth(false);
  //       }}
  //     >
  //       <AddForm ref={FormValues}></AddForm>
  //     </Modal>
  //     <Modal
  //       title="Set Auth For This Role"
  //       visible={showAuth}
  //       onOk={updateRole}
  //       onCancel={() => {
  //         setShowAuth(false);
  //       }}
  //     >
  //       {/* This is use useMemo to optimize render performance (ex: Pure Component) */}
  //       {authForm}
  //     </Modal>
  //   </Card>
  // );
  <div>he</div>
}
