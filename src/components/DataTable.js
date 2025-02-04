import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddAndUpdateBtn from './AddAndUpdateBtn';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Home from './Home';

export default function DataTable({ handleOpen }) {
    const [userData, setUserData] = React.useState([]);
    // const [editData, setEditData] = React.useState(null);
    // const [editIndex, setEditIndex] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false);
    const [searchCity, setSearchCity] = React.useState(""); // For filtering by city
    const [debouncedSearchCity, setDebouncedSearchCity] = React.useState(searchCity);
    const navigate = useNavigate();
    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem("formData")) || [];
        setUserData(data);
    }, [refresh]); // it will be fetch while page is refreshed

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchCity(searchCity);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchCity]);

    const handleEdit = (index) => {
        // setEditData(userData[index]);
        // setEditIndex(index);
        navigate("/add-update-user", { state: { editData: userData[index], editIndex: index } });
    };

    const handleDelete = (index) => {
        let updatedUsers = [...userData];
        updatedUsers.splice(index, 1);
        localStorage.setItem("formData", JSON.stringify(updatedUsers));
        setRefresh(prev => !prev);
    };

    const filteredData = userData.filter(user =>
        user.city.toLowerCase().includes(searchCity.toLowerCase())
    );

    return (
        <>
            <div className='mb-5'>
                <Home />
            </div>
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <TextField
                    label="Search by City"
                    variant="outlined"
                    size="small"
                    sx={{ marginBottom: "10px" }}
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>S.NO</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Mobile Number</strong></TableCell>
                            <TableCell><strong>City</strong></TableCell>
                            <TableCell><strong>Edit</strong></TableCell>
                            <TableCell><strong>Delete</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.mobileNumber}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(index)} variant="contained" color="primary">
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(index)} variant="contained" color="error">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}





