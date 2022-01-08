import React, { useRef } from "react";
import Link from "next/link";
import makeRequest from "../../utils/request";

import styles from "../SignUp/SignUp.module.css";

const registerUser = async (userEmail, password) => {
  const url = "/auth/login";
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, "POST", body);

  return { data, status };
}

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const clickHandler = (event) => {
    event.preventDefault();

    const userEmail = emailRef.current.value;
    const password = passwordRef.current.value;

    registerUser(userEmail, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <form id="signIn__form" className={styles.auth_form}>
      <h1 className={styles.auth_heading}>Welcome back!</h1>

      <div className={styles.input_container}>
        <label htmlFor="signIn__email" className={styles.auth_label}>Email</label>
        <input type="text" id="signIn__email" className={styles.auth_input} placeholder="Enter your email" />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="signIn__password" className={styles.auth_label}>Password</label>
        <input type="password" id="signIn__password" className={styles.auth_input} placeholder="Enter password" />
      </div>

      <button type="submit" className={styles.auth_button} onClick={clickHandler}>Log In</button>

      <Link href="/register">
        <a className={styles.auth_link}>Don't have an account? Register</a>
      </Link>
    </form>
  )
}

export default SignIn;
