import React, { useRef } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/reducers/authReducer";
import styles from "./SignUp.module.css";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();

    const userEmail = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(signUp({ userEmail, password }))
      .then((data) => {
        if (data.type != "auth/register/rejected") {
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
    <form id="signUp__form" className={styles.auth_form}>
      <h1 className={styles.auth_heading}>Let's go!</h1>

      <div className={styles.input_container}>
        <label htmlFor="signUp__email" className={styles.auth_label}>Email</label>
        <input ref={emailRef} type="text" id="signUp__email" className={styles.auth_input} placeholder="example@site.com" />
      </div>

      <div className={styles.input_container}>
        <label htmlFor="signUp__password" className={styles.auth_label}>Password</label>
        <input ref={passwordRef} type="password" id="signUp__password" className={styles.auth_input} placeholder="*****" />
      </div>

      <button type="submit" className={styles.auth_button} onClick={clickHandler}>Start playing</button>

      <Link href="/login">
        <a className={styles.auth_link}>Already have an account? Log In</a>
      </Link>
    </form>
  )
}

export default SignUp;
