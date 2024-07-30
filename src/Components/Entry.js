import React, { useState, useRef, useEffect } from 'react';
import './ResponsiveCSS/entryResponsive.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customQuill.css';
import { FaPlus, FaMicrophone, FaImage, FaStop, FaBold, FaItalic, FaVideo, FaUserAlt, FaCalendarAlt } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Entry() {
  const [value, setValue] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isRecording, setIsRecording] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const handleDateIconClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  function applyResponsiveStyles() {
    const width = window.innerWidth;
    const voicebutton = document.getElementById('voicebutton');

    if (width < 600) {
      voicebutton.top= `${popoverPosition.top + 158.5}px`;
          voicebutton.left= `${popoverPosition.left + 50}px`;
      voicebutton.style.width = '100px';
    } else if (width >= 600 && width < 900) {
    } else {
    }
}

window.addEventListener('resize', applyResponsiveStyles);
applyResponsiveStyles(); 

  return (
    <div id="entrynavigation">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home"><h1>Diary App</h1></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Username&nbsp;&nbsp;&nbsp;<FaUserAlt />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <FaCalendarAlt onClick={handleDateIconClick} style={{ cursor: 'pointer' }} />
      {showDatePicker && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      )}
      <div id='selecteddate'>
        Selected Date: {selectedDate.toLocaleDateString()}
      </div>
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
            fontSize: '18px',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <FaPlus />
        </button>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder='Enter Your Thought'
          webkit-input-placeholder="white"
          fontSize='20px'
          className='quill-editor'
          style={{
            position: 'relative',
            top: '1px'
          }}
        />
      </div>

      <button
        id='voicebutton'
        onClick={isRecording ? stopVoiceRecognition : startVoiceRecognition}
        style={{
          position: 'absolute',
          top: `${popoverPosition.top + 172.5}px`,
          left: `${popoverPosition.left + 240}px`,
          zIndex: 1000,
          background: 'none',
          color: '#000000',
          border: 'none',
          borderRadius: '100px',
          padding: '5px 8px',
          cursor: 'pointer',
          fontSize: '15px',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {isRecording ? <FaStop /> : <FaMicrophone />}
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
          <button onClick={() => handleFormat('bold')}><FaBold /></button>
          <button onClick={() => handleFormat('italic')}><FaItalic /></button>
          <button onClick={() => handleFormat('header', '1')}>H1</button>
          <button onClick={() => handleFormat('header', '2')}>H2</button>
          <label style={{ margin: '5px' }}>
            <FaImage />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, 'image')}
            />
          </label>
          <label style={{ margin: '5px' }}>
            <FaVideo />
            <input
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFileChange(event, 'video')}
            />
          </label>
        </div>
      )}
      <div id='buttongrp'>
        <Button variant='secondary' size="lg">Archive</Button> &nbsp;&nbsp;
        <Button size="lg">Save</Button> &nbsp;&nbsp;
        <Button variant='danger' size="lg">Delete</Button> &nbsp;&nbsp;
      </div>
    </div>
  );
}

export default Entry;
