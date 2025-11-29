import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    setAuthError(null);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    setAuthError(null);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setAuthError(null);
    return signOut(auth);
  };

  const value = {
    currentUser,
    initializing,
    authError,
    setAuthError,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
}
