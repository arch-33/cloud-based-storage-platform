import { FileDataType } from "@/types"
import { SortDescriptor, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, cn } from "@nextui-org/react";
import { Key, useCallback, useMemo, useState } from "react"
import { Folder, File } from "lucide-react";
import { If, Then, Else } from "react-if";
import FileContextMenu from "./contextMenu";
import { useFileManagerConfig, useFileManagerState } from "../fileManagerContext";
import { capitalize } from "lodash";

type PropsType = {}

export default function FilesTable({ }: PropsType) {

	const { descendants, filesTable } = useFileManagerConfig();
	const { selectedKeys, setSelectedKeys, visibleColumns, searchFilterValue } = useFileManagerState();
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

	const filteredItems = useMemo(() => {
		let filteredFiles = [...descendants];
		// Search Filter
		if (Boolean(searchFilterValue)) {
			filteredFiles = filteredFiles.filter((file) =>
				file.name.toLowerCase().includes(searchFilterValue.toLowerCase()),
			);
		}

		return filteredFiles;
	}, [descendants, searchFilterValue]);

	const sortedItems = useMemo(() => {
		return [...filteredItems].sort((a: FileDataType, b: FileDataType) => {
			const first = a[sortDescriptor.column as keyof FileDataType] as number;
			const second = b[sortDescriptor.column as keyof FileDataType] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all")
			return filesTable.columnsDef;

		return filesTable.columnsDef.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const renderCell = useCallback((file: FileDataType, columnKey: Key) => {
		const cellValue = file[columnKey as keyof FileDataType];

		switch (columnKey) {
			case "name":
				return (
					<span className="flex items-end font-medium gap-x-3">
						<If condition={file.is_folder}>
							<Then><Folder className="w-5 h-5" /></Then>
							<Else><File className="w-5 h-5" /></Else>
						</If>
						{cellValue}
					</span>
				);
			case "actions":
				return (
					<FileContextMenu file={file} />
				)
			default:
				return <p className="p-3.5 text-sm text-gray-700 dark:text-gray-200 max-h-">{cellValue}</p>;
		}
	}, []);


	const onOpenFolder = (file: FileDataType) => () => {
		alert("go to folder: " + file.uuid)
	}

	return (
		<Table
			isHeaderSticky
			removeWrapper
			selectionMode="multiple"
			classNames={{
				table: "bg-zinc-50 dark:bg-zinc-700 rounded-md shadow",
				th: "first:min-w-0 first:p-y-0 bg-gray-50 dark:bg-gray-800 whitespace-nowrap outline-none p-x-3.5 !w-0 border-b-2 border-b-gray-200 dark:border-b-gray-600  dark:text-gray-50 dark:bg-gray-800 text-gray-800 bg-gray-50 p-3.5 text-md text-start font-semibold min-w-[10rem]",
				td: "ap-3.5 text-sm text-gray-700 dark:text-gray-200",
				tbody: "divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-zinc-700",
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader
				columns={[...headerColumns, { name: "ACTIONS", uid: "actions", sortable: false }]}
			>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
						className={cn({ "min-w-[6rem]": column.uid === "actions" })}
					>
						{capitalize(column.name)}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={sortedItems}
				emptyContent={
					<div className="flex flex-col items-center justify-center gap-2">
						<Folder className="w-10 h-10" />
						<span className="font-sans text-2xl">This folder is empty!</span>
					</div>
				}
			>
				{(item) => (
					<TableRow
						key={item.id}
						onDoubleClick={onOpenFolder(item)}
					>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}