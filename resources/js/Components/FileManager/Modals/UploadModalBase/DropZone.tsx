import clsx from "clsx";
import { ChangeEvent, DragEvent, useId, useMemo, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

type PropsType = {
	selectedFiles: {
		get: any[],
		set: (value: any) => void
	},
	uploadType: "Files" | "Folders"
}


export function DropZone({ selectedFiles, uploadType }: PropsType) {


	const formID = useId();
	const [isDragOver, setIsDragOver] = useState(false);

	const labelClassNames = useMemo(() => clsx(
		"flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800",
		" dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 border-2",
		" border-gray-300 border-dashed",
		{ "border-3 border-gray-600": isDragOver }
	), [isDragOver]);

	const inputProps = useMemo(() => {
		return uploadType === "Folders" ? { directory: "", mozdirectory: "", webkitdirectory: "" } : { multiple: true }
	}, [uploadType])

	const onDragOver = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(true);
	};

	const onDragLeave = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(false);
	};

	const onDrop = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(false);

		const files = ev.dataTransfer.files;
		if (!files.length) { return; }
		selectedFiles.set([...files]);
	};


	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		ev.preventDefault();
		const files = ev.target.files;
		if (!files?.length) { return; }
		selectedFiles.set([...files]);
	};

	return (
		<label
			htmlFor={"dropzone-" + formID}
			className={labelClassNames}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>

			<div className="flex flex-col items-center justify-center pt-5 pb-6">

				<FiUploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

				<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span className="font-semibold">Click</span> or <span className="font-semibold">Drag & Drop</span>
				</p>

				<p className="text-sm text-gray-500 dark:text-gray-400">
					your {uploadType} to upload
				</p>
			</div>

			<input
				id={"dropzone-" + formID}
				type="file"
				className="hidden"
				onChange={onChange}
				// @ts-ignore
				{...inputProps}
			/>
		</label>
	);

}