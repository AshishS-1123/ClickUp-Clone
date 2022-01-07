import React from "react";
import createSection from "../containers/Card";
import SignUp from "../components/SignUp/SignUp";

const sections = [
  createSection(SignUp),
]

function Home() {
  return (
    <div>
      {
        sections.map((Section, idx) => {
          return <Section key={idx} />
        })
      }
    </div>
  );
}

export default Home;
