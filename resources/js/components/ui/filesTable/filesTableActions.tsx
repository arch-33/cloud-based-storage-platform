import { Dropdown, Selection, DropdownTrigger, Button, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { ChevronDownIcon } from "lucide-react"
import { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { FILE_TYPE_OPTIONS, columnsDef } from "./columns"

type PropsType = PropsWithChildren & {
	fileTypeFilter: Selection,
	setFileTypeFilter: Dispatch<SetStateAction<Selection>>
	
}

export default function FilesTableActions({ children, fileTypeFilter, setFileTypeFilter }: PropsType) {
	return (
		<div className="flex gap-3">
			<Dropdown>
				<DropdownTrigger className="hidden sm:flex">
					<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
						Type
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disallowEmptySelection
					aria-label="Table Columns"
					closeOnSelect={false}
					selectedKeys={fileTypeFilter}
					selectionMode="multiple"
				onSelectionChange={setFileTypeFilter}
				>
					{FILE_TYPE_OPTIONS.map(({ uid, name }) => (<DropdownItem key={uid} className="capitalize">{name}</DropdownItem>))}
				</DropdownMenu>
			</Dropdown>
			<Dropdown>
				<DropdownTrigger className="hidden sm:flex">
					<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
						Columns
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disallowEmptySelection
					aria-label="Table Columns"
					closeOnSelect={false}
					// selectedKeys={visibleColumns}
					selectionMode="multiple"
				// onSelectionChange={setVisibleColumns}
				>
					{columnsDef.map((column) => (
						<DropdownItem key={column.uid} className="capitalize">
							{column.name}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}