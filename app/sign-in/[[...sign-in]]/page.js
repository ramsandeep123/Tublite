import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
	return (
		<>
			<div className="relative w-screen h-screen mt-20 ml-12 ">
				<Image
					src="/myy.jpeg"
					//layout="fill"
					objectFit="cover"
					height={850}
					width={750}
					className="absolute inset-0 opacity-0.5 pl-12 pt-9 "
				/>
			</div>
			<div className="absolute top-20 pt-14 pr-5 right-6 shadow-2xl">
				<SignIn />
			</div>
		</>
	);
}
