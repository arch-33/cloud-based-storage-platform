import { Table, TableHeader, TableColumn, Button, TableBody, Spinner, TableRow, TableCell } from "@nextui-org/react";
import { useState } from "react";

export default function FilesTable({ }) {
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>([]));

    return (
        <>
            <ol className="flex list-outside ">
                {selectedKeys.size ? selectedKeys.size + "  |" : ""}
                {Array.from(selectedKeys).map((v, k) => <li className="px-8" key={"---" + v}>{v}</li>)}

            </ol>
            <Table
                color={"default"}
                isHeaderSticky
                showSelectionCheckboxes={true}
                selectionMode="multiple"
                isCompact
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}

                checkboxesProps={{
                    color: "primary",
                    classNames: {
                        wrapper: "after:bg-foreground after:text-background text-background",
                    },
                }}
            >
                <TableHeader>
                    <TableColumn className="text-lg font-semibold capitalize">file name</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">owner</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">created at</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">updated at</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize">file size</TableColumn>
                    <TableColumn className="text-lg font-semibold capitalize"><Button variant="flat">:</Button></TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={<h3 className="text-2xl">No rows to display.</h3>}
                    loadingContent={<Spinner label="Loading..." />}
                >
                    <TableRow key="1">
                        <TableCell className="px-6 py-4 whitespace-nowrap">Tony Reichert</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">CEO</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">CEO</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">:</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell className="px-6 py-4 whitespace-nowrap">Zoey Lang</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">CEO</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Technical Lead</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Paused</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">:</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell className="px-6 py-4 whitespace-nowrap">Jane Fisher</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Senior Developer</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">CEO</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">:</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell className="px-6 py-4 whitespace-nowrap">William Howard</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Community Manager</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">CEO</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Active</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap">Vacation</TableCell>
                        <TableCell className="px-6 py-4 whitespace-nowrap"><Button>:</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}