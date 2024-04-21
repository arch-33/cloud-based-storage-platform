import { Head } from "@inertiajs/react";
import { FileDataType, PageProps } from "@/types";
import { Home, TrashIcon } from "lucide-react";
import FileManager from "@/filesManager";
import { FileManagerProvider } from "@/filesManager/fileManagerContext";
import { useEffect } from "react";

type PropsType = PageProps & {
	elements: any;
}

export default function SharedByMe({ elements }: PropsType) {
	return (
		<div className="">
			<pre>
				{JSON.stringify(elements.data)}
			</pre>
		</div>
	)
}