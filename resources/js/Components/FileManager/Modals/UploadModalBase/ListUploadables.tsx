import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useCallback, useId, useMemo } from "react";
import prettyBytes from 'pretty-bytes';
import Show from "@/helpers/Show";


type PropsType = {
    selectedFiles: {
        get: any[],
        set: (value: any) => void
    },
    uploadType: "Files" | "Folders"
}


export default function ListUploadables({ selectedFiles, uploadType }: PropsType) {

    const formId = useId();

    const removeAll = useCallback(() => selectedFiles.set([]), [selectedFiles])


    const removeOne = useCallback((index: number) => () => {
        selectedFiles.set(selectedFiles.get.filter((item, i) => i !== index))
    }, [selectedFiles])

    return (
        <div className="w-full h-full col-span-12 pt-1 pb-5 md:col-span-6">

            <div className="flex justify-between">
                <h3 className="text-lg font-semibold">selected Files</h3>

                <Show><Show.When isTrue={selectedFiles.get.length > 0}>
                    <Button color="danger" variant="bordered" className="text-xs" onClick={removeAll}>
                        Remove all
                    </Button>
                </Show.When></Show>

            </div>


            <Show><Show.When isTrue={selectedFiles.get.length > 0}>
                <div className="overflow-y-auto max-h-[23rem] pr-1">

                    {selectedFiles.get.map((file: File, i) => (
                        <RenderItem
                            key={formId + "-" + file.name + "-" + i}
                            file={file}
                            uploadType={uploadType}
                            onRemove={removeOne(i)}
                        />
                    ))}

                </div>
            </Show.When></Show>
        </div>
    )
}

type RenderItemPropsType = {
    file: File,
    uploadType: "Files" | "Folders",
    onRemove: () => void
}
function RenderItem({ file, uploadType, onRemove }: RenderItemPropsType) {

    const relative_path = useMemo(() => uploadType === "Folders" ? file.webkitRelativePath : "", [file, uploadType]);

    return (
        <div className="flex items-center justify-between px-3 py-2 my-3 border rounded bg-zinc-300/20 border-zinc-400">
            <div className="flex items-center gap-2 w-[90%]">

                <DocumentIcon className="w-6 h-6" />

                <div className="w-[86%]">
                    <span className="flex gap-x-2">
                        <p className="max-w-[80%] truncate text-zinc-700 dark:text-zinc-50">
                            {file.name}
                        </p>

                        <span className="text-zinc-500">({prettyBytes(file.size)})</span>
                    </span>

                    <Show><Show.When isTrue={uploadType == "Folders"}>
                        <p className="max-w-[80%] truncate text-zinc-700 dark:text-zinc-50 text-xs font-semibold px-1">
                            {relative_path}
                        </p>
                    </Show.When></Show>
                </div>
            </div>

            <Button onPress={onRemove} isIconOnly color="danger" variant="light">
                <XMarkIcon className="w-6 h-6" />
            </Button>
        </div>
    )
}