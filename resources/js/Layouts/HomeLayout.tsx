import NavigationBar from "@/Components/NavigationBar";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import { PropsWithChildren } from "react";


type PropsType = PropsWithChildren & {
	showLinks: string[],
}

export default function HomeLayout({ children, showLinks = [] }: PropsType) {

	return (
		<div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">
			
			<NavigationBar className="flex-initial h-16" navProps={{ isBordered: true }} links={showLinks} />

			<div className="flex-1">
				{children}
			</div>

			<ThemeSwitcher />
		</div>
	)
}
