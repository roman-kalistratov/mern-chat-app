import { create } from "zustand";

const getInitialNotifications = () => {
  const storedNotifications = localStorage.getItem("notifications");
  const initialData = {
    tones: true,
    tonePath: "http://localhost:3000/src/assets/sound/call.mp3",
  };
  if (storedNotifications) {
    return JSON.parse(storedNotifications);
  } else {
    localStorage.setItem("notifications", JSON.stringify(initialData));
    return initialData;
  }
};

export const useNotifications = create((set) => ({
  notifications: getInitialNotifications(),
  update: (state) => {
    set({ notifications: state });
    localStorage.setItem("notifications", JSON.stringify(state));
  },
}));

export default useNotifications;
