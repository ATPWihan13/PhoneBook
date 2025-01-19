import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddContactPage from './pages/AddContactPage';
import EditContactPage from './pages/EditContactPage';
import "./App.css";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<AddContactPage />} />
                    <Route path="/edit/:id" element={<EditContactPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
