import { Divider } from "@nextui-org/react"
import { FiHardDrive } from "react-icons/fi"
import NewDropdown from "./NewDropdown"
import { PropsWithChildren } from "react"
import { RiGroupLine } from "react-icons/ri"
import SideBarItem from "./SideBarItem"
import { TrashIcon } from "@heroicons/react/24/outline"
import { usePage } from "@inertiajs/react"

type PropsType = PropsWithChildren & {}

export default function SideBar({ children }: PropsType) {

    const page_url = usePage().url

    return (
        <nav className="flex flex-col order-first w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center content-center flex-initial h-16 px-4">

                {children}
            
            </div>
            <Divider className="" />
            <ul className="flex flex-col flex-1 py-2 overflow-y-auto ps-2">


                <SideBarItem
                    title="My Drive"
                    icon={<FiHardDrive className="w-6 h-6" />}
                    path="/my-drive"
                    isActive={page_url.startsWith("/my-drive")}
                />

                <SideBarItem
                    title="Shared with me"
                    icon={<RiGroupLine className="w-6 h-6" />}
                    path="/profile"
                    isActive={page_url.startsWith("/shared-with-me")}
                />

                <SideBarItem
                    title="Shared content"
                    icon={<RiGroupLine className="w-6 h-6" />}
                    path="/profile"
                    isActive={page_url.startsWith("/shared-with-me")}
                />
                <Divider className="" />

                <SideBarItem
                    className="hover:bg-red-400 hover:text-white group"
                    title="Trash"
                    icon={<TrashIcon className="w-6 h-6 group-hover:text-white" />}
                    path="/profile"
                    isActive={page_url.startsWith("/trash")}
                />

                <Divider className="" />
            </ul>
        </nav>
    )
}