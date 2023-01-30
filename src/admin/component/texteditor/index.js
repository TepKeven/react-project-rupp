import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css"


function TextEditorComponent({tabName,langTabId, description}) {
  

  var QuillModules = {

    toolbar: [
      [{ header: [1, 2, 3, 3, 4, 5, 6] }],
      [{ size: [] }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { color: [] },
        { background: [] },
        { align: [] },
      ],
      ["link", "image", "video", "formula", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
  };

  var QuillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "background",
    "color",
    "video",
    "formula",
    "code-block",
    "sub",
    "super",
  ];

  const [editorContent, setEditorContent] = useState(description.replace(/&lt;/g, "<").replace(/&gt;/g, ">"))

  const [display, setDisplay] = useState("view");
  const reactQuillRef = useRef(null);


  function editorChanged(html_delta) {
    setEditorContent(html_delta); // when the content of editor changed
  }

  function displayMode(event) { // // Display mode between view or code

    setDisplay(event.target.value);

    var html_content = editorContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">")

    // alert(html_content)
    if (event.target.value == "code") {
      reactQuillRef.current
        .getEditor()
        .setContents([
          { insert: html_content }, // display in code format
        ]);

    } else {
      setEditorContent(html_content); // display in view format
    }
  }

  return (
    <>
      <ReactQuill
        theme="snow"
        ref={reactQuillRef}
        onChange={editorChanged}
        modules={QuillModules}
        formats={QuillFormats}
        value={editorContent}
        className={display == "code" ? "quill-dark" : "quill-light"}
      >
      </ReactQuill>
      <input type="text" name={`${tabName}_description[${langTabId}][description]`} value={editorContent.replace(/&lt;/g, "<").replace(/&gt;/g, ">")} className="d-none"/>
      <select onChange={displayMode}>
        <option value="view">View</option>
        <option value="code">Code</option>
      </select>
    </>
  );
}

export default TextEditorComponent;