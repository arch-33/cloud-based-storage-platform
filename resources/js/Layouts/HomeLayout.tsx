import { PageProps } from "@/types";
import { PropsWithChildren } from "react";


type PropsType = PropsWithChildren & {
    showLinks: string[],
}

export default function HomeLayout({ children, showLinks = [] }: PropsType) {
    
    const {user} = usePage().props.auth

    return (
        <>
            {children}
        </>
    )
}
