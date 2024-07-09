import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';

function ImageUpload() {
  const [value, setValue] = useState('');
  const [showPopover, setShowPopover] = useState(false);
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

  const handleTogglePopover = () => {
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

  return (
    <div style={{ position: 'relative' }}>
      <h1>Hellowwwwwwwww</h1>
      <ReactQuill
        ref={editorRef}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      <button
        onClick={handleTogglePopover}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: '#495057',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          cursor: 'pointer'
        }}
      >
        +
      </button>
      {showPopover && (
        <div
          className="popover"
          style={{
            top: '50px', // Adjust the position as needed
            right: '10px'
          }}
        >
          <button onClick={() => handleFormat('bold')}>Bold</button>
          <button onClick={() => handleFormat('italic')}>Italic</button>
          <button onClick={() => handleFormat('header', '1')}>H1</button>
          <button onClick={() => handleFormat('header', '2')}>H2</button>
          <label>
            Insert Image
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, 'image')}
            />
          </label>
          <label>
            Insert Video
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
