import { Button, ButtonGroup } from "@nextui-org/react"
import clsx from "clsx"
import { useMemo } from "react"
import { useFileManagerContext } from "./FileManagerContext"
import { Else, If, Then, When } from "react-if"
import { ArrowDownTrayIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline"
import useMoveToTrashAction from "./Actions/useMoveToTrash"
import useDownloadAction from "./Actions/useDownloadAction"
import { FileActions } from "@/types"

type PropsType = {
	actions: FileActions[]
}

export default function FilesSelectionActions({ actions }: PropsType) {

	const { selectedKeys } = useFileManagerContext()

	const isHidden = useMemo(() => typeof selectedKeys.get === "string" ? selectedKeys.get !== "all" : !selectedKeys.get.size, [selectedKeys.get])

	const onShare = () => { }
	const onDownload = useDownloadAction();
	const onMoveToTrash = useMoveToTrashAction();

	return (
		<>
			<div className={clsx("flex-initial px-2 flex items-center justify-between", { "hidden": isHidden })}>
				<span className="px-3 py-2 text-center text-md text-default-400">
					<If condition={selectedKeys.get === "all"}>
						<Then>All items selected</Then>
						<Else>{selectedKeys.get instanceof Set && selectedKeys.get.size} selected</Else>
					</If>
				</span>

				<ButtonGroup className="gap-x-1" variant="flat">

					<When condition={actions.includes("Share")}>
						<Button
							startContent={<ShareIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
							onPress={onShare}
							color="default"
						>
							Share
						</Button>
					</When>


					<When condition={actions.includes("Download")}>
						<Button
							startContent={<ArrowDownTrayIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
							onPress={onDownload}
							color="default"
						>
							Download
						</Button>
					</When>


					<When condition={actions.includes("Move To Trash")}>
						<Button
							startContent={<TrashIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-danger-300" />}
							onPress={onMoveToTrash}
							color="danger"
							className="text-danger-700"
						>
							Move To Trash
						</Button>
					</When>

				</ButtonGroup>
			</div>
		</>
	)
}
