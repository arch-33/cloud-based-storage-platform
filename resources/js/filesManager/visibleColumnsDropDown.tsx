import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { ChevronDown } from "lucide-react"
import { useFileManagerConfig, useFileManagerState } from "./fileManagerContext";
import { capitalize } from "lodash";

type PropsType = {
}

export default function VisibleColumnsDropDown({ }: PropsType) {

	const { filesTable } = useFileManagerConfig();
	const { visibleColumns, setVisibleColumns } = useFileManagerState();

	return (
		<Dropdown>
			<DropdownTrigger className="hidden sm:flex">
				<Button endContent={<ChevronDown className="text-small" />} variant="flat">
					Visible Columns
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Table Visible Columns"
				closeOnSelect={false}
				selectedKeys={visibleColumns}
				selectionMode="multiple"
				onSelectionChange={setVisibleColumns}
			>
				{filesTable.columnsDef
					.filter(col => !filesTable.excludedColumns.includes(col.uid))
					.map((column) => (<DropdownItem key={column.uid}>{capitalize(column.name)}</DropdownItem>))
				}
			</DropdownMenu>
		</Dropdown>
	)
}