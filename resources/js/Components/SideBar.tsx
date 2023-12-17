import { TrashIcon } from "@heroicons/react/24/outline"
import PlusIcon from "@heroicons/react/24/outline/esm/PlusIcon"
import { Link, usePage } from "@inertiajs/react"
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import clsx from "clsx"
import { ReactNode } from "react"
import { FiHardDrive } from "react-icons/fi"
import { RiFileUploadLine, RiFolderAddLine, RiFolderUploadLine, RiGroupLine } from "react-icons/ri"

type PropsType = {}

export default function SideBar({ }: PropsType) {

    const page_url = usePage().url

    return (
        <nav className="flex flex-col order-first w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center content-center flex-initial h-16 px-4">

                <DropdownCreateNew />

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

type SideBarItemPropsType = {
    className?: string,
    title: string,
    icon: ReactNode,
    path: string,
    isActive?: boolean
}

function SideBarItem({ className = "", title, icon, path, isActive }: SideBarItemPropsType) {
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

function DropdownCreateNew({ }) {

    const dropDownIconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <Dropdown
            backdrop="opaque"
            showArrow
            classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
            }}
        >
            <DropdownTrigger>
                <Button fullWidth size="md" color="primary" variant="shadow" className="relative font-sans font-semibold capitalize" startContent={<PlusIcon className="absolute left-0 w-6 h-6 ml-4" />}>
                    New
                </Button>
            </DropdownTrigger>

            <DropdownMenu variant="faded">
                <DropdownItem key="new" showDivider startContent={<RiFolderAddLine className={dropDownIconClasses} />}>
                    New Folder
                </DropdownItem>
                <DropdownItem key="upload-file" startContent={<RiFileUploadLine className={dropDownIconClasses} />}>
                    Upload file
                </DropdownItem>
                <DropdownItem key="upload-folder" startContent={<RiFolderUploadLine className={dropDownIconClasses} />}>
                    Upload folder
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}