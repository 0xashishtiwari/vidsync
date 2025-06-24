import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
} from "@mui/material";
import { Tune, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import { AuthContext } from "../contexts/AuthContext";


export const  Authentication = ()=>{
  const [username , setUsername] = useState();
  const [password , setPassword] = useState();
  const [name , setName] = useState();
  const [error , setError] = useState();
  const [message , setMessage] = useState();

  const [formState , setFormState] = useState(0);

  const [open ,setOpen] = useState(false);

const [showPassword , setShowPassword] = useState(false);


const {handleRegister , handleLogin} = useContext(AuthContext);

let handleAuth = async ()=>{
  try {
    if(formState==0){
      let result = await handleLogin(username  , password);
      console.dir(result);
      setMessage(result);
      setOpen(true);
    }
    if(formState==1){
        let result = await handleRegister(name ,username , password );
      
        setMessage(result);
        setOpen(true);
        setFormState(0);
        setError("");
        setPassword("");
        setUsername("");
        setName("");
        
    }
    
  } catch (error) {
    
   
    let message = (error.response.data.message)
    setError(message);
  }
}

const handleClose = (event, reason) => {
    // Optional: Ignore clickaway if you want
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
     
      <Paper elevation={4} sx={{ padding: 4, width: 350 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <LockIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        </Box>
       <div>
        <Button variant= {formState===0 ?  "contained" : ""} onClick={()=>{setFormState(0)}} >LogIn</Button>
        <Button  variant= {formState===1 ? "contained" : ""} onClick={()=>{setFormState(1)}}>Register</Button>
       </div>
        <form >
          <TextField
            fullWidth
            label="Username"
            name="username"
            type="text"
            margin="normal"
            id="username"
            required
            value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
            
          />
         
          {formState ===1 ? <TextField
            fullWidth
            label="Full Name"
            name="name"
            type="text"
            margin="normal"
            id="fullName"
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
          /> : null  }
         
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            required
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p style={{color :"red" }}>{error}</p>
         <Button
            fullWidth
            type="button"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAuth}
          >
           {formState==0?"LogIn" : "Register"}
          </Button>
         
        </form>
      </Paper>
      <Snackbar 
      open={open}
      autoHideDuration={4000}
      message={message}
       onClose={handleClose}
       />
    </Box>
  );
};


