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
  console.log(value);
  console.log(value);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isRecording, setIsRecording] = useState(false);
  const editorRef = useRef(null);
  const recognitionRef = useRef(null);

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
    const cursorPosition = editorRef.current.getEditor().getBounds(editorRef.current.getEditor().getSelection().index);
    setPopoverPosition({ top: cursorPosition.top, left: cursorPosition.left + cursorPosition.width });
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

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const range = editorRef.current.getEditor().getSelection();
      editorRef.current.getEditor().clipboard.dangerouslyPasteHTML(range.index, finalTranscript);
    };

    recognitionRef.current.start();
    setIsRecording(true);
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };
//hhkhkhkjkjk
//hsaggdgd
//hsaggdgd
  useEffect(() => {
    const editor = editorRef.current.getEditor();

    const updatePopoverPosition = () => {
      const range = editor.getSelection();
      if (range) {
        const cursorPosition = editor.getBounds(range.index);
        setPopoverPosition({ top: cursorPosition.top, left: cursorPosition.left + cursorPosition.width });
      }
    };

    editor.on('selection-change', updatePopoverPosition);
    editor.on('text-change', updatePopoverPosition);
  }, []);

  return (
    <div style={{marginLeft: '200px', marginRight:'200px' }}>
      <h1>Diary App</h1>
      <br></br>
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleTogglePopover}
          style={{
            position: 'absolute',
            top: `${popoverPosition.top - -12}px`,
            left: `${popoverPosition.left + 20}px`,
            zIndex: 1000,
            background: 'none',
            color: '#000000',
            border: 'none',
            borderRadius: '100px',
            padding: '4px 8.5px',
            cursor: 'pointer',
            fontSize: '20px',
            transform: 'translate(-50%, -50%)' // Adjusts the button's position to be centered on the cursor
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </button>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder='Enter Your Thought'
          webkit-input-placeholder = "white"
          fontSize = '20px'
          className='quill-editor'
          style={{
            position: 'relative',
            top: '1px'
          }}
        />
      </div>

      <button 
        onClick={isRecording ? stopVoiceRecognition : startVoiceRecognition}
        style={{ 
          position: 'absolute', 
          top: `${popoverPosition.top + 105.5}px`, 
          left: `${popoverPosition.left +230}px`, 
          zIndex: 1000, 
          background: 'none', 
          color: '#000000', 
          border: 'none', 
          border: 'none', 
          borderRadius: '100px', 
          padding: '5px 8px', 
          padding: '5px 8px', 
          cursor: 'pointer', 
          fontSize: '15px' 
        }}
      >
        {isRecording ? <FontAwesomeIcon icon="fa-solid fa-circle-stop" /> : <FontAwesomeIcon icon="fa-solid fa-microphone" />}
      </button>

      {showPopover && (
        <div
          className="popover"
          style={{
            top: `${popoverPosition.top + 85.5}px`,
            left: `${popoverPosition.left + 260}px`,
            display: 'flex',
            position: 'absolute'
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


