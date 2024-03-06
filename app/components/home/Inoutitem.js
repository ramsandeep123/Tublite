"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
const Inoutitem = ({ type }) => {
	const [value, setValue] = useState(null);
	const { source, setSource } = useContext(SourceContext);
	const { dest, setDest } = useContext(DestinationContext);

	const getLatitudeandLongitude = (place, type) => {
		const placeId = place.value.place_id;
		const service = new google.maps.places.PlacesService(
			document.createElement("div")
		);

		service.getDetails({ placeId }, (place, status) => {
			if (status === "OK" && place.geometry.location) {
				console.log(place.geometry.location.lat());

				if (type == "source") {
					setSource({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
						name: place.formatted_address,
						label: place.name,
					});
				} else {
					setDest({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
						name: place.formatted_address,
						label: place.name,
					});
				}
			}
		});
	};
	return (
		<div className=" bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
			<Image
				src={type === "source" ? "/soe.png" : "/dest2.png"}
				width={20}
				height={20}
			/>

			<GooglePlacesAutocomplete
				selectProps={{
					value,
					onChange: (place) => {
						getLatitudeandLongitude(place, type);
						setValue(place);
					},
					placeholder: type == "source" ? "Pickup location" : "Drop Location",
					isClearable: true,

					className: "w-full",
					components: {
						DropdownIndicator: false,
					},
					styles: {
						control: (provided) => ({
							...provided,
							backgroundColor: "#00ffff00",
							border: "none",
						}),
					},
				}}
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
			/>
		</div>
	);
};

export default Inoutitem;
