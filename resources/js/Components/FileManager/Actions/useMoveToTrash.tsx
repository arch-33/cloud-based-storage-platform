import { useCallback } from "react"
import { FileDataType } from "@/types";
import { useForm } from "@inertiajs/react";
import { useConfirm } from "react-confirm-hook";
import ConfirmDelete from "@/Components/Alert/ConfirmDelete";
import toast from "react-hot-toast";
import { useFileManagerContext } from "../FileManagerContext";
import { ActionFormType, prepareData } from "./BaseAction";



export default function useMoveToTrashAction(file?: FileDataType) {

	const { curentFolder, selectedKeys, routes } = useFileManagerContext();

	const deleteForm = useForm<ActionFormType>({
		selected_all: false,
		selected_ids: [],
		parent_id: ""
	});

	const confirmDeletePrompt = useConfirm(ConfirmDelete);

	return useCallback(
		() => {
			if (!routes.delete) return;

			// if applaying action on the selected files  <==> file prop is undefined
			if (!file) {
				deleteForm.data.parent_id = curentFolder?.uuid || "";
				deleteForm.data.selected_all = selectedKeys.get === "all";
				deleteForm.data.selected_ids = selectedKeys.get === "all" ? [] : Array.from(selectedKeys.get.values());

			} else {
				// action on one selected file <==> {file} prop
				deleteForm.data.parent_id = curentFolder?.uuid || "";
				deleteForm.data.selected_all = false;
				deleteForm.data.selected_ids = [file.uuid];
			}

			confirmDeletePrompt({
				onConfirm: () => {

					deleteForm.delete(route(routes.delete || ""), {
						onSuccess: () => {
							toast.success(
								`files moved to trash successfully`,
								{ position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } }
							);
							selectedKeys.reset();
						},
						onError: (errors: any) => {
							let message = '';

							if (Object.keys(errors).length > 0) {
								message = errors[Object.keys(errors)[0]]
							} else {
								message = 'Error while deleting files. Please try again later.'
							}
							toast.error(message, { position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } });
						},
					});

				},
				onCancel: () => { },
			})
		},
		[curentFolder, file, selectedKeys, routes]
	);

}