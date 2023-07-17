import classNames from 'classnames'
import React, { useState, useRef, useEffect } from 'react' // Added useEffect
import { queryPrompt, getKnowledgeBase } from '../actions'

export default function Chat({ selectedFile, setSelectedFile }) {
    const [messages, setMessages] = useState([])
    // const [selectedFile, setSelectedFile] = useState("")
    const [files, setFiles] = useState([])
    const inputRef = useRef()

    useEffect(() => {
        getKnowledgeBase().then(res => setFiles(res)) 
    }, [])

    const addPrompt = (msg) => {
        setMessages(prevInput => [...prevInput, msg, 'Typing...'])
        inputRef.current.value = ''
        
        queryPrompt(msg, selectedFile).then(res => { 
            const response = res?.completion || 'No result found from your knowledge base'
            setMessages(prevInput => [...prevInput.slice(0, -1), response])
        })
    }

    return (
        <div className='app-container__chat'>

            <div className='chat-container'>
                {messages.map((msg, index) => {
                    return (<div key = {index} className={classNames({ 'message-outgoing': index % 2 === 0, 'message-incoming': index % 2 === 1 })}>
                        <div className='bubble'>{msg}</div>
                    </div>)
                })}
            </div>

            <div className='input-box-container' style={{ display: 'flex' }}>
                {/* Select index */}
                <select value={selectedFile} onChange={e => setSelectedFile(e.target.value)} style={{ width:"6%", marginLeft:"-20px",marginRight: '10px', borderRadius: '50%' }}>
                    <option value="">Select file</option>
                    {files.map(file => <option value={file}>{file}</option>)}
                </select>

                <div className='input-box' style={{ display: 'flex', alignItems: 'center', borderRadius: '10px', backgroundColor: '#eee' }}>
                    <input ref={inputRef} style={{ flex: '1', border: 'none', backgroundColor: "transparent", borderRadius: '10px', padding: '1px' }} onKeyDown={e => {
                        if (e.key === 'Enter') {
                            addPrompt(e.target.value)
                        }
                    }} />
                    <img width={24} height={24} src='send-icon.svg' onClick={() => addPrompt(inputRef?.current?.value)} style={{ marginRight: '10px' }} />
                </div>
            </div>
        </div>
    )
}
