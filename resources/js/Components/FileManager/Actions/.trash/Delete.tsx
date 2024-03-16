import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";


type PropsType = {
	
}

export default function DeleteAction({ }: PropsType) {

	const onPress = () => {
		alert("on delete");
	}

	return (
		<Button
			startContent={<TrashIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none text-danger-300" />}
			onPress={onPress}
			color="danger"
			className="text-danger-700"
		>
			Delete
		</Button>
	)
}

