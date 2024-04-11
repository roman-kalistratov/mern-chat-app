import { create } from "zustand";

const useUserInfo = create((set) => ({
  userInfo: {},
  isUserInfo: false,
  setUserInfo: (userInfo) => set({ userInfo }),
  setIsUserInfo: (state) => set({ isUserInfo: state }),
}));

export default useUserInfo;
