import React, { useRef } from "react";
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
    <>
      <h1 className={styles.auth_heading}>Sign Up</h1>
      <input ref={emailRef} className={styles.auth_input} type="text" />
      <input ref={passwordRef} className={styles.auth_input} type="password" />
      <button className={styles.auth_input} type="submit" onClick={clickHandler}>Register</button>
    </>
  )
}

export default SignUp;
