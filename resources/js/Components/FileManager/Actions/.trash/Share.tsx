import { ShareIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import { useFileManagerContext } from "../../FileManagerContext"

type PropsType = {}

export default function ShareAction({ }: PropsType) {

	const {selectedKeys, curentFolder} = useFileManagerContext();
	const onPress = () => {
		alert("on Share "+"-- "+ curentFolder?.uuid);
	}

	return (
		<Button
			startContent={<ShareIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
			onPress={onPress}
			color="default"
		>
			Share
		</Button>
	)
}