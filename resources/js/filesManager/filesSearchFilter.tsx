import { Input } from "@nextui-org/react"
import { Search } from "lucide-react"
import { useFileManagerState } from "./fileManagerContext"

type PropsType = {
}

export default function FilesSearchFilter({ }: PropsType) {

	const { searchFilterValue, setSearchFilterValue } = useFileManagerState();
	return (
		<div>
			<Input
				classNames={{
					base: "h-10 min-w-full",
					mainWrapper: "h-full",
					input: "text-small",
					inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
				}}
				placeholder="Search for files and directories .."
				size="sm"
				type="search"
				fullWidth
				startContent={<Search className={"w-6 h-6"} />}
				value={searchFilterValue}
				onChange={e => setSearchFilterValue(e.target.value)}
			/>
		</div>
	)
}