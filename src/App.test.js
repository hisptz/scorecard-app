import { mount } from "@cypress/react";
import React from "react";
import App from "./App";

it("renders without crashing", () => {
  mount(<App />);
});
