import { FolderOpenIcon } from "@heroicons/react/24/outline"
import { DropdownItem } from "@nextui-org/react"
import { PropsWithChildren } from "react"

type PropsType = PropsWithChildren & {
	asDropdownItem?: boolean
}

export default function OpenAction({ children }: PropsType) {
	
	return (
		<DropdownItem
			startContent={
			<FolderOpenIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-default-500" />}
			// onClick={() => openFolderRequest(file)}
		>
			Open
		</DropdownItem>
	)
}