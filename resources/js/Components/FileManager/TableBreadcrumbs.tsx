import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { HomeIcon } from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"
import { useId } from "react"
import { useFileManagerContext } from "./FileManagerContext"

type PropsType = {
	links: any[],
}

export default function TableBreadcrumbs({ links }: PropsType) {

	const id = useId();
	const { curentFolder, routes } = useFileManagerContext();

	return (
		<Breadcrumbs
			separator="/"
			size="lg"
			maxItems={3}
			itemsBeforeCollapse={1}
			itemsAfterCollapse={2}
			itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
			className="flex-1 "
		>
			<BreadcrumbItem>
				<Link
					href={route(routes.home)}
					onClick={e => { !curentFolder?.parent_id && e.preventDefault() }}
					className="flex items-center gap-2 whitespace-nowrap"
				>
					<HomeIcon className="w-6 h-6" /> Home
				</Link>
			</BreadcrumbItem>


			{links.map((element) => (
				<BreadcrumbItem key={id + element.uuid}>
					<Link
						href={routes.neested ? route(routes.neested, { folder: element.uuid }) : "#"}
						className="max-w-[12rem] truncate"
					>
						{element.name}
					</Link>
				</BreadcrumbItem>
			))}

			{!!curentFolder?.parent_id ? (
				<BreadcrumbItem>
					<span className="max-w-[12rem] truncate"> {curentFolder?.name}</span>
				</BreadcrumbItem>) : <></>
			}

		</Breadcrumbs >
	)
}