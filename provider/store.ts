import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from '../types';  

const useAuthStore = create(
  persist<{
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
  }>(
    (set) => ({
      user: null,  
      setUser: (user: User) => set({ user }), 
      clearUser: () => set({ user: null }),  
    }),
    {
      name: 'auth-store', // Nombre del almacenamiento en localStorage
    }
  )
);

export default useAuthStore;
