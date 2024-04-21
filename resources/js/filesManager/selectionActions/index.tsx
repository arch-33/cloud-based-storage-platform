import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { cn, ButtonGroup, Button, Selection, useDisclosure } from "@nextui-org/react"
import { RotateCcw, ShareIcon, TrashIcon } from "lucide-react"
import { Dispatch, PropsWithChildren, SetStateAction, useMemo } from "react"
import { Else, If, Then, When } from "react-if"
import { useFileManagerConfig, useFileManagerState } from "../fileManagerContext"
import useMoveToTrash from "./Actions/useMoveToTrash"
import useDownload from "./Actions/useDownload"
import useDelete from "./Actions/useDelete"
import useRestore from "./Actions/useRestore"
import useShare from "./Actions/useShare"
import { ShareFilesModal } from "@/components/Alert/ShareFiles"

type PropsType = {
}

export default function SelectionActions({ }: PropsType) {

	const { descendants, can, folder } = useFileManagerConfig();
	const { selectedKeys } = useFileManagerState();

	const isHidden = useMemo(() => !(selectedKeys == "all" || selectedKeys.size), [selectedKeys])

	const onDownload = useDownload();
	const onMoveToTrash = useMoveToTrash();
	const onDelete = useDelete();
	const onRestore = useRestore();
	const newShareModal = useDisclosure();
	const onShare = useShare({ disclosure: newShareModal });


	return (
		<div className={cn("flex-initial px-2 flex items-center justify-between", { "hidden": isHidden })}>
			<span className="px-3 py-2 text-center text-md text-default-400">

				<If condition={selectedKeys === "all" || Array.from(selectedKeys).length === descendants.length}>
					<Then>All items selected</Then>
					<Else>{Array.from(selectedKeys).length} selected</Else>
				</If>

			</span>

			<ButtonGroup className="gap-x-1" variant="flat">

				<When condition={can.fileActions.includes("Share")}>
					<Button
						startContent={<ShareIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
						onPress={onShare}
						color="default"
					>
						Share
					</Button>
					<ShareFilesModal disclosure={newShareModal} />
				</When>


				<When condition={can.fileActions.includes("Download")}>
					<Button
						startContent={<ArrowDownTrayIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
						onPress={() => onDownload()}
						color="default"
					>
						Download
					</Button>
				</When>


				<When condition={can.fileActions.includes("Move To Trash")}>
					<Button
						startContent={<TrashIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-danger-300" />}
						onPress={() => onMoveToTrash()}
						color="danger"
						className="text-danger-700"
					>
						Move To Trash
					</Button>
				</When>

				<When condition={can.fileActions.includes("Restore")}>
					<Button
						startContent={<RotateCcw className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
						onPress={() => onRestore()}
						color="default"
					>
						Restore
					</Button>
				</When>

				<When condition={can.fileActions.includes("Delete")}>
					<Button
						startContent={<TrashIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-danger-300" />}
						onPress={() => onDelete()}
						color="danger"
						className="text-danger-700"
					>
						Delete
					</Button>
				</When>

			</ButtonGroup>
		</div>
	)
}