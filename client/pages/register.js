import React from "react";
import createSection from "../containers/Card";
import SignUp from "../components/SignUp";

const sections = [
  createSection(SignUp),
]

function Home() {
  return (
    <>
      {
        sections.map((Section, idx) => {
          return <Section key={idx} />
        })
      }
    </>
  );
}

export default Home;
