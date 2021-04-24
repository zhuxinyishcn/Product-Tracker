import React, { useImperativeHandle, forwardRef, useEffect, useState } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

// This react hook use different way to use React.forwardRef
const WrappedForm = forwardRef(({ role }, ref) => {
  const [form] = Form.useForm();
  const [menu, setMenu] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(role.menus);

  useImperativeHandle(ref, () => ({
    // This is a form instance for parrent component to access
    formInstance: form,
    // This is a checkedKeys instance for parrent component to access
    authCheckedKeys: checkedKeys,
  }));

  useState(() => {
    setMenu(getMenuList(menuList));
  });

  /**
   * @description: This use effect update role checkedKeys whenver use changed
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    const menus = role.menus;
    setCheckedKeys(menus);
  }, [role]);

  // function getMenuList(menuList) {
  //   return menuList.reduce((prev, item) => {
  //     // if no children in the array, simplely add to array end
  //     if (!item.children) prev.push({ key: item.key, title: item.title });
  //     // if there is child in tree we process it first
  //     if (item.children) {
  //       // update previous array with concat new array
  //       prev.push({
  //         key: item.key,
  //         title: item.title,
  //         // recursively call reduceMap to update all children
  //         children: getMenuList(item.children),
  //       });
  //     }
  //     return prev;
  //   }, []);
  // }

  /**
   * @description: This is another way to genrate menu, it will add children node for each parent node
   * @param {*} menuList
   * @return {*}
   */
  function getMenuList(menuList) {
    return menuList.reduce((prev, item) => {
      // if no children in the array, simplely add to array end
      prev.push({ key: item.key, title: item.title });
      // if there is child in tree we process it first
      if (item.children)
        // update previous menuNode with concat new children Node
        prev.push({
          // pop the last element in the array, concat with his chilren
          ...prev.pop(),
          // recursively call reduceMap to update all children
          children: getMenuList(item.children),
        });
      return prev;
    }, []);
  }

  const onCheck = (checkedKeys) => setCheckedKeys(checkedKeys);

  return (
    <Form form={form}>
      <Form.Item name="roleName" label="Role Name">
        <Input placeholder={role.name} disabled />
      </Form.Item>
      <Tree
        checkable
        defaultExpandAll
        onCheck={onCheck}
        treeData={menu}
        checkedKeys={checkedKeys}
      />
    </Form>
  );
});

WrappedForm.propTypes = {
  role: PropTypes.object,
};

export default WrappedForm;
