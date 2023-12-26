import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

interface INavBreadcrumbsProps {
	baseUrl: string,
	folder: { parent_id?: string, name: string },
	links: any[]
}

export function NavBreadcrumbs({ baseUrl, folder, links }: INavBreadcrumbsProps) {

	return (
		<Breadcrumbs
			separator="/"
			size="lg"
			maxItems={3}
			itemsBeforeCollapse={1}
			itemsAfterCollapse={2}
			itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
		>

			<BreadcrumbItem>
				<Link
					href={baseUrl}
					onClick={e => { !folder.parent_id && e.preventDefault() }}
					className="flex items-center gap-2 whitespace-nowrap"
				>
					<HomeIcon className="w-6 h-6" /> Home
				</Link>
			</BreadcrumbItem>

			{links.map((ele, key) => (
				<BreadcrumbItem key={"BreadcrumbItem+" + key + ele.file_uuid}>
					<Link
						href={baseUrl + "folders/" + ele.file_uuid}
						className="max-w-[12rem] truncate">
						{ele.name}
					</Link>
				</BreadcrumbItem>
			))}

			{folder.parent_id ? (<BreadcrumbItem><span className="max-w-[12rem] truncate"> {folder.name}</span></BreadcrumbItem>) : ""}
		</Breadcrumbs>
	)
}
