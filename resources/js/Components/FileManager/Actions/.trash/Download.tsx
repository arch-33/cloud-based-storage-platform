import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

type PropsType = {}



export default function DownloadAction({ }: PropsType) {
	
	const onPress = () => {
		alert("on Download");
	}

	return (
		<Button
			startContent={<ArrowDownTrayIcon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none" />}
			onPress={onPress} color="default">
			Download
		</Button>
	)
}