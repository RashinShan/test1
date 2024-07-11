import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

function ImageUpload() {
  const [value, setValue] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['image'],
    ],
  };

  const handleTogglePopover = (event) => {
    const cursorPosition = editorRef.current.getEditor().getBounds(editorRef.current.getEditor().getSelection().index);
    setPopoverPosition({ top: cursorPosition.top + cursorPosition.height, left: cursorPosition.left });
    setShowPopover(!showPopover);
  };

  const handleFormat = (format) => {
    editorRef.current.getEditor().format(format, true);
    setShowPopover(false);
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const range = editorRef.current.getEditor().getSelection();
      if (range) {
        if (type === 'image') {
          editorRef.current.getEditor().insertEmbed(range.index, 'image', base64String);
        } else if (type === 'video') {
          editorRef.current.getEditor().insertEmbed(range.index, 'video', base64String);
        }
      } else {
        // If there's no selection, add at the end
        editorRef.current.getEditor().clipboard.dangerouslyPasteHTML(
          editorRef.current.getEditor().getLength() - 1,
          type === 'image' ? `<img src="${base64String}" />` : `<video src="${base64String}" controls />`
        );
      }
    };
    reader.readAsDataURL(file);
    setShowPopover(false);
  };

  useEffect(() => {
    const editor = editorRef.current.getEditor();

    editor.on('selection-change', (range) => {
      if (range) {
        const cursorPosition = editor.getBounds(range.index);
        setPopoverPosition({ top: cursorPosition.top + cursorPosition.height, left: cursorPosition.left });
      }
    });

    editor.on('text-change', () => {
      const range = editor.getSelection();
      if (range) {
        const cursorPosition = editor.getBounds(range.index);
        setPopoverPosition({ top: cursorPosition.top + cursorPosition.height, left: cursorPosition.left });
      }
    });
  }, []);

  return (
    <div>
      <h1>Diary App</h1>
      <button
        onClick={handleTogglePopover}
        style={{
          position: 'absolute',
          top: `${popoverPosition.top}px`,
          left: `${popoverPosition.left}px`,
          zIndex: 1000,
          background: '#ffffff',
          color: '#000000',
          border: '1px solid black',
          borderRadius: '30px',
          padding: '10px 14px',
          cursor: 'pointer',
          fontSize: '20px'
        }}
      >
        +
      </button>
      <ReactQuill
        ref={editorRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder='Enter Your Thought'
        style={{
          position: 'relative',
          top: '90px'
        }}
      />

      {showPopover && (
        <div
          className="popover"
          style={{
            top: `${popoverPosition.top + 20}px`,
            left: `${popoverPosition.left}px`,
            display: 'flex'
          }}
        >
          <button onClick={() => handleFormat('bold')}><FontAwesomeIcon icon="fa-solid fa-bold" /></button>
          <button onClick={() => handleFormat('italic')}><FontAwesomeIcon icon="fa-solid fa-italic" /></button>
          <button onClick={() => handleFormat('header', '1')}>H1</button>
          <button onClick={() => handleFormat('header', '2')}>H2</button>
          <label
            style={{
              margin: '5px'
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-image" />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, 'image')}
            />
          </label>
          <label
            style={{
              margin: '5px'
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-video" />
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, 'video')}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
