import React from "react";
import { Router } from "./routes/Routes";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "./context";

function App() {
  return (
    <GlobalProvider>
      <React.StrictMode>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </React.StrictMode>
    </GlobalProvider>
  );
}

export default App;
