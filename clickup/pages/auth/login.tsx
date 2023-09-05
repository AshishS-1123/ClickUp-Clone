import React, { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '../../components/Input';
import { Database } from '../../database.types';

export interface Credentials {
  email: string;
  password: string;
};

const defaultCredentials: Credentials = {
  email: '',
  password: '',
};

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>(defaultCredentials);
  const [errors, setErrors] = useState<Credentials>(defaultCredentials);
  const [generalError, setGeneralError] = useState<string>('');
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFor = e.target.name;
    const inputValue = e.target.value;

    // Update the input values.
    setCredentials({ ...credentials, [inputFor]: inputValue });

    // Update errors if any.
    setErrors({ ...errors, [inputFor]: inputValue !== '' });
  }

  const onSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    setGeneralError(error?.message || '');

    router.push('/dashboard');
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-skyLightest">
      <Head>
        <title>Login</title>
      </Head>
      <Paper className="w-11/12 max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 flex flex-col justify-items-center drop-shadow-xl">
        <h5 className="text-center text-3xl font-black mb-4">Welcome back!</h5>

        <Input
          type="text"
          name="email"
          placeholder="example@site.com"
          initialValue=""
          onChange={onChangeHandler}
          label="Email"
          containerStyle="mt-3.5 mb-2.5"
        />

        <Input
          type="password"
          name="password"
          placeholder="****"
          initialValue=""
          onChange={onChangeHandler}
          label="Password"
          containerStyle="mt-3.5 mb-2.5"
        />

        <FormHelperText className="text-sm text-center mt-1.5" style={{ color: 'red' }}>
          {generalError}
        </FormHelperText>

        <Button
          disableElevation
          color='secondary'
          className="font-semibold text-center text-lg normal-case bg-purpleBase hover:bg-purpleBase h-12 mt-4"
          onClick={onSignIn}
        >
          Start playing
        </Button>

        <FormHelperText className="text-sm text-center mt-2.5 text-inkBase">
          Don&apos;t have and account?
          <Link className="text-purpleBase" href="/auth/signup">Register</Link>.
        </FormHelperText>
      </Paper>
    </div>
  );
}