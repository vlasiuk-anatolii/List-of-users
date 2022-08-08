import './Users.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FaceIcon from '@mui/icons-material/Face';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { delUser } from '../api/api';
import { getUsersSelector } from '../store/selectors';
import { loadUsers, AppDispatch, loadUser } from '../store';

const Transition = React.forwardRef((
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Users() {
  const [isError, setIsError] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const currentUsers = useSelector(getUsersSelector);

  const deleteUser = async (id: number) => {
    try {
      if (id) {
        await delUser(id);
        dispatch(loadUsers());
      }
    } catch (error) {
      setIsError(`${error}`);
    }
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  // eslint-disable-next-line no-console
  console.log(currentUsers);

  return (
    <>
      <h1 className="Title">Users</h1>
      <h3>{currentUsers.length === 0 ? 'Database is empty' : `In database remains ${currentUsers.length} user/s`}</h3>
      <TableContainer
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">BirthDate</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((item) => (
              <TableRow
                key={item.id}
                sx={{ 'td, th': { border: 1 } }}
              >
                <TableCell component="th" scope="row">
                  <Button
                    sx={{ mr: '20px' }}
                    variant="outlined"
                    onClick={() => {
                      if (item.id) {
                        dispatch(loadUser(item.id));
                        navigate('/user');
                      }
                    }}
                  >
                    <FaceIcon />
                  </Button>
                  {`${item.first_name} ${item.last_name}`}
                </TableCell>
                <TableCell align="center">{item.first_name}</TableCell>
                <TableCell align="center">{item.last_name}</TableCell>
                <TableCell align="center">{item.birth_date}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (item.id) {
                        deleteUser(item.id);
                      }
                    }}
                  >
                    <DeleteRoundedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          sx={{ m: '10px 20px' }}
          variant="outlined"
          onClick={() => {
            navigate('/addedituser');
          }}
        >
          Add User
          <AddCircleOutlineOutlinedIcon sx={{ ml: '10px' }} />
        </Button>
      </TableContainer>
      <div>
        <Dialog
          open={isError.length > 0}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setIsError('');
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{isError}</DialogTitle>
        </Dialog>
      </div>
    </>
  );
}
