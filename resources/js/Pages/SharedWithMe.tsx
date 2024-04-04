import { Head } from "@inertiajs/react";
import { FileDataType, PageProps } from "@/types";
import { Home } from "lucide-react";
import FileManager from "@/filesManager";
import { FileManagerProvider } from "@/filesManager/fileManagerContext";

type PropsType = PageProps & {
	folder: { data: FileDataType, },// current folder data
	descendants: { // current folder's children with pagination
		data: FileDataType[];
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: { uuid: string, name: string }[], // parents list for cureent folder
}

export default function SharedWithMe({ folder, descendants, ancenstors }: PropsType) {
	return (
		<FileManagerProvider
			folder={folder.data}
			descendants={descendants.data}
			ancenstors={ancenstors}
			can={{
				upload: false,
				fileActions: ["Download", "Move To Trash"],
			}}
			routes={{
				home: {
					label: "Shared With Me",
					icon: Home,
					routeName: "sharedw-me.index",
				},
				nested: {
					routeName: "sharedw-me.show",
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
				initialVisibleColumns: ["name", "size", "owner"],
				excludedColumns: ["deleted_at"],
			}}
		>
			<Head title="My-drive" />
			<FileManager />
		</FileManagerProvider>
	);
}
