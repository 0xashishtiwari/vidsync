import React, { useEffect, useRef, useState } from 'react'
import '../styles/VedioMeet.css'
import { Button, TextField } from '@mui/material';
import { AutoStories } from '@mui/icons-material';
const server_url = "http://localhost:5000"


var connections = {};

const peerConfigConnections = {
        "iceServers" : [
            {'url' : "stun:stun.l.google.com:19302"}
        ]
}

const VedioMeet = () => {

  var socketRef = useRef();
  let socketIdRef = useRef();
   
  let localVideoRef = useRef();

  let [videoAvailable , setVideoAvailable] = useState(true);
  let [audioAvailable , setAudioAvailable]  = useState(true);
  let [video , setVideo] = useState();
  let [audio , setAudio] = useState();

  let [screen , setScreen] = useState();

  let[showModal , setModal] = useState();
  
  let[screenAvailable  , setScreenAvailable] = useState();

  let [messages , setMessages] = useState([]);

  let [ message , setMessage] = useState("");

  let[newMessages ,  setNewMessages] = useState(0);

  let [askForUsername , setAskForUsername] = useState(true);

  let [username , setUsername] = useState("");

  const videoRef= useRef([]);

  let[vedios , setVideos] = useState([]);


  //todo
  // if(isChrome()===false){

  // }

  const getPermissions = async () => {

    try {
      const vedioPermission = await navigator.mediaDevices.getUserMedia({video:true})
      if(vedioPermission){
        setVideoAvailable(true);
      }else{
        setVideoAvailable(false);
      }
      const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true})
      if(audioPermission){
        setAudioAvailable(true);
      }else{
        setAudioAvailable(false);
      }

      if(navigator.mediaDevices.getDisplayMedia){
        setScreenAvailable(true)
      }else{
        setScreenAvailable(false)
      }

      if(setVideoAvailable || audioAvailable){
        const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable , audio : audioAvailable});

        if(userMediaStream){
          window.localStream = userMediaStream;
          if(localVideoRef.current){
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }

    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }

  useEffect(()=>{
      getPermissions();
  },[]);  

  let getUserMedia = ()=>{
      if((video && videoAvailable )|| (audio && audioAvailable)){
          navigator.mediaDevices.getUserMedia({video : video , audio : audio}).then(()=>{})  //:getUserMediaSuccess
        .then((stream)=>{})
        .catch((e)=>{console.log(e)})
      
      }else{
        try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach(track=>track.stop())
        } catch (error) {
          
        }
      }
  }

  useEffect(()=>{
      if(video==undefined && audio == undefined){
        getUserMedia();
      }
  } ,[audio , video])


  let getMedia = ()=>{
    setVedio(videoAvailable);
    setAudio(audioAvailable);
   
    connectToSocketServer();
  }

  return (
    <div> 

      {askForUsername ==true ? 
      
        <div>
          <h2>Enter into Lobby</h2>
          <TextField variant='outlined' label='Username' value={username}  onChange={(e)=>{setUsername(e.target.value)}}></TextField>
          <Button variant='contained'>Connect</Button>


          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div>
        
        
        : 
        
        <></>
    
       }

    </div>
  )
}

export default VedioMeet