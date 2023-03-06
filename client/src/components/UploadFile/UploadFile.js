import React from 'react';

import './UploadFile.css'

const UploadFile = ({ onChange, onFileUpload }) => (
    <form className ="form">
        <input
            className="upload"
            type="file"
            onChange={onChange}
        />
        <button className="uploadFile" onClick={(event) => onFileUpload(event)}>Upload</button>
    </form>
)

export default UploadFile;