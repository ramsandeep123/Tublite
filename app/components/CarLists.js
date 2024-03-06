import React from "react";
import Image from "next/image";

const CarLists = ({ car, dy }) => {
	return (
		<div>
			<div className="flex items-center justify-between mt-5">
				<div className="flex items-center gap-5">
					<Image src={car.icon} width={100} height={100} />

					<div className="flex items-center justify-between gap-3">
						<h2 className="font-semibold text-[18px]">{car.name}</h2>
						<h4 className="font-semibold text-[15px]  text-green-500">
							Availbility :: {car.available}
						</h4>
					</div>
				</div>
				<h2 className="text-[18px] font-semibold">
					{Math.round(car.price * dy)} INR
				</h2>
			</div>
		</div>
	);
};

export default CarLists;
