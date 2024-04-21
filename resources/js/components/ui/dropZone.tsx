import clsx from "clsx";
import { CloudUpload } from "lucide-react";
import { ChangeEvent, DragEvent, PropsWithChildren, useId, useMemo, useState } from "react";
import toast from "react-hot-toast";

type PropsType = {
	uploadType: "files" | "folders"
	setFiles: (files: File[]) => void
}

export default function DropZone({ uploadType, setFiles }: PropsType) {
	const id = useId();
	const [isDragOver, setIsDragOver] = useState(false);

	const inputProps = useMemo(() => {
		return uploadType === "folders" ? { directory: "", mozdirectory: "", webkitdirectory: ""} : { multiple: true }
	}, [uploadType])

	const filterFiles = (files: FileList) => {
		let errMessage = ""
		const acceptedfiles = [];

		for (let index = 0; index < files.length; index++) {
			// Check if it's a folder
			if (!(files[index].type || files[index].size)) { // Not a file
				// No file type detected, likely a folder
				errMessage = 'Folders are not allowed. Please select only files.'
			} else {
				acceptedfiles.push(files[index])
			}
		}
		return { acceptedfiles, errMessage }
	}

	const onDragOver = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(true);
	};

	const onDragLeave = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(false);
	};
	const onDrop = (ev: DragEvent<HTMLLabelElement>) => {
		onDragLeave(ev);
		const files = ev.dataTransfer.files;
		if (!files.length) { return; }

		if (uploadType === "files") {
			const { acceptedfiles, errMessage } = filterFiles(ev.dataTransfer.files);
			setFiles([...acceptedfiles])
			if (errMessage.length) toast.error(errMessage, { position: "top-right", style: { padding: "1rem" } })
		} else {
			setFiles([...ev.dataTransfer.files])
		}
	};

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		ev.preventDefault();

		if (!ev.target.files?.length) { return; }
		if (uploadType === "files") {
			const { acceptedfiles, errMessage } = filterFiles(ev.target.files);
			setFiles([...acceptedfiles])
			if (errMessage.length) toast.error(errMessage, { position: "top-right", style: { padding: "1rem" } })
		} else {
			setFiles([...ev.target.files])
		}

	}


	return (
		<label
			htmlFor={id}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			className={clsx("flex flex-col items-center justify-center w-full h-64 cursor-pointer",
				"bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100",
				"border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 dark:hover:border-gray-500",
				{ "border-3 border-gray-600": isDragOver }
			)}
		>

			<div className="flex flex-col items-center justify-center pt-5 pb-6">

				<CloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

				<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span className="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p className="text-xs text-gray-500 dark:text-gray-400">your {uploadType}</p>
			</div>

			<input
				id={id}
				type="file"
				className="hidden"
				onChange={onChange}
				// @ts-ignore
				{...inputProps}
			/>
		</label>
	)
}