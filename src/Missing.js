import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <h1>Missing</h1>
      <h2>Page Not Found</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to="/">Visit Our Home-Page</Link>
      </p>
    </main>
  );
};

export default Missing;
