import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export const AuthContext = createContext<User | null | undefined>(null);

export function AuthProvider({children, value}: any) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthValue(){
  return useContext(AuthContext)
}