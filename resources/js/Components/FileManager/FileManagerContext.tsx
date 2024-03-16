import { FileDataType, FileManagerRoutes } from "@/types";
import { SetStateAction, createContext, useContext, Dispatch, PropsWithChildren, useState } from "react";

type ContextType = {
	curentFolder: FileDataType | null,
	selectedKeys: {
		get: Set<string> | string,
		set: Dispatch<SetStateAction<string | Set<string>>>,
		reset: () => void
	},
	routes: FileManagerRoutes
}

export const FileManagerContext = createContext<ContextType>({
	curentFolder: null,
	selectedKeys: {
		get: new Set(),
		set: () => { },
		reset: () => { }
	},
	routes: {
		home: ""
	}
});

type PropsType = PropsWithChildren & {
	curentFolder: FileDataType | null,
	routes: FileManagerRoutes
}


export const FileManagerContextProvider = ({ children, curentFolder, routes }: PropsType) => {

	const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(new Set<string>());

	const resetSelectedKeys = () => {
		setSelectedKeys(new Set());
	}

	return (
		<FileManagerContext.Provider
			value={{
				curentFolder,
				routes,
				selectedKeys: {
					get: selectedKeys,
					set: setSelectedKeys,
					reset: resetSelectedKeys
				},
			}}
			children={children}
		/>
	)


}

export const useFileManagerContext = () => useContext(FileManagerContext);

