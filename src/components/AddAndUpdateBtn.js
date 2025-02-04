import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import { mpCities } from "./MpCities";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function AddAndUpdateBtn({ editDatas = null, editIndexs = null }) {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        mobileNumber: "",
        city: "",
    });
    const location = useLocation(); // Get navigation state
    const navigate = useNavigate();
    const [error, setError] = React.useState({
        name: false,
        email: false,
        mobileNumber: false,
        city: false,
    }); // for handle the error with the help of error object

    const [open, setOpen] = React.useState(false);

    const editData = location.state?.editData || null;
    const editIndex = location.state?.editIndex ?? null;

    React.useEffect(() => {
        if (editData) {
            setFormData(editData);
            setOpen(true); // Open modal if when we edit the user
        } else if (location.pathname === "/add-update-user") {
            setOpen(true);
        }
    }, [location.pathname, editData]);

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", email: "", mobileNumber: "", city: "" }); // Reset form after closing
        navigate("/"); // Redirect back after closing modal
    };

    const handleCityChange = (event) => {
        setFormData({ ...formData, city: event.target.value });
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        const newError = {
            name: !formData.name,
            email: !formData.email,
            mobileNumber: !formData.mobileNumber,
            city: !formData.city,
        };
        setError(newError);

        if (!Object.values(newError).includes(true)) {
            let existingUsers = JSON.parse(localStorage.getItem("formData")) || [];
            if (!Array.isArray(existingUsers)) {
                existingUsers = [];
            }

            if (editIndex !== null) {
                existingUsers[editIndex] = formData;
            } else {
                existingUsers.push(formData);
            }

            localStorage.setItem("formData", JSON.stringify(existingUsers));
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography sx={{ fontWeight: "bold" }} variant="h6">
                    {editIndex !== null ? "EDIT USER" : "ADD USER"}
                </Typography>
                <TextField
                    onChange={handleInputChange}
                    name="name"
                    sx={{ marginTop: "20px" }}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    error={error.name}
                    helperText={error.name ? "Name is required" : ""}
                />
                <TextField
                    onChange={handleInputChange}
                    name="email"
                    sx={{ marginTop: "20px" }}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    error={error.email}
                    helperText={error.email ? "Email is required" : ""}
                />
                <TextField
                    onChange={handleInputChange}
                    name="mobileNumber"
                    sx={{ marginTop: "20px" }}
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    value={formData.mobileNumber}
                    error={error.mobileNumber}
                    helperText={error.mobileNumber ? "Mobile number is required" : ""}
                />
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                    <InputLabel>City</InputLabel>
                    <Select value={formData.city} onChange={handleCityChange} error={error.city}>
                        {mpCities?.map((value, index) => {
                            return <MenuItem key={index} value={value}>{value}</MenuItem>;
                        })}
                    </Select>
                    {error.city && <Typography color="error" variant="body2">City is required</Typography>}
                </FormControl>
                <Button sx={{ marginTop: "20px" }} onClick={handleSubmit} variant="contained" fullWidth>
                    {editIndex !== null ? "Update" : "Submit"}
                </Button>
            </Box>
        </Modal>
    );
}
