import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = ({ onFileDrop }) => {
    const onDrop = useCallback((acceptedFiles) => {
        // You can perform additional checks or processing here if needed
        if (acceptedFiles.length > 0) {
            onFileDrop(acceptedFiles);
        }
    }, [onFileDrop]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ['.jpg', '.jpeg', '.pdf'],
    });

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag &amp; drop JPG or PDF files here, or click to select files</p>
        </div>
    );
};

export default DropZone;