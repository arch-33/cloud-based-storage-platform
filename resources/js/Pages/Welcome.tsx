import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import { HeartHandshake, ShieldCheck, Star } from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import HomeLayout from "@/layouts/homeLayout";


const WelcomePage = () => {
	const words = [
		{ text: "Seamless " },
		{ text: "and Secure " },
		{ text: "Access " },
		{ text: "to your " },
		{ text: "document " },
		{ text: "with " },
		{
			text: "Sa7aba Drive.",
			className: "text-blue-500 dark:text-blue-500",
		},
	];
	return (
		<div className="flex flex-col items-center justify-center h-[40rem]">

			<TypewriterEffectSmooth words={words} />

			<p className="max-w-lg mx-auto mb-8 leading-7 text-neutral-600 dark:text-neutral-200 sm:text-base">
				Store, share, and manage your files and folders from any device.
			</p>

			<div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4">

				<Link
					as="button"
					href={route("register")}
					className="w-40 h-10 text-sm text-white bg-black border border-transparent rounded-xl dark:border-white"
				>
					Get Started
				</Link>
				<Link
					as="button"
					href={route("login")}
					className="w-40 h-10 text-sm text-black bg-white border border-black rounded-xl"
				>
					Signin
				</Link>

			</div>

			<div className="flex flex-col items-center justify-center my-16 divide-y divide-gray-300 sm:flex-row sm:divide-x sm:divide-y-0 md:mt-20">
				
				<div className="flex max-w-xs px-4 py-4 space-x-2">
					<Star className="w-12 h-12 text-blue-600" />
					<p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>

				<div className="flex max-w-xs px-4 py-4 space-x-2">
					<ShieldCheck className="w-12 h-12 text-blue-600" />
					<p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>

				<div className="flex max-w-xs px-4 py-4 space-x-2">
					<HeartHandshake className="w-12 h-12 text-blue-600" />
					<p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
				
			</div>
		</div>
	);
}

WelcomePage.layout = (page: ReactNode) => (<HomeLayout navLinks={["login", "register"]}>{page}</HomeLayout>)

export default WelcomePage;