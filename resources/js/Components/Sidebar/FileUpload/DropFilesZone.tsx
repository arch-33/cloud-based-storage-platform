import { ChangeEvent, DragEvent, useState } from "react";

import { FiUploadCloud } from "react-icons/fi";
import clsx from "clsx";

type PropsType = {
	selectedFiles: {
		get: any[],
		set: (value: any) => void
	},
}

export function DropFilesZone({ selectedFiles }: PropsType) {

	const [isDragOver, setIsDragOver] = useState(false);

	const onDragOver = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(true);
	};

	const onDragLeave = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (ev: DragEvent<HTMLLabelElement>) => {
		ev.preventDefault();
		setIsDragOver(false);
		const files = ev.dataTransfer.files;
		if (!files.length) {
			return;
		}
		selectedFiles.set([...selectedFiles.get, ...files]);
	};

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		ev.preventDefault();
		if (ev.target.files?.length) {
			selectedFiles.set([...selectedFiles.get, ...ev.target.files]);
		}
	};


	return (
		<label
			htmlFor="dropzone-file"
			className={clsx("flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 border-2 border-gray-300 border-dashed",
				{ "border-3 border-gray-600": isDragOver })}

			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={handleDrop}
		>
			<div className="flex flex-col items-center justify-center pt-5 pb-6">
				<FiUploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
				<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span className="font-semibold">Click</span> or <span className="font-semibold">drag & drop</span>
				</p>
				<p className="text-sm text-gray-500 dark:text-gray-400">your files to upload </p>
			</div>
			<input
				id="dropzone-file"
				type="file"
				className="hidden"
				multiple
				onChange={onChange}
			/>
		</label>
	);
}
