import React, { createContext, useState } from "react";

export const DataLayer = createContext();

const DataLayerProvider = (props) => {
	let data = sessionStorage.getItem("userData");
	data = JSON.parse(data);
	const [user, setUser] = useState(data || "");
	const [notes, setNotes] = useState([]);

	return (
		<DataLayer.Provider value={{ user, setUser, notes, setNotes }}>
			{props.children}
		</DataLayer.Provider>
	);
};

export default DataLayerProvider;
