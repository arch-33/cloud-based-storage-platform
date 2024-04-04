import ThemeSwitcher from "@/components/ThemeSwitcher"
import { Link } from "@inertiajs/react"
import { PropsWithChildren } from "react"
import LogoImg from "@/assets/images/logo-sa7aba-drive.png";

type PropsType = PropsWithChildren & {
	cardTitle?: string
}

export default function GuestLayout({ children, cardTitle = "" }: PropsType) {
	return (
		<div className="relative h-screen bg-center bg-gray-50 md:flex dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			<div className="relative items-center justify-around hidden w-1/2 overflow-hidden rounded-e-3xl md:flex bg-gradient-to-bl from-blue-300 to-gray-100 dark:from-blue-950 dark:via-transparent">
				<div>
					<h1 className="py-2 font-sans text-5xl font-bold leading-10 text-transparent text-white bg-clip-text bg-gradient-to-r from-green-400 to-purple-600 lg:inline">
						Sa7aba-Drive
					</h1>
					<p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-200">Store, share, and manage your files and folders from any device.</p>
				</div>
				<div className="absolute border-4 border-t-8 rounded-full -bottom-32 -left-40 w-80 h-80 border-opacity-30"></div>
				<div className="absolute border-4 border-t-8 rounded-full -bottom-40 -left-20 w-80 h-80 border-opacity-30"></div>
				<div className="absolute border-4 border-t-8 rounded-full -top-40 -right-0 w-80 h-80 border-opacity-30"></div>
				<div className="absolute border-4 border-t-8 rounded-full -top-20 -right-20 w-80 h-80 border-opacity-30"></div>
			</div>

			<div className="flex items-center justify-center py-10 overflow-y-auto md:w-1/2">
				<div className="flex flex-col p-4 bg-white shadow-lg sm:p-7 rounded-2xl dark:bg-slate-900 min-w-[27rem] lg:w-[27rem]">
					<h1 className="block text-2xl font-bold text-center text-blue-950 dark:text-white">{cardTitle} </h1>
					{children}

				</div>
			</div>
			<div className="fixed bottom-4 right-4">
				<ThemeSwitcher />
			</div>
			<div className="absolute sm:fixed left-8 top-8">
				<div className="flex items-center justify-center">
					<Link href="/" className="flex items-center gap-1 flex-nowrap">
						<img height={36} alt="Logo" className="h-9" src={LogoImg} />
						<p className="h-4 font-bold text-inherit text-blue-950 dark:text-neutral-200">Sa7aba Drive</p>
					</Link>
				</div>
			</div>

		</div>
	)
}