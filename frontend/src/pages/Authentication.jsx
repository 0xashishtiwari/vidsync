import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';


export const  Authentication = ()=>{
  const [username , setUsername] = useState();
  const [password , setPassword] = useState();
  const [name , setName] = useState();
  const [error , setError] = useState();
  const [messages , setMessages] = useState();

  const [formState , setFormState] = useState(0);

  const [open ,setOpen] = useState(false);

const [showPassword , setShowPassword] = useState(false);

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
        <Button variant= {formState===0 ?  "contained" : ""} onClick={()=>{setFormState(0)}} >Sign in</Button>
        <Button  variant= {formState===1 ? "contained" : ""} onClick={()=>{setFormState(1)}}>Sign up</Button>
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
          {formState===0 ?  <Button
            fullWidth
            type="button"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign in
          </Button> :  <Button
            fullWidth
            type="button"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>}
         
        </form>
      </Paper>
    </Box>
  );
};


