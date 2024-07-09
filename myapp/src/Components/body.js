import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const ImageUpload = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [voiceText, setVoiceText] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [editorData, setEditorData] = useState('<p>Hello from CKEditor 5!</p>');

  const onDrop = useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('File uploaded successfully', response);
      setUploadStatus(response.data.message);
    }).catch(error => {
      console.error('Error uploading file', error);
      setUploadStatus('Upload failed');
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const startVoiceTyping = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Speech recognition result:', transcript);
      setVoiceText(transcript);
      setEditorData(prevData => `${prevData} <p>${transcript}</p>`);
    };

    recognition.start();
  };

  const startRecording = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices API not supported');
      return;
    }
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
  
        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
          setAudioBlob(audioBlob);
        };
  
        mediaRecorder.start();
        setRecording(true);
  
        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
        }, 5000); // Record for 5 seconds
      })
      .catch(error => {
        console.error('Error accessing microphone', error);
      });
  };
  
  const uploadAudio = () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.mp3'); // Ensure the filename is specified

    axios.post('http://localhost:5000/upload-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('Audio uploaded successfully', response);
      setUploadStatus(response.data.message);
    }).catch(error => {
      console.error('Error uploading audio', error);
      
      setUploadStatus('Audio upload failed');
    });
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #000', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>
      {uploadStatus && (
        <div style={{ textAlign: 'center' }}>
          <p>Status: {uploadStatus}</p>
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={startVoiceTyping}>Start Voice Typing</button>
       {/* <p>{voiceText}</p>*/}
        <button onClick={startRecording} disabled={recording}>
          {recording ? 'Recording...' : 'Start Recording Voice Note'}
        </button>
        <button onClick={uploadAudio} disabled={!audioBlob}>
          Upload Voice Note
        </button>
      </div>
      <CKEditor
        editor={ ClassicEditor }
        data={editorData}
        
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log(data);
        }}
        config={ {
          toolbar: [
            'undo', 'redo', '|',
            'heading', '|', 'bold', 'italic', '|',
            'link', 'insertTable', 'mediaEmbed', '|',
            'bulletedList', 'numberedList', 'indent', 'outdent'
          ],
          plugins: [
            Bold,
            Essentials,
            Heading,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            Undo
          ],
        } }
      />
    </div>
  );
};

export default ImageUpload;
