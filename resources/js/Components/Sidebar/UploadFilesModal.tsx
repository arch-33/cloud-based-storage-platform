import { AnimatePresence, motion } from "framer-motion";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

import { DropFilesZone } from "./FileUpload/DropFilesZone";
import FilesListItem from "./FileUpload/FilesListItem";
import { RiUploadLine } from "react-icons/ri";
import toast from "react-hot-toast";
import useCurrentFolderStore from "@/Store/currentFolderStore";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

type PropsType = {
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onOpenChange: () => void;
    }
}


export default function UploadFilesModal({ disclosure }: PropsType) {
    const folderId = useCurrentFolderStore.use.folderId();
    const [selectedFiles, setSelectedFiles] = useState([])

    const { data, setData, post, errors, clearErrors, progress, reset } = useForm({
        files: [],
        parent_id: ""
    });

    const submit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();

        data.files = selectedFiles;
        data.parent_id = folderId;

        post(route('files.upload'), {

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

    };
    const onFileDelete = (index: number) => {
        setSelectedFiles((files) => files.filter((item, i) => i !== index))
    };

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
                                <DropFilesZone selectedFiles={{ get: selectedFiles, set: setSelectedFiles }} />
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
                                    <div className="overflow-y-auto max-h-[23rem] pr-1">
                                        <AnimatePresence >
                                            {selectedFiles.map((file: File, i) => (
                                                <motion.div
                                                    key={"file.id" + i}
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ opacity: { duration: 0.2 }, width: { duration: 0.4 }, }}>
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