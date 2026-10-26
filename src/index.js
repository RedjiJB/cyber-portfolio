import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";
import "./index.css";

// Static pages ship prerendered markup inside #root for crawlers; render() replaces it.
ReactDOM.render(<App />, document.getElementById("root"));
