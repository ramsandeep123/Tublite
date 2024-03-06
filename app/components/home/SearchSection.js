import React, { useContext, useEffect, useState } from "react";
import Inoutitem from "./Inoutitem";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import GoogleMapSection from "./GoogleMapSection";
import CarListOption from "./CarListOption";

const SearchSection = () => {
	const { source, setSource } = useContext(SourceContext);
	const { dest, setDest } = useContext(DestinationContext);
	const [distance, setDistance] = useState();
	const [showCarList, setShowCarList] = useState(true); // State to control the visibility of CarListOption

	const calculateDistance = () => {
		if (source && dest) {
			console.log(source, dest);
			// Calculate distance using latitude and longitude values
			const cdist = getDistanceFromLatLonInKm(
				source.lat,
				source.lng,
				dest.lat,
				dest.lng
			);
			setDistance(cdist);
			// Hide CarListOption component for some time after the search button is clicked
			setShowCarList(false);
			setTimeout(() => {
				setShowCarList(true);
			}, 500); // Hide for 3 seconds (adjust as needed)
		}
	};

	const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
		const R = 6371; // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1); // deg2rad below
		const dLon = deg2rad(lon2 - lon1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const d = R * c; // Distance in km
		return d;
	};

	const deg2rad = (deg) => {
		return deg * (Math.PI / 180);
	};

	return (
		<div>
			<div className="p-2 md:pd-6 border-[4px] rounded-xl ">
				<p className="text-[20px] font-bold">Get a ride</p>
				<Inoutitem type="source" />
				<Inoutitem type="destination" />
				<button
					className="p-3 bg-black w-full mt-5 text-white rounded-lg"
					onClick={calculateDistance}
				>
					Search
				</button>
			</div>
			{distance && (
				<h3 className="text-[18px] font-bold mt-3 flex items-center">
					Your Journey {Math.round(distance)} Km
				</h3>
			)}
			{distance && showCarList && <CarListOption dy={distance} />}{" "}
			{/* Show CarListOption only if showCarList is true */}
		</div>
	);
};

export default SearchSection;
