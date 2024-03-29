import { ArrowDownTrayIcon, DocumentIcon, EllipsisVerticalIcon, FolderIcon, ShareIcon, ShieldExclamationIcon, TrashIcon } from "@heroicons/react/24/outline";
import {  Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

import FileContextMenu from "./FileContextMenu";
import { router, useForm } from "@inertiajs/react";
import { deleteRequest, openFolderRequest } from "@/helpers";
import { useConfirm } from "react-confirm-hook";
import ConfirmDelete from "@/Components/Alert/ConfirmDelete";
import { FileDataType } from "@/types";
import { Dispatch, SetStateAction } from "react";


const columnsClassNames = ""
// const columnsClassNames = "dark:text-gray-50 dark:bg-gray-800 text-gray-800 bg-gray-50 p-3.5 text-md text-start font-semibold min-w-[10rem]"
const cellClassNames = "p-3.5 text-sm text-gray-700 dark:text-gray-200"

const TableEmptyContent = () => (
    <div className="flex flex-col items-center justify-center gap-2">
        <FolderIcon className="w-10 h-10" />
        <span className="font-sans text-2xl">This folder is empty!</span>
    </div>
);

type ContextType = {
    curentFolder: FileDataType | null,
    selectedKeys: {
        get: Set<string> | string,
        set: Dispatch<SetStateAction<string | Set<string>>>,
        reset: () => void
    },
}

interface PropsType {
    baseUrl: string,
    selectionProps: { get: any, set: any, },
    elements: {
        [name: string]: any,
        meta: { [name: string]: any, links: any[] }
    },
}

export function FilesTable({ selectionProps, elements }: PropsType) {

    const onPaginate = (page: number) => {
        const currentRoute = route().current()?.toString() ?? ""
        const routeParams = route().params;
        router.visit(route(currentRoute, { ...routeParams, page }))
    }
    
    return (
        <>
            <Table
                color="primary"
                radius="none"
                selectionMode="multiple"
                removeWrapper
                selectedKeys={selectionProps.get}
                onSelectionChange={selectionProps.set}
                classNames={{
                    table: "min-w-full bg-white dark:bg-gray-700 rounded-md shadow ",
                    th: "first:min-w-0 first:p-y-0 bg-gray-50 dark:bg-gray-800 align-middle whitespace-nowrap outline-none p-x-3.5 !w-0 border-b-2 border-b-gray-200 dark:border-b-gray-600  dark:text-gray-50 dark:bg-gray-800 text-gray-800 bg-gray-50 p-3.5 text-md text-start font-semibold min-w-[10rem]",
                    tbody: "divide-y divide-gray-200 dark:divide-gray-600",
                }}
            >
                <TableHeader className="bg-gray-50 dark:bg-gray-800" >
                    <TableColumn className={columnsClassNames}>Size</TableColumn>
                    <TableColumn className={columnsClassNames}>Owner</TableColumn>
                    <TableColumn className={columnsClassNames}>Created</TableColumn>
                    <TableColumn className={columnsClassNames}>Updated</TableColumn>

                    <TableColumn className={columnsClassNames + "min-w-[6rem]"}>
                        <EllipsisVerticalIcon className="w-6 h-6" />
                    </TableColumn>
                </TableHeader>

                <TableBody items={elements.data} emptyContent={<TableEmptyContent />} >
                    {(item: any) => (
                        <TableRow key={item.uuid} onDoubleClick={(e) => openFolderRequest(item)} >
                            <TableCell className="p-3.5 text-sm text-gray-700 dark:text-gray-200"
                                onDoubleClick={() => openFolderRequest(item)}
                            >
                                <span className="flex items-end font-medium gap-x-3">
                                    {item?.is_folder ? <FolderIcon className="w-5 h-5" /> : <DocumentIcon className="w-5 h-5" />}
                                    {item.name}
                                </span>
                            </TableCell>
                            <TableCell className={cellClassNames}>{item.size}</TableCell>
                            <TableCell className={cellClassNames}>{item.owner}</TableCell>
                            <TableCell className={cellClassNames}>{item.created_at}</TableCell>
                            <TableCell className={cellClassNames}>{item.updated_at}</TableCell>
                            <TableCell className={cellClassNames}>
                                <FileContextMenu file={item} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {elements.meta.links.length > 3 ?
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
                </div> : <></>}

        </>
    );
}
