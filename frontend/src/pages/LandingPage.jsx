import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
const LandingPage = () => {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Vidsync</h2>
        </div>
        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div>
          <h1><span style={{color : "#FF9839"}}>Connect</span> with your loved Ones </h1>

          <p>Cover a distance by vidsync</p>
          <Button variant="contained" href="/auth">
        Get Started
      </Button>
        </div>
        <div >
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
