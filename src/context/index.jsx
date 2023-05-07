import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
  const [titudoDoPost, setTitudoDoPost] = useState("");
  const [textoDoPost, setTextoDoPost] = useState("");
  const [username, setUsername] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        textoDoPost,
        setTextoDoPost,
        titudoDoPost,
        setTitudoDoPost,
        username,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
