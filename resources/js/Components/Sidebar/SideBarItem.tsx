import { Link } from "@inertiajs/react"
import { ReactNode } from "react"
import clsx from "clsx"

type SideBarItemPropsType = {
    className?: string,
    title: string,
    icon: ReactNode,
    path: string,
    isActive?: boolean
}

export default function SideBarItem({ className = "", title, icon, path, isActive }: SideBarItemPropsType) {
    return (
        <li className="relative transition">
            <Link
                as={"a"}
                href={path}
                className={clsx([
                    "relative m-2 py-3 pl-5 flex items-center rounded-xl cursor-pointer hover:bg-gray-50 ",
                    "text-sm text-gray-500 font-semibold",
                    { "bg-gray-50 border-b-4 border-gray-300": isActive },
                    className
                ])}
            >
                <span className="flex w-5 mr-5 text-gray-500">{icon}</span> {title}
            </Link>
        </li>
    )
}
