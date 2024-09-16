import { create } from "zustand";
import { User } from '../types';  

const useAuthStore = create<{
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  }>((set) => ({
  user: null,  
  setUser: (user: User) => set({ user }), 
  clearUser: () => set({ user: null }),  
}));

export default useAuthStore;
