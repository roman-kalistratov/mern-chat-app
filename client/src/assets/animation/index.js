export const dropDown = {
  initial: { clipPath: "inset(10% 50% 90% 50% round 0)" },
  animate: { clipPath: "inset(0% 0% 0% 0% round 0)" },
  exit: { clipPath: "inset(10% 50% 90% 50% round 0)" },
  transition: {
    type: "spring",
    bounce: 0,
    duration: 0.3,
  },
};
export const sideBarOpen = {
  initial: { x: "100%" },
  animate: { x: "0%" },
  exit: { x: "100%" },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
};
