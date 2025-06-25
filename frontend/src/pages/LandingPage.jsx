import React from "react";
import "../App.css";

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
const LandingPage = () => {

  const navigate = useNavigate();

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
          <Button onClick={()=>{navigate("/auth")}} variant="contained"  >
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
