import { Fragment } from "react";
import { Head } from "@inertiajs/react";
import { FileDataType, PageProps } from "@/types";
import FileManager from "@/Components/FileManager/FileManager";

type PropsType = PageProps & {
	folder: { data: FileDataType, },// current folder data
	descendants: { // current folder's children with pagination
		data: FileDataType[];
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: { uuid: string, name: string }[], // parents list for cureent folder
}

const MyDrive = ({ folder, descendants, ancenstors }: PropsType) => {

	return (
		<Fragment>
			<Head title="My-drive" />
			<FileManager
				folder={folder.data}
				ancenstors={ancenstors}
				descendants={descendants}
				permissions={{
					fileActions: ["Share", "Download", "Move To Trash"],
					search: true,
					upload: true
				}}
				routes={{
					home: "my-drive",
					neested: "folders.show",
					download: "files.download",
					delete: "files.delete"
				}}
				children={null}
			/>
		</Fragment>
	)
}


export default MyDrive;

