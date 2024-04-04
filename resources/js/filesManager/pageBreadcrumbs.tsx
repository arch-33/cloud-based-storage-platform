import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { Link } from "@inertiajs/react"
import { useId } from "react"
import { Else, If, Then } from "react-if"
import { useFileManagerConfig } from "./fileManagerContext"

type PropsType = {
}

export default function PageBreadcrumbs({}: PropsType) {
	const id = useId();
	const { routes, ancenstors } = useFileManagerConfig();

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
				<Link href={route(routes.home.routeName)} className="flex items-center gap-2 whitespace-nowrap">
					<routes.home.icon className="w-6 h-6" /> {routes.home.label}
				</Link>
			</BreadcrumbItem>

			{ancenstors.map(({ uuid, name }) => (
				<BreadcrumbItem key={`${id}-${uuid}`}>
					<If condition={routes.nested.routeName}>
						<Then>
							<Link href={route(routes.nested.routeName, { [routes.nested.params]: uuid })} className="max-w-[12rem] truncate">
								{name}
							</Link>
						</Then>
						<Else><span className="max-w-[12rem] truncate">{name}</span></Else>
					</If>
				</BreadcrumbItem>
			))}

			{!!routes.current ? (
				<BreadcrumbItem>
					<span className="max-w-[12rem] truncate"> {routes.current.name}</span>
				</BreadcrumbItem>) : <></>
			}

		</Breadcrumbs>
	)
}