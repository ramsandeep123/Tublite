import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const headermenu = [
	{
		id: 1,
		name: "Rides",
		icon: "/taxi.png",
	},

	{
		id: 2,
		name: "Package",
		icon: "/box.png",
	},
];

const Header = () => {
	return (
		<div className="p-4 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
			<div className="flex gap-25 items-center">
				<Image
					src="/car.jpg"
					width={70}
					height={70}
					className="cursor-pointer"
				/>

				<div className="flex gap-6 items-center ml-20">
					{headermenu.map((item) => (
						<div className=" flex gap-2 items-center cursor-pointer">
							<Image src={item.icon} width={24} height={24} />
							<h2 className="text-[14px] font-medium">{item.name}</h2>
						</div>
					))}
				</div>
			</div>

			<div className="mr-10">
				<UserButton />
			</div>
		</div>
	);
};

export default Header;
