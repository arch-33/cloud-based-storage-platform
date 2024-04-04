import { Fragment } from "react";
import { Head } from "@inertiajs/react";
import { FileDataType, PageProps } from "@/types";

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
		<Fragment>
			<Head title="My-drive: Trashed Files" />
			Trash
			{/* <FileManager
				folder={folder.data}
				ancenstors={ancenstors}
				descendants={descendants}
				permissions={{
					fileActions: ["Restore", "Delete"],
					search: true,
					upload: false
				}}
				routes={{
					home: "trash",
					neested: "trash.show",
					download: "",
					delete: "trash.delete",
					restore: "trash.restore"
				}}
				children={null}
			/> */}
		</Fragment>
	)
}


export default Trash;

