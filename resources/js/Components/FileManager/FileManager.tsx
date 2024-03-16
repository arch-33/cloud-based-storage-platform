import { FileActions, FileDataType, FileManagerRoutes } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import { Input, NavbarContent } from "@nextui-org/react";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import NavigationBar from "../NavigationBar";
import SideBar from "../Sidebar";
import { FileManagerContextProvider } from "./FileManagerContext";
import FilesSelectionActions from "./FileSelectionActions";
import TableBreadcrumbs from "./TableBreadcrumbs";
import { When } from "react-if";
import NewDocumentsDropdown from "../Sidebar/NewDocumentsDropdown";
import FilesTable from "./FilesTable";
import ThemeSwitcher from "../ThemeSwitcher";

type PropsType = PropsWithChildren & {
	folder: FileDataType, // current folder data
	descendants: { // current folder's children with pagination
		data: FileDataType[],
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: any[], // parents list {uuid , name} for cureent folder
	permissions: {
		fileActions: FileActions[], // actions on files
		upload: boolean,
		search: boolean
	},
	routes: FileManagerRoutes,
}

export default function FileManager({ children, folder, descendants, ancenstors, permissions, routes }: PropsType) {

	const { user } = usePage().props.auth;

	return (
		<div className="flex flex-col h-screen min-h-screen bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			{/* ----------------------------- Navigation Bar ----------------------------- */}
			<NavigationBar
				className="z-30 h-16 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				navProps={{ isBordered: true, maxWidth: "full" }}
				links={[]}
			>
				<When condition={permissions.search}>
					<NavbarContent className="w-1/3 max-w-sm gap-4 sm:flex" justify="start">
						<Input
							classNames={{
								base: "h-10 min-w-full",
								mainWrapper: "h-full",
								input: "text-small",
								inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
							}}
							placeholder="Search for files and directories .."
							size="sm"
							type="search"
							fullWidth
							startContent={<MagnifyingGlassIcon className={"w-6 h-6"} />}
						/>
					</NavbarContent>
				</When>

			</NavigationBar>


			<div className="flex flex-row flex-1 overflow-y-hidden">

				<FileManagerContextProvider curentFolder={folder} routes={routes}>

					<main className={clsx("flex-1 py-6 overflow-y-auto bg-gray-100 bg-center dark:bg-gray-900", { "px-0 md:px-32": !user })}>

						<div className="flex flex-col gap-8 px-4 pt-6 ">


							{/* --------------------------- Files Table Header --------------------------- */}
							<div className="flex flex-wrap justify-between w-full gap-y-2">
								<TableBreadcrumbs links={ancenstors} />
								<FilesSelectionActions actions={permissions.fileActions} />
							</div>

							<div className="bg-gray-100 2xl:col-span-4 sm:col-span-2 dark:bg-gray-900 h-fit">
								{/* ------------------------------- Files Table ------------------------------ */}
								<FilesTable
									elements={descendants}
									actions={permissions.fileActions}
								/>

							</div>
						</div>

						{children}

					</main>

					{/* ------------------------ Sidebar if user logged in ----------------------- */}
					<When condition={!!user}>
						<SideBar>
							<When condition={permissions.upload}>
								<NewDocumentsDropdown />
							</When>
						</SideBar>
					</When>

				</FileManagerContextProvider>

			</div>
			<ThemeSwitcher />
		</div>
	)
}