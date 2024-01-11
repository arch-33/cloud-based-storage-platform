import { AnimatePresence, motion } from "framer-motion";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";

import { FiUploadCloud } from "react-icons/fi";
import FilesListItem from "./FileUpload/FilesListItem";
import { RiUploadLine } from "react-icons/ri";
import clsx from "clsx";
import toast from "react-hot-toast";
import useCurrentFolderStore from "@/Store/currentFolderStore";
import { useForm } from "@inertiajs/react";

type PropsType = {
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onOpenChange: () => void;
    }
}


export default function UploadFoldersModal({ disclosure }: PropsType) {
    const folderId = useCurrentFolderStore.use.folderId();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isDragOver, setIsDragOver] = useState(false);

    const { data, post, clearErrors, reset } = useForm<{ files: File[], relative_paths: string[], parent_id: string }>({
        files: [],
        relative_paths: [],
        parent_id: ""
    });


    const DND = {
        onDragOver: (ev: DragEvent<HTMLLabelElement>) => {
            ev.preventDefault();
            setIsDragOver(true);
        },

        onDragLeave: (ev: DragEvent<HTMLLabelElement>) => {
            ev.preventDefault();
            setIsDragOver(false);
        },

        onDrop: (ev: DragEvent<HTMLLabelElement>) => {
            ev.preventDefault();
            setIsDragOver(false);
            const files = ev.dataTransfer.files;
            if (files.length) {
                setSelectedFiles([...files]);
            }

        },
    }

    const onFileDelete = (index: number) => {
        setSelectedFiles((files) => files.filter((item, i) => i !== index))
    };

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const files = ev.target.files;
        if (files?.length) {
            setSelectedFiles([...files]);
        }
    };

    const submit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();

        data.parent_id = folderId
        data.files = [...selectedFiles]
        data.relative_paths = [...selectedFiles].map(f => f.webkitRelativePath);

        post(route('folders.upload'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success(`${data.files.length} files have been uploaded`,
                    { position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } }
                );
                disclosure.onClose();
                clearErrors();
                reset();
            },
            onError: errors => {
                let message = '';

                if (Object.keys(errors).length > 0) {
                    message = errors[Object.keys(errors)[0]]
                } else {
                    message = 'Error during file upload. Please try again later.'
                }
                toast.error(message, { position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } });
            },
            onFinish: () => {
                clearErrors();
                reset();
                setSelectedFiles([])
            }
        })
    }

    return (
        <Modal
            isOpen={disclosure.isOpen}
            onOpenChange={disclosure.onOpenChange}
            isDismissable={false}
            placement="top-center"
            backdrop="opaque"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={submit}>
                        <ModalHeader className="flex justify-center py-4 text-xl"> Upload Folders </ModalHeader>
                        <ModalBody>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-folders"
                                    className={clsx("flex flex-col items-center justify-center w-full h-32 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:hover:bg-bray-800 hover:bg-gray-100 border-gray-300 border-dashed dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 border-2 ",
                                        { "border-3 border-gray-600": isDragOver })}
                                    {...DND}
                                >

                                    <input type="file"
                                        className="hidden"
                                        // multiple
                                        id="dropzone-folders"
                                        onChange={onChange}
                                        // @ts-ignore
                                        directory=""
                                        // @ts-ignore
                                        mozdirectory=""
                                        // @ts-ignore
                                        webkitdirectory=""
                                    />
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FiUploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click</span> or <span className="font-semibold">drag & drop</span>
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">your files to upload </p>
                                    </div>

                                </label>
                            </div>

                            {/* list uploadables */}
                            <div className="w-full h-full col-span-12 pt-1 pb-5 md:col-span-6">

                                <span className="flex justify-between mb-3">
                                    <h3 className="text-lg font-semibold">selected Files</h3>

                                    {selectedFiles.length > 0 && (
                                        <button className="text-xs underline" onClick={() => setSelectedFiles([])}>
                                            Remove all
                                        </button>
                                    )}
                                </span>

                                {selectedFiles.length > 0 && (
                                    <div className="overflow-y-auto max-h-[20rem] pr-1">
                                        <AnimatePresence >
                                            {selectedFiles.map((file: File, i) => (
                                                <motion.div
                                                    key={"file.id-6" + i}
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ opacity: { duration: 0.1 }, width: { duration: 0.2 }, }}>
                                                    <FilesListItem
                                                        file={file}
                                                        onFileDelete={() => onFileDelete(i)}
                                                    />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}

                            </div>
                        </ModalBody>
                        <ModalFooter className="gap-6">
                            <Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
                            <Button
                                color="primary"
                                type="submit"
                                onSubmit={submit}
                                startContent={<RiUploadLine className="w-5 h-5" />}
                            >
                                Upload
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )

}