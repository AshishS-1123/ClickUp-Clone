import React, { useRef } from "react";
import Link from "next/link";
import makeRequest from "../../utils/request";

import styles from "./SignUp.module.css";

const registerUser = async (userEmail, password) => {
  const url = "/auth/register";
  const body = { userEmail, password };

  const { data, status } = await makeRequest(url, "POST", body);

  return { data, status };
}

function SignUp() {
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
    <form id="signUp__form" className={styles.auth_form}>
      <h1 className={styles.auth_heading}>Let's go!</h1>

      <div className={styles.input_container}>
        <label htmlFor="signUp__email" className={styles.auth_label}>Email</label>
        <input type="text" id="signUp__email" className={styles.auth_input} placeholder="example@site.com" />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="signUp__password" className={styles.auth_label}>Password</label>
        <input type="password" id="signUp__password" className={styles.auth_input} placeholder="*****" />
      </div>

      <button type="submit" className={styles.auth_button} onClick={clickHandler}>Start playing</button>

      <Link href="/login">
        <a className={styles.auth_link}>Already have an account? Log In</a>
      </Link>
    </form>
  )
}

export default SignUp;
