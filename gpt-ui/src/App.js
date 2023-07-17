import logo from './logo.svg';
import './App.scss';
import FileUpload from './components/FileUpload';
import Chat from './components/Chat'
import React, { useState } from 'react';
function App() {
  const [selectedFile, setSelectedFile] = useState('');

  return (
    <div className="app-container">
        <FileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <Chat selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
   
    </div>
  );
}

export default App;
