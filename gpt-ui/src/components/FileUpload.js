import React, { useEffect, useState } from 'react'
import { getKnowledgeBase, uploadFileToServer } from '../actions'

export default function FileUpload({ selectedFile, setSelectedFile }) {
    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    // const [selectedFile, setSelectedFile] = useState("")  // Added selectedFile state

    useEffect(() => {
        refreshFileNames()
    }, [])

    const refreshFileNames = () => {
        getKnowledgeBase().then(res => setFiles(res))
    }

    const uploadFile = (file) => {
        console.log("uploading...")
        setUploading(true)
        uploadFileToServer(file).then(() => {
            refreshFileNames()
            setUploading(false)
        })
    }

    return <div className='app-container__file-upload'>
        <div className='header'>
            ChatBOT
        </div>

        <div className='add-file'>
            <div>Add File</div>
            <label>
                <input type="file" name="file"  onChange={e => uploadFile(e.target.files[0])}/>
                <img src='add-file-bold.svg' width={24} height={24} />
            </label>

            {/* Added file selection dropdown */}


        </div>


        <div className='knowledge-base'>
        <div>
            <div style={{marginLeft:"20px", alignItems:"baseline"}}>Select File</div>
             
                <select value={selectedFile} onChange={e => setSelectedFile(e.target.value)} style={{ marginTop: '10px', marginLeft:"10px",width:"80%", height:"40px", borderRadius: '10px' }}>
                    <option value="">Select</option>
                    {files.map((file, index) => <option key={index} value={file}>{file}</option>)}
                </select>
            </div>

        </div>
    </div>
}
