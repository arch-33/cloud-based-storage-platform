import useCurrentFolderStore from "@/Store/currentFolderStore"
import { ArrowDownTrayIcon, HomeIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link, useForm } from "@inertiajs/react"
import { BreadcrumbItem, Breadcrumbs, Button, ButtonGroup } from "@nextui-org/react"
import clsx from "clsx"
import { useConfirm } from "react-confirm-hook"
import ConfirmDelete from "../Alert/ConfirmDelete"
import { deleteRequest } from "@/helpers"
import axios from "axios"
import { saveAs } from "file-saver";
import toast from "react-hot-toast"

type PropsType = {
	folder: { parent_id?: string, name: string },
	links: any[],
	selectionProps: { get: any, set: any, },
}

export default function FileTableHeader({ folder, links, selectionProps }: PropsType) {

	const folderId = useCurrentFolderStore.use.folderId()

	const deleteForm = useForm<{ selected_all: boolean, selected_ids: string[], parent_id: string }>({
		selected_all: false,
		selected_ids: [],
		parent_id: ""
	})

	const confirmDeletePrompt = useConfirm(ConfirmDelete);


	const onDelete = () => {
		confirmDeletePrompt({
			onConfirm: () => {
				deleteForm.data.parent_id = folderId;
				deleteForm.data.selected_all = selectionProps.get === "all";
				deleteForm.data.selected_ids = selectionProps.get === "all" ? [] : Array.from(selectionProps.get.values())

				deleteRequest({ form: deleteForm, onSuccess: () => selectionProps.set(new Set([])) });
			},
			onCancel: () => { },

		})
	}

	const onDownload = () => {
		const data = {
			parent_id: folderId,
			selected_all: selectionProps.get === "all",
			selected_ids: selectionProps.get === "all" ? [] : Array.from(selectionProps.get.values()),
		}

		axios.post(route("files.download"), data, { responseType: "blob" })
			.then(({ data, headers }) => {
				saveAs(data, headers.get("filename"));
			})
			.catch(err => toast.error("Error, couldn't download selected file(s)", {position: "top-right"}))
	}
	
	const onShare = () => {

	}

	const actions = [
		{ name: "Share", Icon: ShareIcon, action: onShare },
		{ name: "Download", Icon: ArrowDownTrayIcon, action: onDownload },
		{ name: "Move to Trash", Icon: TrashIcon, action: onDelete, color: "danger" },
	]

	return (
		<div className="flex flex-wrap justify-between w-full gap-y-2">

			<Breadcrumbs
				separator="/"
				size="lg"
				maxItems={3}
				itemsBeforeCollapse={1}
				itemsAfterCollapse={2}
				itemClasses={{ item: "text-2xl px-4", separator: "px-4 text-2xl", }}
				className="flex-1 "
			>
				<BreadcrumbItem>
					<Link
						href={route("my-drive")}
						onClick={e => { !folder.parent_id && e.preventDefault() }}
						className="flex items-center gap-2 whitespace-nowrap"
					>
						<HomeIcon className="w-6 h-6" /> Home
					</Link>
				</BreadcrumbItem>

				{links.map((ele, key) => (
					<BreadcrumbItem key={"BreadcrumbItem+" + key + ele.file_uuid}>
						<Link
							href={route("folders.show", { folder: ele.file_uuid })}
							className="max-w-[12rem] truncate">
							{ele.name}
						</Link>
					</BreadcrumbItem>
				))}

				{folder.parent_id ? (
					<BreadcrumbItem>
						<span className="max-w-[12rem] truncate"> {folder.name}</span>
					</BreadcrumbItem>) : ""
				}
			</Breadcrumbs>

			<div className={clsx("flex-initial px-2 flex items-center justify-between", { "hidden": (selectionProps.get !== "all" && !selectionProps.get.size) })}>
				<span className="px-3 py-2 text-center text-md text-default-400">
					{selectionProps.get === "all" ? "All items selected" : `${selectionProps.get.size} selected`}
				</span>

				<ButtonGroup className="gap-x-1" variant="flat">
					{actions.map(({ name, Icon, action, color }, index) => (
						<Button
							startContent={<Icon className={clsx("flex-shrink-0 w-6 h-6 text-xl pointer-events-none", { "text-danger-300": color === "danger" })} />}
							onPress={action}
							color={color || "default"}
						>
							{name}
						</Button>
					))}
				</ButtonGroup>
			</div>
		</div>
	)
}