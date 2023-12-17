import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavbarContent, Input } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import NavigationBar from "@/Components/NavigationBar";
import SideBar from "@/Components/SideBar";
import ThemeSwitcher from "@/Components/ThemeSwitcher";

type PropsType = PropsWithChildren & {}

export default function AuthenticatedLayout({ children }: PropsType) {
	
	return (
		<div className="flex flex-col h-screen min-h-screen bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			<NavigationBar
				className="z-30 h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				navProps={{ isBordered: true, maxWidth: "full" }}
				links={[]}
			>
				<NavbarContent className="w-1/3 max-w-sm gap-4 sm:flex" justify="start">
					<Input
						classNames={{
							base: "h-10 min-w-full",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Search for files and directories .."
						size="sm"
						fullWidth
						startContent={<MagnifyingGlassIcon className={"w-6 h-6"} />}
						type="search"
					/>
				</NavbarContent>
			</NavigationBar>

			<div className="flex flex-row flex-1 overflow-y-hidden">
				<main className="flex-1 py-6 overflow-y-auto bg-gray-100 bg-center dark:bg-gray-900">{children}</main>

				<SideBar />

			</div>

			<ThemeSwitcher />
		</div>
	)
}
