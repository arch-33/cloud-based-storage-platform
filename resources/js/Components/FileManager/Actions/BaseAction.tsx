import { useFileManagerContext } from "../FileManagerContext";
import { FileDataType } from "@/types";

export type ActionFormType = {
	selected_all: boolean,
	selected_ids: string[],
	parent_id: string
}

type ParamsType = {
	curentFolder: FileDataType | null,
	selectedKeys: {
		get: string | Set<string>;
		set: React.Dispatch<React.SetStateAction<string | Set<string>>>;
		reset: () => void;
	},
	file?: FileDataType
}

export function prepareData({ curentFolder, selectedKeys, file }: ParamsType): ActionFormType {
	const data: ActionFormType = {
		selected_all: false,
		selected_ids: [],
		parent_id: ""
	}

	// if applaying action on the selected files  <==> file prop is undefined
	if (!file) {
		data.parent_id = curentFolder?.uuid || "";
		data.selected_all = selectedKeys.get === "all";
		data.selected_ids = selectedKeys.get === "all" ? [] : Array.from(selectedKeys.get.values());

	} else {
		// action on one selected file <==> {file} prop
		data.parent_id = curentFolder?.uuid || "";
		data.selected_all = false;
		data.selected_ids = [file.uuid];
	}
	return data;
}