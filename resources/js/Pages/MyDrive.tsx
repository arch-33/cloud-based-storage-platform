import { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FilesTable } from "@/Components/FilesTable/FilesTable";
import { Head } from "@inertiajs/react";
import { NavBreadcrumbs } from "@/Components/FilesTable/NavBreadcrumbs";
import NewDropdown from "@/Components/Sidebar/NewDropdown";
import { PageProps } from "@/types";
import useCurrentFolderStore from "@/Store/currentFolderStore";

type PropsType = PageProps & {
	folder: any,
	descendants: {
		[name: string]: any,
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: any[],
}

const MyDrive = ({ folder, descendants, ancenstors }: PropsType) => {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));
	const setFolderId = useCurrentFolderStore.use.setFolderId()

	useEffect(() => {
		setFolderId(folder.data.uuid)
		return () => setFolderId("")
	}, [])


	return (
		<AuthenticatedLayout
			sidebarTopChild={<NewDropdown />}
		>
			<Head title="My-drive"/>
			<div className="flex flex-col gap-8 px-4 pt-6">


				<NavBreadcrumbs
					baseUrl="/my-drive/"
					folder={folder.data}
					links={ancenstors}
				/>

				<div className="2xl:col-span-4 sm:col-span-2">
					<div className="bg-white rounded-md shadow dark:bg-zinc-900 h-fit">
						<div className="flex flex-col overflow-x-auto overflow-y-auto">
							<FilesTable
								baseUrl="/my-drive/"
								selectionProps={{ get: selectedKeys, set: setSelectedKeys }}
								elements={descendants}
							/>
						</div>
					</div>
				</div>
			</div >
		</AuthenticatedLayout>
	)
}


export default MyDrive;

