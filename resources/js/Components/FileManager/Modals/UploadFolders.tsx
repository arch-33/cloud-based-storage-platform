import { useForm } from "@inertiajs/react";
import UploadModalBase from "./UploadModalBase";

type PropsType = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
	}
}


export default function UploadFoldersModal({ disclosure }: PropsType) {
	const uploadForm = useForm<{ files: File[], relative_paths: string[], parent_id: string }>({
		files: [],
		relative_paths: [],
		parent_id: ""
	});

	const preSubmit = ({ files, parent_id }: { files: File[], parent_id: string }) => {
		uploadForm.data.files = files;
		uploadForm.data.parent_id = parent_id;
		uploadForm.data.relative_paths = files.map(f => f.webkitRelativePath);
	}

	return (
		<UploadModalBase
			disclosure={disclosure}
			uploadType="Folders"
			preSubmit={preSubmit}
			uploadForm={uploadForm}
		/>
	);
}