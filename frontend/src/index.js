import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DataLayerProvider from "./DataLayer";

ReactDOM.render(
	<DataLayerProvider>
		<App />
	</DataLayerProvider>,
	document.getElementById("root")
);
