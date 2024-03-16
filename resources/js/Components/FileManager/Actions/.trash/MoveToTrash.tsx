import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import useMoveToTrashAction from "./callbacks/MoveToTrash";
import { FileDataType } from "@/types";


type PropsType = {
	file?: FileDataType
}

export default function MoveToTrashAction({ }: PropsType) {

	const onPress = useMoveToTrashAction();

	return (
		<Button
			startContent={<TrashIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-danger-300" />}
			onPress={onPress}
			color="danger"
			className="text-danger-700"
		>
			Move To Trash
		</Button>
	)
}

