
import { ProfileType } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuth: boolean;
  username: string;
  token: string;
  profile?: ProfileType;
  setIsAuth: (val: boolean) => void;
  setUsernameLocalStoge: (username: string) => void;
  setTokenLocalStoge: (token: string) => void;
  setProfile: (p: ProfileType) => void;
  fromObject?: Record<string, string>;
  toObject?: Record<string, string>;
  setFromObject?: (fromObject: Record<string, string>) => void;
  setToObject?: (toObject: Record<string, string>) => void;
}

export const useAuthStoreLocal = create(
  persist<AuthState>(
    (set) => ({
      isAuth: false,
      username: "",
      token: "",
      setIsAuth: (val) => set({ isAuth: val }),
      setUsernameLocalStoge: (username) => set({ username }),
      setTokenLocalStoge: (token) => set({ token }),
      setProfile: (profile: ProfileType) => {
        set({ profile });
      },
    }),
    {
      name: "auth-local",
      storage: createJSONStorage(() => localStorage),
    },
  )
);

export const useAuthStoreSession = create(
  persist<AuthState>(
    (set) => ({
      isAuth: false,
      username: "",
      token: "",
      setIsAuth: (val) => set({ isAuth: val }),
      setUsernameLocalStoge: (username) => set({ username }),
      setTokenLocalStoge: (token) => set({ token }),
      setProfile: (profile: ProfileType) => {
        set({ profile });
      },
      setFromObject: (fromObject) => set({ fromObject }),
      setToObject: (toObject) => set({ toObject }),
    }),
    {
      name: "auth-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

const isRemember = localStorage.getItem("rememberMe") === "true";
const store = isRemember ? useAuthStoreLocal : useAuthStoreSession;

// const isRemember = localStorage.getItem("rememberMe") === "true";
// export const useAuthStore = isRemember ? useAuthStoreLocal : useAuthStoreSession;
export const useAuthStore = <T>(selector: (state: AuthState) => T): T => {
  return store(selector);
};
