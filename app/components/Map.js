import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
// Import CSS file for custom styles

const Map = ({ latitude = 0, longitude = 0, destLatitude, destLongitude }) => {
	const mapRef = useRef(null);

	useEffect(() => {
		if (!mapRef.current) {
			mapRef.current = L.map("map").setView([latitude, longitude], 11);
			let mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
			L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
				attribution: "Leaflet &copy; " + mapLink + ", contribution",
				maxZoom: 18,
			}).addTo(mapRef.current);
		}

		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;

				var sourceIcon = L.icon({
					iconUrl: "/soe.png",
					iconSize: [32, 32],
					iconAnchor: [16, 32],
					popupAnchor: [0, -32],
				});

				var marker = L.marker([latitude, longitude], {
					icon: sourceIcon,
				}).addTo(mapRef.current);
				var popup = L.popup();

				marker.bindPopup("<b>Your Location</b>").openPopup();

				if (destLatitude !== undefined && destLongitude !== undefined) {
					var destinationIcon = L.icon({
						iconUrl: "/dest2.png",
						iconSize: [32, 32],
						iconAnchor: [16, 32],
						popupAnchor: [0, -32],
					});

					L.marker([destLatitude, destLongitude], {
						icon: destinationIcon,
					}).addTo(mapRef.current);
				}

				L.Routing.control({
					waypoints: [
						L.latLng(destLatitude, destLongitude),
						L.latLng(lat, lng),
					].filter(Boolean),
					createMarker: function (i, waypoint, n) {
						if (i === 0) {
							return L.marker(waypoint.latLng, { icon: sourceIcon });
						} else {
							return L.marker(waypoint.latLng, { icon: destinationIcon });
						}
					},
					routeWhileDragging: false,
					show: false, // Show the routing control on the map
				})
					.on("routesfound", function (e) {
						var routes = e.routes;
						console.log(routes);

						e.routes[0].coordinates.forEach(function (coord, index) {
							setTimeout(function () {
								marker.setLatLng([coord.lat, coord.lng]);
							}, 5 * index);
						});
					})
					.addTo(mapRef.current);

				// Adding hover effect to display information
				marker.on("mouseover", function (e) {
					fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
					)
						.then((response) => response.json())
						.then((data) => {
							popup
								.setLatLng(e.latlng)
								.setContent(
									`<b>Place Information:</b><br/>${data.display_name}`
								)
								.openOn(mapRef.current);
						})
						.catch((error) => {
							console.error("Error fetching place information:", error);
						});
				});

				marker.on("mouseout", function (e) {
					mapRef.current.closePopup(popup);
				});
			});
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [latitude, longitude, destLatitude, destLongitude]);

	return <div id="map" style={{ width: "100%", height: "650px" }}></div>;
};

export default Map;
