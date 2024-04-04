import ThemeSwitcher from "@/components/ThemeSwitcher";
import NavigationBar from "@/components/navigationBar";
import { PropsWithChildren } from "react"

type PropsType = PropsWithChildren & {
	navLinks: string[],
}

export default function HomeLayout({ children, navLinks }: PropsType) {
	return (
		<div className="relative min-h-screen bg-gray-100 bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			<NavigationBar
				className="sticky top-0"
				navProps={{ isBordered: true }}
				links={navLinks}
			/>
			
			<main className="p-4">
				{children}
			</main>

			<div className="fixed bottom-4 right-4">
				<ThemeSwitcher />
			</div>
		</div>
	);
}