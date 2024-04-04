import { Link, usePage } from "@inertiajs/react";
import { Button, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import ProfileDropDown from "./ProfileDropDown";
import { ReactNode } from "react";
import Show from "@/helpers/Show";
import { Else, If, Then, When } from "react-if";


/**
* Navigation bar PropsType :
* @prop {string? } className: navbar classNames
* @prop { [name: string]: any } navProps: other navbar Props (config for nextui Navbar https://nextui.org/docs/components/navbar#navbar-props)
* @prop {string[]} links: links to show in the navbar
* @props {ReactNode?} children: center content of Navbar 
*/

type PropsType = {
    className?: string,
    navProps: { [name: string]: any },
    links: string[],
    children?: ReactNode;
}

export default function NavigationBar({ children, className = "", navProps, links }: PropsType) {

    // @ts-ignore
    const { user } = usePage().props.auth;

    return (
        <Navbar className={className} {...navProps}>
            <NavbarBrand>
                <Link href="/" className="flex items-center flex-nowrap">
                    <img height={36} alt="Logo" className="mr-3 h-9" src="http://localhost/assets/imgs/logo-sa7aba-drive.png" />
                    <p className="font-bold text-inherit">Sa7aba Drive</p>
                </Link>
            </NavbarBrand>

            {children}

            <NavbarContent className="gap-4 sm:flex me-4" justify="end">

                <If condition={!!user}>
                    
                    <Then><ProfileDropDown user={user} /></Then>

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