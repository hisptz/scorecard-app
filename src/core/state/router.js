import { atom } from "recoil";

const RouterState = atom({
  key: "router-state",
  default: {
    previous: "/",
  },
});

export default RouterState;
