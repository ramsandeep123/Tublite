import React, { useRef, useEffect, useState } from "react";
import CarLists from "../CarLists";
import { useRouter } from "next/navigation";

const CarListOption = ({ dy }) => {
	const listEndRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedcar, setSelectedCar] = useState([]);
	const router = useRouter();
	useEffect(() => {
		// Scroll to the bottom of the list when the component mounts or updates
		listEndRef.current.scrollIntoView({ behavior: "smooth" });
	}, [listEndRef]);

	const car = [
		{
			name: "BMW-X1",
			icon: "/t5.jpeg",
			price: 50,
			available: "Yes",
		},
		{
			name: "Audi",
			icon: "/t4.jpeg",
			price: 40,
			available: "NO",
		},
		{
			name: "Nexon",
			icon: "/t3.jpeg",
			price: 30,
			available: "Yes",
		},
		{
			name: "Swift",
			icon: "/t2.jpeg",
			price: 20,
			available: "NO",
		},
		{
			name: "Alto",
			icon: "/t1.jpeg",
			price: 10,
			available: "Yes",
		},
	];

	return (
		<div className="max-h-[300px] overflow-y-auto">
			<h2 className="text-[22px] font-bold">Recommended</h2>
			{car.map((item, index) => (
				<div
					key={index}
					className={`cursor-pointer p-2 px-4 rounded-md border ${
						activeIndex === index
							? "border-[3px] border-black"
							: "border-transparent"
					}`}
					onClick={() => {
						setActiveIndex(index);
						setSelectedCar(item);
					}}
				>
					<CarLists car={item} dy={dy} />
				</div>
			))}
			<div ref={listEndRef}></div>
			{selectedcar?.name && (
				<div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-xl w-full md:w-[30%] border-[1px] items-center">
					<h2 className="font-semibold">Make Payment </h2>
					<button
						className="text-white rounded-lg p-3 bg-black text-center"
						onClick={() =>
							router.push(
								"/payment?amount=" + Math.round(selectedcar.price * dy)
							)
						}
					>
						Request for {selectedcar.name}
					</button>
				</div>
			)}
		</div>
	);
};

export default CarListOption;
