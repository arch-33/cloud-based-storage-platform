import FilesTable from "@/Components/FilesTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useCurrentFolderStore from "@/Store/currentFolderStore";
import { PageProps } from "@/types";
import { useEffect } from "react";


type PropsType = PageProps & {
	folder: any,
	descendants: {
		[name: string]: any,
		meta: { [name: string]: any, links: any[] }
	},
	ancenstors: any[],
}

const MyDrive = ({ folder, descendants, ancenstors }: PropsType) => {
	const { setBaseUrl, setFolderId } = useCurrentFolderStore();

	useEffect(() => {
		setBaseUrl("/my-drive/")
		setFolderId(folder.data.uuid)

		return () => {
			setBaseUrl("")
			setFolderId("")
		}
	}, [])

	return (
		<div className="flex flex-col gap-8 px-4 pt-6">

			<FilesTable
				folder={folder}
				descendants={descendants}
				ancenstors={ancenstors}
				base_url="/my-drive"
			/>

		</div>
	)
}
MyDrive.layout = page => <AuthenticatedLayout children={page} />;
export default MyDrive;
