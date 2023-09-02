import React, { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { Credentials } from './login';
import makeRequest from '../../utils/makeRequest';

const defaultCredentials: Credentials = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
  const [errors, setErrors] = useState<Credentials>(defaultCredentials);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFor = e.target.name;
    const inputValue = e.target.value;

    // Update the input values.
    setCredentials({ ...credentials, [inputFor]: inputValue });

    // Update errors if any.
    setErrors({ ...errors, [inputFor]: inputValue !== '' });
  }

  const onSignUp = async () => {
    makeRequest('/api/auth/signup', 'POST', { email: credentials.email, password: credentials.password })
      .then((data) => {
        console.log('Data', data);
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
    
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-skyLightest">
      <Head>
        <title>SignUp</title>
      </Head>
      <Paper className="w-11/12 max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 flex flex-col justify-items-center drop-shadow-xl">
        <h5 className="text-center text-3xl font-black mb-4">Let&apos;s Go!</h5>

        <TextField
          label="Email"
          variant="outlined"
          autoFocus
          required
          className="my-3"
          size="small"
          name="email"
          value={credentials.email}
          onChange={onChangeHandler}
        />

        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          className="my-3"
          size="small"
          name="password"
          value={credentials.password}
          onChange={onChangeHandler}
        />

        <Button
          disableElevation
          color='secondary'
          className="font-semibold text-center text-lg normal-case bg-purpleBase hover:bg-purpleBase h-12 mt-4"
          onClick={onSignUp}
        >
          Start playing
        </Button>

        <FormHelperText className="text-sm text-center mt-2.5 text-inkBase">
          Already have an account?
          <Link className="text-purpleBase" href="/auth/login">Log in</Link>.
        </FormHelperText>
      </Paper>
    </div>
  );
}
