import React from 'react';
import './App.css';
import DragAndDrop from './components/DragAndDrop';
import backgroundImg from "./1713248.jpg";

function App() {
    const appStyle = {
        backgroundImage: `url(${backgroundImg})`, // Use the imported image
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        // Other styles for your component
    };

    return (
        <div className="App" style={appStyle}>
            <DragAndDrop />
        </div>
    );
}

export default App;



