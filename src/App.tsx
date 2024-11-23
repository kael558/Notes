import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload';
import Query from './components/Query';



function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Query />} />
					<Route path="/upload" element={<Upload />} />

				</Routes>
			</div>
		</Router>
	);
}

export default App;