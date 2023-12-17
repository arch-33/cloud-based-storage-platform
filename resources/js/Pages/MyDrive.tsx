import FilesTable from "@/Components/FilesTable";
import FilesTables from "@/Components/FilesTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { BreadcrumbItem, Breadcrumbs, Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";


type PropsType = PageProps & {
	folder: Object, 
	breadcrumbs: Object,
}

export default function MyDrive({ folder, breadcrumbs }: PropsType) {

	
	return (
		<AuthenticatedLayout>

			<div className="flex flex-col gap-8 px-4 pt-6">
				<Breadcrumbs

					separator="/" maxItems={3} size="lg" itemsBeforeCollapse={1} itemsAfterCollapse={2}
					itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
				>
					<BreadcrumbItem><Link href="/my-drive">My Drive</Link></BreadcrumbItem>
				</Breadcrumbs>

				{"<FilesTable/>"}
			</div>
		</AuthenticatedLayout>
	)
}
