import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { Link } from "@inertiajs/react"
import { useId } from "react"
import { LucideIcon } from "lucide-react"
import { Else, If, Then } from "react-if"

type PropsType = {
	home: {
		href: string
		label: string,
		icon: LucideIcon,
	},
	nestedRoute?: {
		name: string,
		param: string
	},
	items: { uuid: string, name: string }[],

	current?: { name: string, }

}

export default function PageBreadcrumbs({ home, items, current, nestedRoute = { name: "", param: "" } }: PropsType) {
	const id = useId();

	return (
		<Breadcrumbs
			separator="/"
			size="lg"
			maxItems={3}
			itemsBeforeCollapse={1}
			itemsAfterCollapse={2}
			itemClasses={{ item: "text-xl px-4", separator: "px-4 text-2xl", }}
			className="aflex-1"
		>
			<BreadcrumbItem>
				<Link href={home.href} className="flex items-center gap-2 whitespace-nowrap">
					<home.icon className="w-6 h-6" /> {home.label}
				</Link>
			</BreadcrumbItem>

			{items.map(({ uuid, name }) => (
				<BreadcrumbItem key={`${id}-${uuid}`}>
					<If condition={nestedRoute.name.length}>
						<Then>
							<Link href={route(nestedRoute.name, { [nestedRoute.param]: uuid })} className="max-w-[12rem] truncate">
								{name}
							</Link>
						</Then>
						<Else><span className="max-w-[12rem] truncate">{name}</span></Else>
					</If>
				</BreadcrumbItem>
			))}

			{!!current ? (
				<BreadcrumbItem>
					<span className="max-w-[12rem] truncate"> {current.name}</span>
				</BreadcrumbItem>) : <></>
			}

		</Breadcrumbs>
	)
}