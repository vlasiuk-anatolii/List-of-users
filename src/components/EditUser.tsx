import './EditUser.scss';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Alert, FormControlLabel } from '@mui/material';
// eslint-disable-next-line import/extensions, import/no-unresolved
import { createUser } from '../api/api';

const label = {
  inputProps: { 'aria-label': 'Checkbox demo' },
  label: 'IsActive',
};

export function EditUser() {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [sex, setSex] = React.useState('');
  const [isErrorSex, setIsErrorSex] = useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [isErrorFirstName, setIsErrorFirstName] = useState(false);
  const [lastName, setLastName] = React.useState('');
  const [isErrorLastName, setIsErrorLastName] = useState(false);
  const [job, setJob] = React.useState('');
  const [isErrorJob, setIsErrorJob] = useState(false);
  const [biography, setBiography] = React.useState('');
  const [isErrorBiography, setIsErrorBiography] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isErrorForm, setIsErrorForm] = useState(false);
  const [isCreatedUser, setIsCreatedUser] = useState(false);

  const date = `${value?.getFullYear()}-${value?.getMonth()}-${value?.getDay()}`;

  const handleChangeFirstName = (name: string) => {
    if ((/^[a-zA-z\s]*$/g).test(name)) {
      setFirstName(name);
      setIsErrorFirstName(false);
    } else {
      setIsErrorFirstName(true);
    }
  };

  const handleChangeLastName = (name: string) => {
    if ((/^[a-zA-z\s]*$/g).test(name)) {
      setLastName(name);
      setIsErrorLastName(false);
    } else {
      setIsErrorLastName(true);
    }
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setSex(event.target.value as string);
      setIsErrorSex(false);
    } else {
      setIsErrorSex(true);
    }
  };

  const handleChangeJob = (name: string) => {
    if ((/^[\w ""\d]*$/g).test(name)) {
      setJob(name);
      setIsErrorJob(false);
    } else {
      setIsErrorJob(true);
    }
  };

  const handleChangeBiography = (name: string) => {
    if ((/^[\w().,!?""'' \d]*$/g).test(name)) {
      setBiography(name);
      setIsErrorBiography(false);
    } else {
      setIsErrorBiography(true);
    }
  };

  const handlerForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(sex);
    if (firstName && lastName && sex && value && job && biography) {
      createUser(firstName, lastName, date, sex, job, biography, isActive);
      setIsErrorForm(false);
      setIsCreatedUser(true);
      setSex('');
      setFirstName('');
      setLastName('');
      setJob('');
      setBiography('');
      setIsActive(false);
    } else {
      setIsErrorForm(true);
      setIsCreatedUser(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '300px' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handlerForm}
      >
        <h1 className="title">Add User</h1>
        <div className="wrapper">
          <TextField
            error={isErrorFirstName}
            required
            id="outlined-required"
            label="First Name"
            placeholder="First Name"
            helperText={isErrorFirstName ? 'Use only a-zA-Z' : ''}
            inputProps={{ maxLength: 256 }}
            value={firstName}
            onChange={(event) => {
              handleChangeFirstName(event.target.value);
            }}
          />
          <TextField
            error={isErrorLastName}
            required
            id="outlined-required"
            label="Last Name"
            placeholder="Last Name"
            helperText={isErrorLastName ? 'Use only a-zA-Z' : ''}
            inputProps={{ maxLength: 256 }}
            value={lastName}
            onChange={(event) => {
              handleChangeLastName(event.target.value);
            }}
          />

          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <Stack spacing={3}>
              <DatePicker
                disableFuture
                label="Birth Date"
                mask="____-__-__"
                inputFormat="yyyy-MM-dd"
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue: React.SetStateAction<Date | null>) => {
                  setValue(newValue);
                }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps,
                ) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <Box>
            <FormControl
              sx={{ m: 1, width: 300 }}
            >
              <InputLabel
                required
                id="demo-simple-select-label"
              >
                Gender
              </InputLabel>
              <Select
                error={isErrorSex}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sex}
                label={isErrorSex ? 'You should choose a gender' : 'Gender*'}
                onChange={handleChangeGender}
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            error={isErrorJob}
            required
            id="outlined-required"
            label="Job"
            placeholder="Job"
            inputProps={{ maxLength: 256 }}
            helperText={isErrorJob ? 'You have used wrong symbol' : ''}
            value={job}
            onChange={(event) => {
              handleChangeJob(event.target.value);
            }}
          />
          <TextField
            error={isErrorBiography}
            required
            id="outlined-multiline-static"
            label="Biography"
            multiline
            rows={6}
            placeholder="Biography"
            helperText={isErrorBiography ? 'You have used wrong symbol' : ''}
            inputProps={{ maxLength: 1024 }}
            value={biography}
            onChange={(event) => {
              handleChangeBiography(event.target.value);
            }}
          />

          <Stack spacing={2} direction="row" sx={{ m: 1 }}>
            <FormControlLabel
              control={<Checkbox {...label} />}
              label="is Active"
              onChange={() => {
                setIsActive(!isActive);
              }}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ m: 1 }}>
            <Button
              variant="outlined"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
          {isErrorForm && (
            <Stack sx={{ m: 1, width: 300 }} spacing={2}>
              <Alert variant="filled" severity="error">
                Form filled wrong!
              </Alert>
            </Stack>
          ) }

          {isCreatedUser && (
            <Stack sx={{ m: 1, width: 300 }} spacing={2}>
              <Alert variant="filled" severity="success">
                User was created successfully!
              </Alert>
            </Stack>
          ) }

        </div>

      </Box>

    </>
  );
}
