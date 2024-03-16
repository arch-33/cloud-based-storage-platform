import { useCallback } from "react"
import { FileDataType } from "@/types";
import { useFileManagerContext } from "../FileManagerContext";
import { router } from "@inertiajs/react";


export default function useOpenFolderAction() {

	const { routes } = useFileManagerContext();

	const onAction = useCallback(
		(file?: FileDataType) => {
			if (routes.neested && file?.is_folder) {
				router.visit(route(routes.neested, { folder: file.uuid }))
			}
		},
		[routes]
	);

	return onAction
}