import React, { useEffect, useContext, useState } from "react";

import Map from "../Map";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";

const GoogleMapSection = () => {
	const { source, setSource } = useContext(SourceContext);
	const { dest, setDest } = useContext(DestinationContext);
	//<GoogleMapSection source={source} dest={dest} />;

	useEffect(() => {
		if (source) {
			console.log(source);
		}

		if (dest) {
			console.log(dest);
		}
	}, [source, dest]);

	console.log(source.lat, source.lng, dest.lat, dest.lng);

	return (
		<Map
			latitude={source.lat}
			longitude={source.lng}
			destLatitude={dest.lat}
			destLongitude={dest.lng}
		/>
	);
};

export default GoogleMapSection;
