import React from "react";
import { Router } from "./routes/Routes"
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Router/>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
