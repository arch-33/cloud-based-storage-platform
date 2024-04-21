import ConfirmDelete from "@/components/Alert/ConfirmDelete";
import { useFileManagerConfig, useFileManagerState } from "@/filesManager/fileManagerContext";
import { prepareSelectionData } from "@/helpers";
import { FileDataType } from "@/types"
import { router } from "@inertiajs/react";
import axios from "axios";
import { useCallback } from "react";
import { useConfirm } from "react-confirm-hook";
import toast from "react-hot-toast";

export default function useDelete() {

	const { folder, can } = useFileManagerConfig();
	const { selectedKeys, setSelectedKeys } = useFileManagerState()
	const confirmDeletePrompt = useConfirm(ConfirmDelete);

	const onAction = (file?: FileDataType) => {
		if (!can.fileActions.includes("Delete")) return;

		const selectionData = prepareSelectionData(selectedKeys, file);
		confirmDeletePrompt({
			onConfirm: () => {
				const data = {
					selected_all: selectionData.selected_all,
					selected_ids: selectionData.selected_ids
				}

				toast.promise(
					axios.post(route(`trash.restore`), data)
						.then(response => {
							router.reload({
								only: ["descendants"],
								preserveScroll: true
							})
						})
						.catch(err => console.log(err)),
					{
						loading: 'Deleting...',
						success: <b>files deleted successfully</b>,
						error: <b>Error while deleting files. Please try again later.</b>,
					}
				);
			},
		})
	}

	return useCallback(onAction, [selectedKeys, folder, can, setSelectedKeys, confirmDeletePrompt]);
}