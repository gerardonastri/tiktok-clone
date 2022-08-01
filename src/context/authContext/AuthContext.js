import AuthReducer from "./reducer";
import { createContext, useEffect, useReducer, useState } from "react";
import React from "react";

  let INITIAL_STATE = {}
  if (typeof window !== 'undefined') {
    INITIAL_STATE = {
      user:  JSON.parse(localStorage.getItem("user")) || null,
      isFetching: false,
      error: false,
    }
  }
  

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};