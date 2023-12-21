import useCurrentFolderStore from "@/Store/currentFolderStore";
import { FolderIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Link, router } from '@inertiajs/react';
import { BreadcrumbItem, Breadcrumbs, Button, Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";


type PropsType = {
    folder: any,
    descendants: {
        [name: string]: any,
        meta: { [name: string]: any, links: any[] }
    },
    ancenstors: any[],
    base_url: string
}

export default function FilesTable({ folder, descendants, ancenstors }: PropsType) {

    const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));
    const { baseUrl } = useCurrentFolderStore()


    const onPaginate = (page: number) => {
        let to_url = new URL(baseUrl, window.location.origin);
        to_url.searchParams.set("page", "" + page)
        router.visit(to_url.pathname + to_url.search)
    }

    const OpenFolder = (folder: any) => {
        if (folder?.is_folder) {
            router.visit(baseUrl + "folders/" + folder.uuid);
        }
    }

    return (
        <>
            <Breadcrumbs separator="/" maxItems={3} size="lg" itemsBeforeCollapse={1} itemsAfterCollapse={2}
                itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
            >
                <BreadcrumbItem>
                    <Link href={baseUrl} onClick={e => { !folder?.data.parent_id && e.preventDefault() }}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >
                        <HomeIcon className="w-6 h-6" /> Home
                    </Link>
                </BreadcrumbItem>

                {ancenstors.map((ele, key) => (
                    <BreadcrumbItem key={"file+" + key + ele.file_uuid}>
                        <Link href={baseUrl + "folders/" + ele.file_uuid} className="max-w-[12rem] truncate"> {ele.name}</Link>
                    </BreadcrumbItem>
                ))}

                {folder?.data.parent_id ? (
                    <BreadcrumbItem>
                        <span className="max-w-[12rem] truncate"> {folder?.data.name}</span>
                    </BreadcrumbItem>
                ) : ""}
            </Breadcrumbs>

            <Table color={"default"} isHeaderSticky showSelectionCheckboxes={true} selectionMode="multiple" isCompact
                selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}
                checkboxesProps={{ color: "primary", classNames: { wrapper: "after:bg-foreground after:text-background text-background" }, }}
            >
                <TableHeader>
                    <TableColumn className="text-lg font-semibold capitalize">file name</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">owner</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">created</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">updated</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">file size</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize"><Button variant="flat">:</Button></TableColumn>
                </TableHeader>

                <TableBody
                    emptyContent={<h3 className="text-2xl">No rows to display.</h3>}
                    loadingContent={<Spinner label="Loading..." />}
                >
                    {descendants.data.map((element, key) => (
                        <TableRow key={"files_row" + key + "e" + element.id} onDoubleClick={() => OpenFolder(element)}>
                            <TableCell className="flex items-end px-6 py-4 gap-x-2 whitespace-nowrap">
                                {element?.is_folder ? <FolderIcon className="w-5 h-5" /> : ""}
                                {element.name}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{element.owner}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{element.created_at}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{element.updated_at}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">{element.size !== "0.00 B" ? element.size : ""}</TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">:</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex flex-wrap items-center gap-4">
                {descendants?.meta?.links.length > 3 ?
                    <Pagination variant="faded" size="lg" showShadow showControls classNames={{ base: "w-full flex justify-center" }}
                        total={descendants?.meta?.total} initialPage={descendants?.meta?.current_page}
                        page={descendants?.meta?.current_page} onChange={onPaginate}

                    /> : <></>
                }
            </div>
        </>
    )
}