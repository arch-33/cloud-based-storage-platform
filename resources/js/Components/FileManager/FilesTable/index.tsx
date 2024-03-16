import { Fragment, useEffect, useMemo } from "react"
import { FileActions, FileDataType } from "@/types"
import { useFileManagerContext } from "../FileManagerContext"
import { router } from "@inertiajs/react"
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { EllipsisVerticalIcon, FolderIcon, DocumentIcon } from "@heroicons/react/24/outline"
import FileContextMenu from "./FileContextMenu"
import { Else, If, Then, When } from "react-if"
import useOpenFolderAction from "../Actions/useOpenFolder"


type PropsType = {
	elements: {
		data: FileDataType[],
		meta: { [name: string]: any, links: any[] }
	},
	actions: FileActions[],
}

export default function FilesTable({ elements, actions }: PropsType) {

	const { selectedKeys, routes } = useFileManagerContext();

	const onPaginate = (page: number) => {
		const currentRoute = route().current()?.toString() ?? ""
		const routeParams = route().params;
		router.visit(route(currentRoute, { ...routeParams, page }))
	}

	const showDeletedAtCol = useMemo(() => !!elements.data.at(0)?.deleted_at, [elements])


	const onOpenFolder = useOpenFolderAction();

	return (
		<Fragment>
			<Table
				color="primary"
				radius="none"
				selectionMode="multiple"
				removeWrapper
				selectedKeys={selectedKeys.get}
				onSelectionChange={selectedKeys.set}
				classNames={{
					table: "min-w-full bg-white dark:bg-gray-700 rounded-md shadow ",
					th: "first:min-w-0 first:p-y-0 bg-gray-50 dark:bg-gray-800 align-middle whitespace-nowrap outline-none p-x-3.5 !w-0 border-b-2 border-b-gray-200 dark:border-b-gray-600  dark:text-gray-50 dark:bg-gray-800 text-gray-800 bg-gray-50 p-3.5 text-md text-start font-semibold min-w-[10rem]",
					td: "p-3.5 text-sm text-gray-700 dark:text-gray-200",
					tbody: "divide-y divide-gray-200 dark:divide-gray-600",
				}}
			>
				<TableHeader className="bg-gray-50 dark:bg-gray-800" >
					<TableColumn>File Name</TableColumn>
					<TableColumn>Size</TableColumn>
					<TableColumn>Owner</TableColumn>
					<TableColumn>Created</TableColumn>
					<TableColumn>
						{showDeletedAtCol ? "Deleted" : "Updated"}
					</TableColumn>



					<TableColumn className={"min-w-[6rem]"}>
						<EllipsisVerticalIcon className="w-6 h-6" />
					</TableColumn>
				</TableHeader>

				<TableBody items={elements.data} emptyContent={<TableEmptyContent />} >
					{(item: FileDataType) => (
						<TableRow key={item.uuid} onDoubleClick={() => onOpenFolder(item)}>

							<TableCell className="p-3.5 text-sm text-gray-700 dark:text-gray-200" onDoubleClick={() => onOpenFolder(item)}>
								<span className="flex items-end font-medium gap-x-3">
									<If condition={item.is_folder}>
										<Then><FolderIcon className="w-5 h-5" /></Then>
										<Else><DocumentIcon className="w-5 h-5" /></Else>
									</If>
									{item.name}
								</span>
							</TableCell>
							<TableCell>{item.size}</TableCell>
							<TableCell>{item.owner}</TableCell>
							<TableCell>{item.created_at}</TableCell>
							<TableCell>
								{showDeletedAtCol ? item.deleted_at : item.updated_at}
							</TableCell>

							<TableCell>
								<FileContextMenu
									file={item}
									actions={actions}
								/>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<When condition={elements.meta.links.length > 3}>
				<div className="px-6 py-2 text-lg font-semibold text-gray-800 border-t border-gray-200 dark:border-gray-900 dark:text-gray-300 bg-zinc-50 dark:bg-gray-900">

					<Pagination
						variant="faded"
						size="lg"
						showShadow
						showControls
						classNames={{
							wrapper: "gap-x-4",
							base: "w-full flex justify-center gap-x-4",
							next: "rounded-full",
							prev: "rounded-full",
						}}
						total={elements.meta.links.length - 2}
						initialPage={elements.meta.current_page}
						page={elements.meta.current_page}
						onChange={onPaginate}
					/>
				</div>
			</When>

		</Fragment>
	)
}

function TableEmptyContent() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<FolderIcon className="w-10 h-10" />
			<span className="font-sans text-2xl">This folder is empty!</span>
		</div>
	)
}