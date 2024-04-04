import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Selection, ChipProps, SortDescriptor } from "@nextui-org/react";
import { FileDataType } from "@/types";
import { Key, useCallback, useMemo, useState } from "react";
import { ChevronDownIcon, EllipsisVerticalIcon, File, Folder, PlusIcon, SearchIcon } from "lucide-react";
import { Else, If, Then } from "react-if";
import { FILE_TYPE_OPTIONS, columnsDef } from "./columns";


const INITIAL_VISIBLE_COLUMNS = ["name", "size", "owner", "actions"];

type PropsType = {
	files: {
		data: FileDataType[],
		meta: { [name: string]: any, links: any[] }
	},
	excludedCols: string[],
	searchFilter: string,

}
export default function FilesTable({ searchFilter, excludedCols, files }: PropsType) {

	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

	const [fileTypeFilter, setFileTypeFilter] = useState<Selection>("all");
	const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS.filter(val => !excludedCols.includes(val))));
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({/* column: "created_at", direction: "ascending" */ });

	const hasSearchFilter = Boolean(searchFilter);

	const filteredItems = useMemo(() => {
		let filteredFiles = [...files.data];

		// Search Filter
		if (hasSearchFilter) {
			filteredFiles = filteredFiles.filter((file) =>
				file.name.toLowerCase().includes(searchFilter.toLowerCase()),
			);
		}
		// File Type Filter [file, folder]
		if (fileTypeFilter !== "all" && Array.from(fileTypeFilter).length !== FILE_TYPE_OPTIONS.length) {
			filteredFiles = filteredFiles.filter((file) => fileTypeFilter.has(file.is_folder ? "folder" : "file"));
		}

		return filteredFiles;
	}, [files.data, searchFilter, fileTypeFilter]);

	const sortedItems = useMemo(() => {
		return [...filteredItems].sort((a: FileDataType, b: FileDataType) => {
			const first = a[sortDescriptor.column as keyof FileDataType] as number;
			const second = b[sortDescriptor.column as keyof FileDataType] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columnsDef;
		return columnsDef.filter((column) => Array.from(visibleColumns).includes(column.uid));
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
					<div className="relative flex items-center justify-end gap-2">
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="light">
									<EllipsisVerticalIcon className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem>View</DropdownItem>
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem>Delete</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return <p className="p-3.5 text-sm text-gray-700 dark:text-gray-200 max-h-">{cellValue}</p>;
		}
	}, []);


	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
									Status
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
								{FILE_TYPE_OPTIONS.map((type) => (
									<DropdownItem key={type.uid} className="capitalize">
										{type.name}
									</DropdownItem>
								))}
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
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columnsDef.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{column.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button color="primary" endContent={<PlusIcon />}>
							Add New
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-default-400 text-small">Total {"users.length"} users</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							// onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		searchFilter,
		fileTypeFilter,
		visibleColumns,
		files.data.length,
		hasSearchFilter,
	]);

	return (
		<Table
			isHeaderSticky
			// color="primary"
			// bottomContent={bottomContent}
			bottomContentPlacement="outside"
			classNames={{
				table: "bg-zinc-50 dark:bg-zinc-700 rounded-md shadow",
				th: "first:min-w-0 first:p-y-0 bg-gray-50 dark:bg-gray-800 whitespace-nowrap outline-none p-x-3.5 !w-0 border-b-2 border-b-gray-200 dark:border-b-gray-600  dark:text-gray-50 dark:bg-gray-800 text-gray-800 bg-gray-50 p-3.5 text-md text-start font-semibold min-w-[10rem]",
				td: "ap-3.5 text-sm text-gray-700 dark:text-gray-200",
				tbody: "divide-y divide-gray-200 dark:divide-gray-600 bg-zinc-50 dark:bg-zinc-700",
			}}
			selectedKeys={selectedKeys}
			removeWrapper
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={"No users found"} items={sortedItems}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
	return (
		<div className="bg-zinc-50 ">Files Table {searchFilter} {files.data.length}</div>
	)

}
