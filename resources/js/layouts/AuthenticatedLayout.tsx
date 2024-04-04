import { Input, NavbarContent } from "@nextui-org/react";
import { PropsWithChildren, ReactNode } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

type PropsType = PropsWithChildren & {
	sidebarTopChild: ReactNode
}

export default function AuthenticatedLayout({ children,sidebarTopChild }: PropsType) {

	const { user } = usePage<PageProps>().props.auth;

	return (
		<div>Authenticated layout</div>
	)
	
}
