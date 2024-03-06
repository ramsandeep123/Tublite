"use client";
import Image from "next/image";
import SearchSection from "./components/home/SearchSection";
import GoogleMapSection from "./components/home/GoogleMapSection";
import { SourceContext } from "./context/SourceContext";
import { useState } from "react";
import { DestinationContext } from "./context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";
export default function Home() {
	const [source, setSource] = useState([]);
	const [dest, setDest] = useState([]);
	return (
		<SourceContext.Provider value={{ source, setSource }}>
			<DestinationContext.Provider value={{ dest, setDest }}>
				<LoadScript
					googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
					libraries={["places"]}
				>
					<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
						<div>
							<SearchSection />
						</div>

						<div className="col-span-2 ">
							<GoogleMapSection />
						</div>
					</div>
				</LoadScript>
			</DestinationContext.Provider>
		</SourceContext.Provider>
	);
}
