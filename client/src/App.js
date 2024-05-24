import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CVEList from './components/CVEList';
import CVEDetail from './components/CVEDetail';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<CVEList />} />
                    <Route path="/cves/:id" element={<CVEDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
