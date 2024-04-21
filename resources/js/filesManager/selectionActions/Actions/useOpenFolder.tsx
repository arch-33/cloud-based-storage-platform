import { useFileManagerConfig, useFileManagerState } from "@/filesManager/fileManagerContext";
import { FileDataType } from "@/types"
import { router } from "@inertiajs/react";
import { useCallback } from "react";

export default function useOpenFolderAction() {

	const { routes } = useFileManagerConfig();

	const onAction = (file: FileDataType) => {
		if (routes.nested.routeName && file.is_folder) {
			router.visit(route(routes.nested.routeName, { [routes.nested.params]: file.uuid }))
		}
	}

	return useCallback(onAction, []);
}