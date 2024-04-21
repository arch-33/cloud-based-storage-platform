import ConfirmDelete from "@/components/Alert/ConfirmDelete";
import ShareFiles from "@/components/Alert/ShareFiles";
import { useFileManagerConfig, useFileManagerState } from "@/filesManager/fileManagerContext";
import { prepareSelectionData } from "@/helpers";
import { FileDataType } from "@/types"
import { router } from "@inertiajs/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useConfirm } from "react-confirm-hook";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type ShareInput = {
	is_public: boolean,
	email: string,
	permission: "view" | "edit"
}

type PropsType = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
		isControlled: boolean;
		getButtonProps: (props?: any) => any;
		getDisclosureProps: (props?: any) => any;
	}
}


export default function useShare({ disclosure }: PropsType) {

	const { folder, can } = useFileManagerConfig();
	const { selectedKeys, setSelectedKeys } = useFileManagerState()

	const onAction = (file?: FileDataType) => {
		if (!can.fileActions.includes("Share")) return;

		disclosure.onOpen();

		
		// const selectionData = prepareSelectionData(selectedKeys, file);
		// confirmDeletePrompt({
		// 	data: {
		// 		parent_id: folder.uuid,
		// 		selected_all: selectionData.selected_all,
		// 		selected_ids: selectionData.selected_ids
		// 	},
		// 	onConfirm: () => {
		// 		const data = {
		// 			parent_id: folder.uuid,
		// 			selected_all: selectionData.selected_all,
		// 			selected_ids: selectionData.selected_ids
		// 		}
		// 	},
		// })
	}

	return useCallback(onAction, [selectedKeys, folder, can, setSelectedKeys]);
}