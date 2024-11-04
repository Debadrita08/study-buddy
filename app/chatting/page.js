'use client'
import { Box,Stack,TextField,Button } from "@mui/material";
import { createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

import {useState} from "react"

const theme = createTheme({
  palette: {
    background: {
      default: "black", // Sets the global background color to black
    },
  },
});

export default function Home() {
  const[messages,setmessages]=useState([{role:"assistant",content:"Hi"}])
  const[message,setmessage] = useState('');

  const sendmessages = async ()=>{
    
    
    const updatedMessages = [...messages, { role: 'user', content: message }];
  setmessages(updatedMessages);
  setmessage('');  // Clear the input
    
    const response = await fetch("/api/chat",{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(updatedMessages)
    }
    )
    const data = await response.json();
    setmessages([...updatedMessages,{role:'assistant',content:data.message}]);

  }
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>  
      <Box 
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection = "column"
      justifyContent="center"
      alignItems="center"
      bgcolor= "black"
    > 
       <Stack
        direction={'column'}
        width="500px"
        height="600px"
        p={2}
        spacing={3}
        bgcolor="grey.900"
        border="1px solid #FFB6C1"
        >
           <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          
          
        >
          {messages.map((message,id)=>(
            <Box 
            key={id}
            display="flex"
            justifyContent={
              message.role === 'assistant'? "flex-start" : "flex-end"
            }>
              <Box
              bgcolor={message.role==="user" ? '#C71585' : '#87CEEB'}
              color={message.role==="user" ? '#FFC0CB' : '#000080'}
                borderRadius={16}
                p={3}>
                  {message.content}
                </Box>

            </Box>
          ))}
            
          </Stack>
          
          <Stack direction={'row'} spacing={2}>
          <TextField
            
            fullWidth
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            sx={{ 
              "& .MuiInputBase-input": {
                color: "#FF69B4",  // Pink text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#C71585",  // Dark pink border
                },
                "&:hover fieldset": {
                  borderColor: "#FF69B4",  // Lighter pink on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF1493",  // Darker pink when focused
                },
              },
            }}
            
          />
          <Button variant="contained" sx={{ backgroundColor: "#FF69B4", "&:hover": { backgroundColor: "#FF1493" } }} onClick={sendmessages} >
            Send
          </Button>
        </Stack>
       </Stack>
      </Box>
      </ThemeProvider>   
     
  );
}
