import { create } from "zustand";

const useAppState = create((set) => ({
  appState: "chats",
  setAppState: (state) => set({ appState: state }),
}));

export default useAppState;
