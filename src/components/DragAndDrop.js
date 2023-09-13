import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DragAndDrop.css'

import axios from 'axios';
import logo from '../BlackTestLogo.png';
import pdfIcon from '../pdfIcon.png';
import imageIcon from '../imageIcon.png';


const DragAndDrop = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileType, setSelectedFileType] = useState(null);


    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const uploadFileToServer = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected.');
                return;
            }

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Send the file to the server using a POST request
            const response = await axios.post('http://localhost:8989/upload', formData);

            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error uploading file to server:', error);
        }
    };


























    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]; // Only accept the first dropped file

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Data = reader.result.split(',')[1];
            setSelectedFile({
                name: file.name,
                type: file.type,
                data: base64Data,
            });
            if (file.type.startsWith('image/')) {
                setSelectedFileType('image');
            } else if (file.type === 'application/pdf') {
                setSelectedFileType('pdf');
            } else {
                setSelectedFileType(null);
            }
        };

        reader.readAsDataURL(file);
    }, []);

    const sendFileToServer = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                await axios.post('http://localhost:8989/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (error) {
                console.error('Error sending file to server:', error);
            }
        }
    };

    const handleDownloadClick = () => {
        if (selectedFile) {
            const { type, data } = selectedFile;

            const byteArray = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
            const blob = new Blob([byteArray], { type });

            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = selectedFile.name;
            a.style.display = 'none'; // Hide the anchor element

            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };


    const sendRequest = async () => {
        try {
            await axios.get('http://localhost:8989/count');
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    // const fileName = async () => {
    //     try {
    //         await axios.post('http://localhost:8989/display', { message: selectedFile.name });
    //     } catch (error) {
    //         console.error('Error sending Amiel to server:', error);
    //     }
    // };


    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                await fetch('http://localhost:8989/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File sent successfully');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleOpenFileClick = () => {
        if (selectedFile) {
            const { type, data } = selectedFile;

            if (type.startsWith('image/')) {
                // For images, create a Blob URL
                const blob = new Blob([new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))], { type });
                const blobURL = URL.createObjectURL(blob);

                // Open the Blob URL in a new window/tab
                const newWindow = window.open(blobURL, '_blank');
                if (newWindow) {
                    newWindow.focus();
                }
            } else if (type === 'application/pdf' || type === 'text/html') {
                // For PDFs or HTML files, create a Blob URL
                const blob = new Blob([new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))], { type });
                const blobURL = URL.createObjectURL(blob);

                // Open the Blob URL in a new window/tab
                const newWindow = window.open(blobURL, '_blank');
                if (newWindow) {
                    newWindow.focus();
                }
            } else {
                // For other file types, create a Data URL
                const dataURL = `data:${type};base64,${data}`;

                // Create a temporary anchor element
                const anchor = document.createElement('a');
                anchor.href = dataURL;
                anchor.target = '_blank';

                // Trigger a click event on the anchor to open/download the file
                anchor.click();
            }
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };


    const buttonStyle = {
        backgroundColor: 'white', // Background color for the buttons
        color: 'black', // Text color
        padding: '10px 20px', // Padding
        borderRadius: '20px', // Rounded corners
        cursor: 'pointer', // Show pointer cursor on hover
        fontSize: '16px', // Font size
        margin: '5px', // Margin between buttons
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Soft shadow effect
        minWidth: '120px', // Fixed width for all buttons
        minHeight: '40px', // Fixed height for all buttons
    };


    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '-100px', // Adjust the margin as needed
    };

    const logoStyle = {
        width: '1000px', // Set the desired width
        height: 'auto', // Let the height adjust proportionally
        // Other styles for your logo image

    };

    const UploadStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0px', // Adjust the margin as needed
    };

    const dropzoneStyle = {
        border: '2px dashed #ccc', // Border style for the drop zone
        borderRadius: '10px', // Rounded corners
        padding: '20px', // Padding
        textAlign: 'center', // Center-align the content
        width: '500px', // Set the desired width
        height: '100px', // Set the desired height
        margin: '0 auto', // Center the box horizontally
    };

    const iconStyle = {
        maxHeight: '70px', // Set the maxWidth to 100% to match the drop zone's width
        height: '60px', // Maintain the aspect ratio
        marginBottom: '-25px',
    };

    const pdfIconStyle = {
        maxHeight: '70px', // Set the maxWidth to 100% to match the drop zone's width
        height: '70ox', // Maintain the aspect ratio
        marginBottom: '-25px',
    };

    const NameStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0px', // Adjust the margin as needed
    };


        const checkConnection = async () => {
            try {
                const response = await axios.get('http://localhost:8989/test3');
                console.log('Response from server:', response.data);
                // Handle the response as needed
            } catch (error) {
                console.error('Error connecting to server:', error);
                // Handle errors
            }
        };






    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ['.jpg', '.jpeg', '.pdf', '.html'],
    });

    return (
        <div className="container">
            <div style={logoContainerStyle}>
                <img src={logo} alt="Website Logo" style={logoStyle}/>
            </div>
            <div style={UploadStyle}><h1>Upload your test</h1></div>
            <div {...getRootProps()} className={`dropzone${selectedFile ? ' active' : ''}`} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {selectedFile ? (
                    <h3><p style={iconStyle}>{selectedFileType === 'image' ? (
                        <img src={imageIcon} alt="Image Icon" style={iconStyle} />
                    ) :
                        <img src={pdfIcon} alt="PDF Icon" style={pdfIconStyle} />
                    }
                        <p style={NameStyle}>{selectedFile.name}</p></p></h3>
                ) : (
                    <h3><p>Drag &amp; drop JPG, JPEG, PDF, or HTML files here, or click to select files</p></h3>
                )}
            </div>
            <div className="buttons">
                <button onClick={handleUpload} disabled={!selectedFile} style={buttonStyle}>
                    Send file
                </button>
                <button onClick={sendRequest} disabled={!selectedFile} style={buttonStyle}>
                    Send request
                </button>
                <button onClick={handleDownloadClick} disabled={!selectedFile} style={buttonStyle}>
                    Download
                </button>
                <button onClick={handleOpenFileClick} disabled={!selectedFile} style={buttonStyle}>
                    Open
                </button>
                <button onClick={clearFile} style={buttonStyle}>
                    Clear
                </button>

                <div>
                    <input type="file" onChange={handleFileInputChange} />
                    <button onClick={uploadFileToServer}>Upload File</button>
                </div>



            </div>
        </div>
    );
};

export default DragAndDrop;

