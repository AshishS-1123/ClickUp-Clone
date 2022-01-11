import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AuthForm.module.css";

const dataFromAuthType = (authType) => {
  const metaData = {};

  if (authType == "login") {
    metaData.formHeading = "Welcome back!";
    metaData.alternateAuthLink = "/register";
    metaData.alternateAuthText = "Don't have an account? Register";
  } else if (authType == "register") {
    metaData.formHeading = "Let's go!";
    metaData.alternateAuthLink = "/login";
    metaData.alternateAuthText = "Already have an account? Log In";
  }

  return metaData;
}

function AuthForm({ reducer, authType }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const error = useSelector(state => state.authReducer.error);

  const { formHeading, alternateAuthLink, alternateAuthText } = dataFromAuthType(authType);
  const clickHandler = (event) => {
    event.preventDefault();

    const userEmail = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(reducer({ userEmail, password }))
      .then((data) => {
        if (data.type.search("rejected") === -1) {
          // Redirect to another page.
          console.log("Successful!");
        } else {
          console.log("Failed");
        }
      })
      .catch((error) => {
        console.log("Failed: ", error);
      })
  }

  return (
    <form className={styles.auth_form}>
      <h1 className={styles.auth_heading}>{formHeading}</h1>

      <div className={styles.input_container}>
        <label htmlFor="auth__email" className={styles.auth_label}>Email</label>
        <input ref={emailRef} type="text" id="auth__email" className={styles.auth_input} placeholder="example@site.com" />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="auth__password" className={styles.auth_label}>Password</label>
        <input ref={passwordRef} type="password" id="auth__password" className={styles.auth_input} placeholder="*****" />
      </div>

      <p className={styles.error_message}>
        {error}
      </p>

      <button type="submit" className={styles.auth_button} onClick={clickHandler}>Start playing</button>

      <Link href={alternateAuthLink}>
        <a className={styles.auth_link}>Already have an account? Log In</a>
      </Link>
    </form>
  )
}

export default AuthForm;
