import axios from "axios";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useFileManagerConfig, useFileManagerState } from "@/filesManager/fileManagerContext";
import { prepareSelectionData } from "@/helpers";
import { FileDataType } from "@/types";

export default function useDownload() {

	const { routes, can, folder } = useFileManagerConfig();
	const { selectedKeys } = useFileManagerState()

	const onAction = (file?: FileDataType) => {
		if (!can.fileActions.includes("Download")) return;
		const selectionData = prepareSelectionData(selectedKeys, file);

		const data = {
			parent_id: folder.uuid,
			selected_all: selectionData.selected_all,
			selected_ids: selectionData.selected_ids
		}

		toast.promise(
			axios.post(route(`${routes.routeNamePrefix}.files.download`), data, { responseType: "blob" })
				.then(({ data, headers }) => {
					saveAs(data, headers.filename);
				})
				.catch(err => console.log(err)),
			{
				loading: 'Downloading...',
				success: <b>download successful!</b>,
				error: <b>Couldn't finish downloading.</b>,
			}
		);
	}

	return useCallback(onAction, [selectedKeys, folder]);
}