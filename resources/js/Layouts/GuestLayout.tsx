import { PropsWithChildren } from 'react';
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import NavigationBar from '@/Components/NavigationBar';
import { Card, CardHeader, Divider } from '@nextui-org/react';

type PropsType = PropsWithChildren & {
	showLinks?: string[], title: string
}

export default function Guest({ children, showLinks = [], title = "" }: PropsType) {

	return (
		<div className="flex flex-col min-h-screen bg-gray-100 bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			<NavigationBar
				className="flex-initial h-16"
				navProps={{ isBordered: true }}
				links={showLinks}
			/>

			<div className="flex items-center justify-center flex-1">

				<Card className="w-full rounded-lg pt-6 px-6 pb-4 md:w-1/2 lg:w-[25rem] bg-white dark:bg-zinc-900" shadow={"md"} radius={"lg"}>

					{(!!title) && <>
						<CardHeader className="justify-center w-full mb-2">
							<h2 className='text-2xl font-bold text-center capitalize select-none dark:text-white text-zinc-900'>{title}</h2>
						</CardHeader>
						<Divider />
					</>}

					{children}

				</Card>
				
			</div>
			<ThemeSwitcher />
		</div>
	);
}
