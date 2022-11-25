import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../redux/store';
import { addUsers } from '../redux/actions';

const AddUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "",
    status: ""
  });

  const [error, setError] = useState("");

  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { name, email, gender, status } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !gender || !status) {
      setError("Please input all Field");
    } else {
      dispatch(addUsers(state));
      navigate("/");
      setError("");
    }
  };
  return (
    <div>
      <h2>Add New User</h2>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <Box
        component="form"
        sx={{
          marginTop: 5,
          '& > :not(style)': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField id="outlined-size-small" label="Name" variant="outlined" value={name} name="name" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Email" variant="outlined" value={email} name="email" type="email" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Gender (Male/Female)" variant="outlined" value={gender} name="gender" type="text" onChange={handleInputChange}/>
        <br />
        <TextField id="outlined-size-small" label="Status (Active/Inactive)" variant="outlined" value={status} name="status" type="text" onChange={handleInputChange}/>
        <br />
        <ButtonGroup variant="contained" aria-label="text button group">
          <Button style={{ width: '170px' }} color="primary" onClick={() => navigate('/')}>Cancel</Button>
          <Button style={{ marginLeft: '20px', width: '170px' }} color="primary" type="submit">Submit</Button>
        </ButtonGroup>
      </Box>
    </div>
  )
}

export default AddUser;