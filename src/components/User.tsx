import './User.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TableContainer from '@mui/material/TableContainer';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { delUser, getUser } from '../api/api';
import { getCurrentIdSelector, getCurrentUserSelector } from '../store/selectors';
import {
  AppDispatch,
  loadUser,
  loadUsers,
  setCurrentId,
} from '../store';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export function User() {
  const navigate = useNavigate();
  const [isId, setIsId] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const currentId = useSelector(getCurrentIdSelector);
  const getCurrentUser = async () => {
    if (currentId) {
      await getUser(currentId);
      dispatch(loadUser(currentId));
    }
  };

  const deleteUser = async (id: number) => {
    if (id) {
      await delUser(id);
      dispatch(loadUsers());
    }
  };

  const currentUser = useSelector(getCurrentUserSelector);

  useEffect(() => {
    dispatch(loadUser());
    getCurrentUser();
  }, [currentId]);

  return (
    <>
      <h1 className="Title">User</h1>
      <TableContainer
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell align="center">first_name</TableCell>
              <TableCell align="center">last_name</TableCell>
              <TableCell align="center">birth_date</TableCell>
              <TableCell align="center">gender</TableCell>
              <TableCell align="center">job</TableCell>
              <TableCell align="center">biography</TableCell>
              <TableCell align="center">is_active</TableCell>
              <TableCell align="center">edit</TableCell>
              <TableCell align="center">delete</TableCell>
            </TableRow>
          </TableHead>
          {currentUser
            ? (
              <TableBody>
                <TableRow
                  sx={{ 'td, th': { border: 1 } }}
                >
                  <TableCell align="center" component="th" scope="column">
                    {currentUser.first_name}
                  </TableCell>
                  <TableCell align="center">{ currentUser.last_name}</TableCell>
                  <TableCell align="center">{ currentUser.birth_date}</TableCell>
                  <TableCell align="center">{ currentUser.gender}</TableCell>
                  <TableCell align="center">{ currentUser.job}</TableCell>
                  <TableCell align="center">{ currentUser.biography}</TableCell>
                  <TableCell align="center"><Checkbox {...label} checked={currentUser.is_active} /></TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => {}}
                    >
                      <ModeEditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        if (currentId) {
                          deleteUser(currentId);

                          dispatch(setCurrentId(undefined));
                        } else {
                          setIsId(true);
                        }
                      }}
                    >
                      <DeleteRoundedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
            : (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                  User is not exist!
                </Alert>
              </Stack>
            )}
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
      {isId && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="filled" severity="error">
            User is not exist!
          </Alert>
        </Stack>
      ) }
    </>
  );
}
