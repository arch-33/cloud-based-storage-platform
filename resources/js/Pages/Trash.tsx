import { Fragment } from "react";
import { Head } from "@inertiajs/react";
import { FileDataType, PageProps } from "@/types";
import FileManager from "@/filesManager";
import { FileManagerProvider } from "@/filesManager/fileManagerContext";
import { TrashIcon } from "lucide-react";

type PropsType = PageProps & {
	folder: { data: FileDataType, },// current folder data
	descendants: { // current folder's children with pagination
		data: FileDataType[];
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: { uuid: string, name: string }[], // parents list for cureent folder
}

const Trash = ({ folder, descendants, ancenstors }: PropsType) => {

	return (
		<FileManagerProvider
			folder={folder.data}
			descendants={descendants.data}
			ancenstors={ancenstors}
			can={{
				upload: false,
				fileActions: ["Restore", "Delete"],
			}}
			routes={{
				routeNamePrefix: "trash",
				home: {
					label: "Trash",
					icon: TrashIcon,
					routeName: "trash.index",
				},
				nested: {
					routeName: "trash.folders.show",
					params: "folder"
				},
				current: folder.data.parent_id ? { name: folder.data.name } : undefined
			}}
			filesTable={{
				columnsDef: [
					{ name: "NAME", uid: "name", sortable: true },
					{ name: "SIZE", uid: "size", sortable: true },
					{ name: "OWNER", uid: "owner", sortable: true },
					{ name: "CREATED AT", uid: "created_at", sortable: true },
					{ name: "UPDATED AT", uid: "updated_at", sortable: true },
					{ name: "DELETED AT", uid: "deleted_at", sortable: true },
				],
				initialVisibleColumns: ["name", "size", "deleted_at"],
				excludedColumns: [],
			}}
		>
			<Head title="My-drive: Trashed Files" />
			<FileManager />
		</FileManagerProvider>
	);
}


export default Trash;

