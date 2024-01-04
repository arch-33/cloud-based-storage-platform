import { AnimatePresence, motion } from "framer-motion";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { CloudArrowDownIcon, CloudArrowUpIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FiCloud, FiCloudDrizzle, FiCloudLightning, FiUploadCloud } from "react-icons/fi";
import { RiFileUploadLine, RiFolderUploadLine, RiUploadCloud2Fill, RiUploadCloud2Line, RiUploadCloudFill, RiUploadLine } from "react-icons/ri";

import clsx from "clsx";
import { useForm } from "@inertiajs/react";

type PropsType = {
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onOpenChange: () => void;
        isControlled: boolean;
        getButtonProps: (props?: any) => any;
        getDisclosureProps: (props?: any) => any;
    }
}



export default function UploadFilesModal({ disclosure }: PropsType) {


    const [selectedFiles, setSelectedFiles] = useState([])
    const { data, setData, post, errors, reset } = useForm({ file: [], parent_id: "" })
    const submit = ev => {
        ev.preventDefault();
        post('/upload');
    };
    const onFileDelete = (index: number) => {
        setSelectedFiles((files) => files.filter((item, i) => i !== index))
        //setSelectedFiles((files) => files.filter((item, i ) => i !== index));
        // setFilePercentages((percentages) => percentages.filter((item, i ) => i !== index))
    };
    /* function uploadFiles(files) {
        console.log(files);
    
        fileUploadForm.parent_id = page.props.folder.id
        fileUploadForm.files = files
        fileUploadForm.relative_paths = [...files].map(f => f.webkitRelativePath);
    
        fileUploadForm.post(route('file.store'), {
            onSuccess: () => {
                showSuccessNotification(`${files.length} files have been uploaded`)
            },
            onError: errors => {
                let message = '';
    
                if (Object.keys(errors).length > 0) {
                    message = errors[Object.keys(errors)[0]]
                } else {
                    message = 'Error during file upload. Please try again later.'
                }
    
                showErrorDialog(message)
            },
            onFinish: () => {
                fileUploadForm.clearErrors()
                fileUploadForm.reset();
            }
        })
    } */


    return (
        <Modal
            isOpen={disclosure.isOpen}
            onOpenChange={disclosure.onOpenChange}
            placement="top-center"
            isDismissable={false}
            backdrop="opaque"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={submit}>
                        <ModalHeader className="flex justify-center py-4 text-xl">Upload Files</ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-center w-full">
                                <DropFilesZone
                                    selectedFiles={{ get: selectedFiles, set: setSelectedFiles }}
                                />
                            </div>

                            {/* list uploadables */}
                            <div className="w-full h-full col-span-12 pt-1 pb-10 md:col-span-6">

                                <span className="flex justify-between mb-3">
                                    <h3 className="text-lg font-semibold">selected Files</h3>
                                    {
                                        selectedFiles.length > 0 &&
                                        <button className="text-xs underline" onClick={() => {
                                            setSelectedFiles([]);
                                        }}>
                                            Remove all
                                        </button>
                                    }
                                </span>

                                {
                                    selectedFiles.length > 0 &&
                                    <div className="overflow-y-auto max-h-[23rem] pr-1">
                                        <AnimatePresence >
                                            {selectedFiles.map((file: File, i) => (
                                                <motion.div
                                                    // @ts-ignore
                                                    key={"file.id" + i}
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ opacity: { duration: 0.2 }, width: { duration: 0.4 }, }}>
                                                    {/* {file.name} */}
                                                    <FileItem
                                                        file={file}
                                                        onFileDelete={() => onFileDelete(i)}
                                                    />
                                                </motion.div>

                                            ))}
                                        </AnimatePresence>
                                    </div>
                                }</div>

                        </ModalBody>
                        <ModalFooter className="gap-6">
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" onSubmit={submit} startContent={<RiUploadLine className="w-5 h-5" />}>
                                Upload
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}

type DropFilesZonePropsType = {
    selectedFiles: { get: any[], set: (value: any) => void },
}

function DropFilesZone({ selectedFiles }: DropFilesZonePropsType) {
    const [isDragOver, setIsDragOver] = useState(false);

    const onDragOver = (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault();
        setIsDragOver(true);
    }

    const onDragLeave = (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault()
        setIsDragOver(false);
    }

    const handleDrop = (ev: DragEvent<HTMLLabelElement>) => {
        ev.preventDefault()
        setIsDragOver(false);
        const files = ev.dataTransfer.files
        if (!files.length) {
            return
        }
    }

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        if (ev.target.files?.length) {
            selectedFiles.set([...ev.target.files])
        }
    }


    return (
        <label
            htmlFor="dropzone-file"
            className={clsx("flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 border-2 border-gray-300 border-dashed",
                { "border-3 border-gray-600": isDragOver })}

            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click</span> or <span className="font-semibold">drag & drop</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">your files to upload </p>
            </div>
            <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={onChange}
            />
        </label>
    )
}

function FileItem({ file, onFileDelete }: { file: File, onFileDelete: () => void }) {
    return (
        <div
            className={`my-3 py-2 px-3 bg-zinc-300/20 border border-zinc-400 rounded flex justify-between items-center`} >

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