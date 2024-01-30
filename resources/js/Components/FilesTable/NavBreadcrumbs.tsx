import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

import { HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

interface INavBreadcrumbsProps {
	baseUrl: string,
	folder: { parent_id?: string, name: string },
	links: any[]
}

export function NavBreadcrumbs({ baseUrl, folder, links }: INavBreadcrumbsProps) {

	return (

		<div className="flex flex-wrap justify-between w-full">
			<Breadcrumbs
				separator="/"
				size="lg"
				maxItems={3}
				itemsBeforeCollapse={1}
				itemsAfterCollapse={2}
				itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
				className="flex-1 bg-red-200 "
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

				{/* {Array.from(Array(20)).map((e, i) => <BreadcrumbItem key={i}>
					<Link
						href={baseUrl}
						onClick={e => { !folder.parent_id && e.preventDefault() }}
						className="max-w-[12rem] truncate"
					>
						Home sqdsfd sdfjdgh sdcqjsdfhdh dcqsfdfhhd hsdhh
					</Link>
				</BreadcrumbItem>)} */}

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
			<div className="flex-initial px-2 text-white bg-black">
				
			</div>
		</div>
	)
}
