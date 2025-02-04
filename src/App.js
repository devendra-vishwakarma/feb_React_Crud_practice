import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataTable from './components/DataTable';
import AddAndUpdateBtn from './components/AddAndUpdateBtn';
import Home from './components/Home';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
            <Route path="/" element={<DataTable setSelectedUser={setSelectedUser} />} />
            <Route path="/add-update-user" element={<AddAndUpdateBtn selectedUser={selectedUser} setSelectedUser={setSelectedUser} />} />
        </Routes>
    );
}

export default App;
