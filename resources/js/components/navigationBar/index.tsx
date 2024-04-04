import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Button, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { PropsWithChildren, ReactNode } from "react"
import { Else, If, Then, When } from "react-if";
import UserProfileDropDown from "./userProfileDropDown";

import LogoImg from "@/assets/images/logo-sa7aba-drive.png";

type PropsType = PropsWithChildren & {
	// navbar classNames
	className?: string,
	/* other navbar Props (config for nextui Navbar https://nextui.org/docs/components/navbar#navbar-props) */
	navProps: { [name: string]: any },
	// links to show in the navbar
	links: string[],
	// center content of Navbar 
	children?: ReactNode;
}

export default function NavigationBar({ children, className = "", navProps, links }: PropsType) {

	const user = usePage<PageProps>().props.auth.user;

	return (
		<Navbar className={className} {...navProps}>
			<NavbarBrand>
				<Link href="/" className="flex items-center flex-nowrap">
					<img height={36} alt="Logo" className="mr-3 h-9" src={LogoImg} />
					<p className="font-bold text-inherit">Sa7aba Drive</p>
				</Link>
			</NavbarBrand>

			{children}

			<NavbarContent className="gap-4 sm:flex me-4" justify="end">

				<If condition={!!user}>

					<Then><UserProfileDropDown user={user} /></Then>

					<Else>
						<When condition={links.includes("login")}>
							<NavbarItem>
								<Button
									variant="light"
									color="primary"
									className="font-medium"
									as={Link}
									href={route('login')}
								>
									Log In
								</Button>
							</NavbarItem>
						</When>

						<When condition={links.includes("login") && links.includes("register")}>
							<Divider orientation="vertical" className="h-1/2" />
						</When>

						<When condition={links.includes("register")}>
							<NavbarItem>
								<Button
									variant="light"
									color="primary"
									className="font-medium"
									as={Link}
									href={route('register')}
								>
									Create Account
								</Button>
							</NavbarItem>
						</When>
					</Else>
				</If>

			</NavbarContent>
		</Navbar>
	)
}