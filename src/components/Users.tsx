import './Users.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { delUser } from '../api/api';
import { getUsersSelector } from '../store/selectors';
import { loadUsers, AppDispatch } from '../store';

export function Users() {
  const dispatch: AppDispatch = useDispatch();
  const currentUsers = useSelector(getUsersSelector);
  const deleteUser = async (id: number) => {
    if (id) {
      await delUser(id);
      dispatch(loadUsers());
    }
  };

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return (
    <>
      <h1 className="Title">Users</h1>
      <TableContainer
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ 'td, th': { border: 1 } }}>
              <TableCell>First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">BirthDate</TableCell>
              <TableCell align="left">Sex</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((item) => (
              <TableRow
                key={item.id}
                sx={{ 'td, th': { border: 1 } }}
              >
                <TableCell component="th" scope="row">
                  {item.first_name}
                </TableCell>
                <TableCell align="left">{item.last_name}</TableCell>
                <TableCell align="left">{item.birth_date}</TableCell>
                <TableCell align="left">{item.gender}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      deleteUser(item.id);
                    }}
                  >
                    <DeleteRoundedIcon />
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
