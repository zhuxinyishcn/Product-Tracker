/**
 *  This a component I made to uplaod picture to server
 */
import React, { useState, useImperativeHandle, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeleteImg } from "../../api";
import PropTypes from "prop-types";
const WrappedPicturesWall = React.forwardRef((props, ref) => {
  // This is a array that contain all image list
  const [fileList, setFileList] = useState([]);
  // This is a variable to see is need preview for Bigger Display
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(false);

  useImperativeHandle(ref, () => ({
    getFileList() {
      return fileList.map((image) => image.name);
    },
  }));

  useEffect(() => {
    WrappedPicturesWall.propTypes = {
      imgs: PropTypes.array,
    };
    initPictureList(props.imgs);
  }, [props.imgs]);

  function initPictureList(imgs) {
    let imageList = [];
    // check if array is undefined
    if (imgs)
      imageList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: "http://120.55.193.14:5000/upload/" + img,
      }));
    setFileList(imageList);
  }

  function handleCancel() {
    setPreviewVisible(false);
  }
  /**
   * @description: a function when user click preview the picture
   * @param {*} file
   * @return {*}
   */
  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }

  // Hide modal function
  async function handleChange({ file, fileList }) {
    // once we upload file is done, we start update file name and url
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("Upload Picture Success!");
        const { name, url } = result.data;
        // since we use setState to update the fileList, so we have to update fileList instead of file
        // To get the actual uploaded file, it is at the last element of the file List
        const currFile = fileList[fileList.length - 1];
        currFile.name = name;
        // The server will return localhost url, but the actual server is not at the local host
        currFile.url = url.replace("localhost", "120.55.193.14");
      }
      if (result.status !== 0)
        message.error("Uploading Picture Failure :( Maybe check your internet");
    }
    // we use file to track the current file status, if we use last element in the fileList, it will never change :(
    if (file.status === "removed") {
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) message.success("Picture Remove Success!");
      if (result.status !== 0) message.error("Picture Remove Error!");
    }
    setFileList(fileList);
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        // This is the means we only accept any file with an image/* MIME type
        accept={"image/*"}
        // This is the parameter name for api request send a image
        name="image"
        // This is the path for picture upload
        action="/manage/img/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
});

export default WrappedPicturesWall;
