import { PageProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { When } from "react-if";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SideBar from "./sideBar";
import NewDocumentsDropdown from "./newDocumentsDropdown";
import PageBreadcrumbs from "./pageBreadcrumbs";
import FilesSearchFilter from "./filesSearchFilter";
import UserProfileDropDown from "./userProfileDropDown";
import VisibleColumnsDropDown from "./visibleColumnsDropDown";
import SelectionActions from "./selectionActions";
import FilesTable from "./filesTable";
import { useFileManagerConfig } from "./fileManagerContext";

import LogoImg from "@/assets/images/logo-sa7aba-drive.png";

type PropsType = {
}

export default function FileManager({ }: PropsType) {

	const { user } = usePage<PageProps>().props.auth;
	const { folder, can } = useFileManagerConfig();

	return (
		<div className="relative flex flex-row flex-1 h-screen min-h-screen overflow-y-hidden bg-center dark:bg-gray-900 bg-dots-darker dark:bg-dots-lighter">

			{/* -------------------------------- Side Bar -------------------------------- */}
			<div className="flex flex-col w-24 bg-gray-100 sm:w-64 dark:bg-gray-800">

				{/* ---------------------------------- Logo ---------------------------------- */}
				<div className="flex items-center justify-center border-b min-h-unit-16 border-color">
					<Link href="/" className="flex items-center gap-1 flex-nowrap">
						<img height={36} alt="Logo" className="h-9" src={LogoImg} />
						<p className="h-4 font-bold text-inherit">Sa7aba Drive</p>
					</Link>
				</div>

				{/* - New Documents DropDown ["new Folder", "Upload Files", "Upload Folder"] - */}
				<When condition={can.upload}>
					<div className="flex items-center justify-center py-2 border-b border-color">
						<NewDocumentsDropdown currentFolderID={folder.uuid} />
					</div>
				</When>

				{/* ------------------------------ SideBar links ----------------------------- */}
				<nav className="p-2 overflow-y-auto">
					<SideBar />
				</nav>
			</div>

			{/* ---------------------------------- Main ---------------------------------- */}
			<main className="flex flex-col flex-1 border-l border-color">

				{/* --------------------------------- Top Bar -------------------------------- */}

				<div className="flex items-center justify-between h-16 px-4 bg-gray-100 border-b border-color dark:bg-gray-800">
					<PageBreadcrumbs />
					<UserProfileDropDown user={user} />
				</div>

				<div slot-name="fileActions" className="flex items-center justify-between h-16 gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800">

					<FilesSearchFilter />

					{/* ---------------------------- Selection Actions --------------------------- */}
					<SelectionActions />

					{/* ----------------------------- Visible columns ---------------------------- */}
					<VisibleColumnsDropDown />
				</div>


				{/* ------------------------------- Files Table ------------------------------ */}
				<div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
					<FilesTable />
				</div>
			</main>

			{/* ----------------------------- Theme Switcher ----------------------------- */}
			<div className="fixed bottom-4 right-4">
				<ThemeSwitcher />
			</div>
		</div>
	)
}