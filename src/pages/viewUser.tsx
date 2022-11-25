import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addPosts, deletePosts, getDetailUsers, getPosts } from '../redux/actions';

const ViewUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "",
    status: ""
  });

  const [error, setError] = useState("");
  let { id } = useParams();
  const { user } = useAppSelector((state) => state.data);
  const { posts } = useAppSelector((state) => state.data);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { name, email, gender, status } = state;

  useEffect(() => {
    dispatch(getDetailUsers(id));
    dispatch(getPosts(id));
  }, []);

  useEffect(() => {
    if (posts) {
        setState({ ...posts });
    }
  }, [posts]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        },
    }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const CustomBackButton = styled(Button) ({
        float: 'right',
        marginTop: '-50px',
        marginRight: '30px',
        width: '15%',
        backgroundColor: 'black',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'black',
            borderColor: 'black',
            boxShadow: 'none',
        }
    });

    const CustomPostButton = styled(Button) ({
        float: 'right',
        marginTop: '-50px',
        marginRight: '30px',
        width: '15%',
        // backgroundColor: 'black',
        fontWeight: 'bold',
        '&:hover': {
            // backgroundColor: 'black',
            // borderColor: 'black',
            boxShadow: 'none',
        }
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // e.preventDefault();
        // if ( !title || !body) {
        //   setError("Please input all Field");
        // } else {
          dispatch(addPosts(state));
          setError("");
        //   handleClose();
        //}
      };

      const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete the post ?")) {
            dispatch(deletePosts(id));
        }
      };
  return (
    <div>
      <h2 style={{ marginRight: '82%' }}>View User Detail</h2>
      <CustomBackButton variant="contained" onClick={() => navigate('/')}>Back</CustomBackButton>
      <hr></hr>
      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <Box
        component="form"
        sx={{
          marginRight: 120,
          marginTop: 3,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <TextField id="filled-read-only-input" label="ID" variant="filled" value={user.id || ""} name="id" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Name" variant="filled" value={user.name || ""} name="name" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Email" variant="filled" value={user.email || ""} name="email" type="email" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Gender" variant="filled" value={user.gender || ""} name="gender" type="text" InputProps={{readOnly: true}}/>
        <br />
        <TextField id="filled-read-only-input" label="Status" variant="filled" value={user.status || ""} name="status" type="text" InputProps={{readOnly: true}}/>
        <br />
      </Box>
      <br />
      <br />
      <div>
        <h2 style={{ marginRight: '85%' }}>Posts List</h2>
        <CustomPostButton variant="contained" color="primary" onClick={handleClickOpen}>Add Post</CustomPostButton>
        <div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Post</DialogTitle>
            <DialogContent>
            {/* <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText> */}
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Post Title"
                type="text"
                fullWidth
                variant="outlined"
            />
            <TextareaAutosize
                aria-label="Body"
                placeholder="Post Body"
                style={{ width: 550, height: 200 }}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ marginTop: 1, minWidth: 900 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="left">Title</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="left">Body</StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {posts && posts.map((post) => (
                <StyledTableRow key={post.id}>
                <StyledTableCell component="th" scope="row">{post.title}</StyledTableCell>
                <StyledTableCell align="left">{post.body}</StyledTableCell>
                <StyledTableCell align="center">
                    <Button variant="contained" size="small" onClick={() => handleDelete(post.id)} color="error">Delete</Button>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ViewUser;