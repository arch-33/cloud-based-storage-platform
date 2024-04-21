import { Selection } from "@nextui-org/react";
import { FileActions, FileDataType } from "@/types"
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { LucideIcon } from "lucide-react";


// non updatable state during page
type Config = {
	folder: FileDataType; //current folder's data
	descendants: FileDataType[]; //current folder's children
	ancenstors: { uuid: string; name: string }[]; //parents list {uuid , name} for cureent folder
	routes: { //routes config for current Page
		routeNamePrefix: string,
		home: { label: string; routeName: string; icon: LucideIcon };
		nested: { routeName: string; params: string };
		current?: { name: string; },
	};
	can: {
		upload: boolean;
		fileActions: FileActions[];
	},
	filesTable: {
		columnsDef: { name: string; uid: string; sortable: boolean }[];
		initialVisibleColumns: string[];
		excludedColumns: string[];
	}
}

type State = {
	searchFilterValue: string
	visibleColumns: Selection,
	selectedKeys: Selection,
}

type Actions = {
	setSearchFilterValue: Dispatch<SetStateAction<string>>,
	setVisibleColumns: Dispatch<SetStateAction<Selection>>,
	setSelectedKeys: Dispatch<SetStateAction<Selection>>
}

const ConfigContext = createContext<Config | undefined>(undefined);

const StateContext = createContext<State & Actions>({
	selectedKeys: new Set([]),
	searchFilterValue: "",
	visibleColumns: new Set([]),
	setSearchFilterValue: () => { },
	setSelectedKeys: () => { },
	setVisibleColumns: () => { },
});

export function FileManagerProvider({ children, folder, descendants, ancenstors, can, routes, filesTable }: PropsWithChildren & Config) {
	const [searchFilterValue, setSearchFilterValue] = useState("");
	const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(filesTable.initialVisibleColumns));
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
	return (
		<ConfigContext.Provider value={{ folder, ancenstors, descendants, filesTable, can, routes }}>
			<StateContext.Provider value={{
				searchFilterValue, setSearchFilterValue,
				visibleColumns, setVisibleColumns,
				selectedKeys, setSelectedKeys
			}}>
				{children}
			</StateContext.Provider>

		</ConfigContext.Provider>
	)
}

export function useFileManagerConfig() {
	const context = useContext(ConfigContext)
	if (context === undefined) {
		throw new Error("FileManagerContext is not defined ")
	}
	return context
}

export function useFileManagerState() {
	const context = useContext(StateContext)
	if (context === undefined) {
		throw new Error("FileManagerContext is not defined ")
	}
	return context
}