import React, { useState, useImperativeHandle, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import PropTypes from "prop-types";

const WrappedRichTextEditor = React.forwardRef((props, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useImperativeHandle(ref, () => ({
    getHtmlContext() {
      return draftToHtml(convertToRaw(editorState.getCurrentContent()));
    },
  }));

  useEffect(() => {
    WrappedRichTextEditor.propTypes = {
      detail: PropTypes.string,
    };
    function initialEditor(detail) {
      // check if we have the product detail or not
      if (props.detail) {
        const contentBlock = htmlToDraft(detail);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
      }
    }
    initialEditor(props.detail);
  }, [props.detail]);

  function onEditorStateChange(editorState) {
    setEditorState(editorState);
  }

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://120.55.193.14:5000/manage/img/upload");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        response.data.url = response.data.url.replace(
          "localhost",
          "120.55.193.14"
        );
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      editorStyle={{
        border: "1px solid #00b377",
        minHeight: 200,
        borderRadius: 20,
        padding: 10,
      }}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
        },
      }}
    />
  );
});
export default WrappedRichTextEditor;
