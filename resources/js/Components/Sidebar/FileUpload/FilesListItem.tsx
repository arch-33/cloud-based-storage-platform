import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";


type PropsType = {
    file: File,
    onFileDelete: () => void
}

export default function FilesListItem({ file, onFileDelete }: PropsType) {

    return (
    <div className={`my-3 py-2 px-3 bg-zinc-300/20 border border-zinc-400 rounded flex justify-between items-center`} >
        <div className="flex items-center gap-2 w-[90%]">
            <DocumentIcon className="w-6 h-6" />
            <div className="w-[86%]">
                <span className="flex gap-x-2">
                    <p className="max-w-[80%] truncate text-zinc-700 dark:text-zinc-50">{file.name}</p>
                    <span className="text-zinc-500">({file.size})</span>
                </span>
            </div>
        </div>

        <Button onPress={onFileDelete} isIconOnly color="danger" variant="light">
            <XMarkIcon className="w-6 h-6" />
        </Button>

    </div>
    )
}