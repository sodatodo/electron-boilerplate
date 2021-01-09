import React from 'react';
import ReactDOM from 'react-dom';
import './style.less'

function App() {
    return (
        <div>Hello World!</div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)