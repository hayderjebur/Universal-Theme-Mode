import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import useStyles from './useStyle';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { IUserInfo, IErrors } from '../../interface/UserInfo';
import Success from '../Success';
import { checkInputsValidation } from '../../helpers/checkInputsValidation';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Form: React.FC = (): JSX.Element => {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
  });
  const [errors] = useState<IErrors>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
  });
  const [disable, setDisable] = useState(true);
  const { firstName, middleName, lastName, email } = userInfo;

  //Actions
  const { mockApiCall, resetInputs } = useActions();
  const { isLoading, isValidFields } = useTypedSelector(
    (state) => state.userInputs
  );

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      email &&
      errors.firstName === '' &&
      errors.lastName === '' &&
      errors.email === ''
    ) {
      setDisable(false);
    }
    // eslint-disable-next-line
  }, [userInfo]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      checkInputsValidation(name, value, errors);

      setUserInfo({
        ...userInfo,
        [event.target.name]: event.target.value,
      });
    },
    [userInfo]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mockApiCall();

    setUserInfo({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
    });
    setDisable(true);
    resetInputs();
  };
  return (
    <main className={classes.main}>
      {isValidFields && <Success />}
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>
          User Info
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <TextField
            id='firstName'
            label='First Name'
            fullWidth
            required
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name='firstName'
            autoComplete='firstName'
            autoFocus
            helperText={errors.firstName}
            error={errors.firstName.length > 0 && Boolean(errors.firstName)}
            value={firstName}
            onChange={handleChange}
          />

          <TextField
            id='middleName'
            label='Middle Name'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name='middleName'
            autoComplete='middleName'
            value={middleName}
            onChange={handleChange}
          />

          <TextField
            id='lastName'
            label='Last Name'
            fullWidth
            required
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name='lastName'
            autoComplete='lastName'
            helperText={errors.lastName}
            error={errors.lastName.length > 0 && Boolean(errors.lastName)}
            value={lastName}
            onChange={handleChange}
          />

          <TextField
            id='email'
            label='E-mail address'
            fullWidth
            required
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name='email'
            autoComplete='email'
            helperText={errors.email}
            error={errors.email.length > 0 && Boolean(errors.email)}
            value={email}
            onChange={handleChange}
          />

          <Box textAlign='center'>
            <Button
              disabled={disable}
              type='submit'
              size='large'
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              {isLoading ? (
                <CircularProgress style={{ color: '#fff' }} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </main>
  );
};
export default Form;
