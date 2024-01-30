import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useId } from "react";
import prettyBytes from 'pretty-bytes';


type PropsType = {
    selectedFiles: {
        get: any[],
        set: (value: any) => void
    },
}


export default function ListUploadables({ selectedFiles }: PropsType) {
    const formId = useId();

    const removeAll = () => selectedFiles.set([]);
    const removeOne = (index: number) => () => {
        selectedFiles.set(selectedFiles.get.filter((item, i) => i !== index))
    };



    return (
        <div className="w-full h-full col-span-12 pt-1 pb-5 md:col-span-6">
            <h3 className="text-lg font-semibold">selected Files</h3>
            {selectedFiles.get.length > 0 && (
                <button className="text-xs underline" onClick={removeAll}>
                    Remove all
                </button>
            )}

            {selectedFiles.get.length > 0 && (
                <div className="overflow-y-auto max-h-[23rem] pr-1">

                    {selectedFiles.get.map((file: File, i) => (
                        <div className={`my-3 py-2 px-3 bg-zinc-300/20 border border-zinc-400 rounded flex justify-between items-center`} >
                            <div className="flex items-center gap-2 w-[90%]">
                                <DocumentIcon className="w-6 h-6" />

                                <div className="w-[86%]">
                                    <span className="flex gap-x-2">
                                        <p className="max-w-[80%] truncate text-zinc-700 dark:text-zinc-50">
                                            {file.name}
                                        </p>
                                        <span className="text-zinc-500">({prettyBytes(file.size)})</span>
                                    </span>
                                </div>
                            </div>

                            <Button onPress={removeOne(i)} isIconOnly color="danger" variant="light">
                                <XMarkIcon className="w-6 h-6" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}
