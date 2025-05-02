"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@/lib/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check and create user in database
  const handleUserDatabase = async (firebaseUser) => {
    try {
      // Call API route instead of direct DB access
      const response = await fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || ''
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync user with database');
      }
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    await handleUserDatabase(result.user);
  };

  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await handleUserDatabase(result.user);
  };

  const registerWithEmail = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await handleUserDatabase(result.user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await handleUserDatabase(firebaseUser);
      }
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        userId: user?.uid, // Make sure to include this
        loading, 
        loginWithGoogle, 
        loginWithEmail, 
        registerWithEmail, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);