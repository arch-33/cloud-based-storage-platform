import { AnimatePresence, motion } from "framer-motion";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";

import { DropFilesZone } from "./FileUpload/DropFilesZone";
import { RiUploadLine } from "react-icons/ri";
import useCurrentFolderStore from "@/Store/currentFolderStore";
import { useForm } from "@inertiajs/react";
import FilesListItem from "./FileUpload/FilesListItem";
import { useDropzone } from "react-dropzone";

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
    const folderId = useCurrentFolderStore.use.folderId();
    const [selectedFiles, setSelectedFiles] = useState([])

    const { data, setData, post, errors, progress, reset } = useForm({
        files: [],
        parent_id: ""
    });

    const submit = ev => {
        ev.preventDefault();

        data.files = selectedFiles;
        data.parent_id = folderId;

        post(route('files.upload'), {

            onSuccess: () => {
                alert("showSuccessNotification")
                //showSuccessNotification(`${files.length} files have been uploaded`)
            },
            onError: errors => {
                let message = '';

                if (Object.keys(errors).length > 0) {
                    message = errors[Object.keys(errors)[0]]
                } else {
                    message = 'Error during file upload. Please try again later.'
                }
                alert(message)
                //showErrorDialog(message)
            },
            onFinish: () => {
                // fileUploadForm.clearErrors()
                reset();
                setSelectedFiles([])
            }
        })

    };
    const onFileDelete = (index: number) => {
        setSelectedFiles((files) => files.filter((item, i) => i !== index))
        //setSelectedFiles((files) => files.filter((item, i ) => i !== index));
        // setFilePercentages((percentages) => percentages.filter((item, i ) => i !== index))
    };
    //@ts-ignore-next-line
    function uploadFiles(files) {
        console.log(files);

        //data.parent_id = folderId;
        //data.files = files;

        //@ts-ignore-next-line
        //data.relative_paths = [...files].map(f => f.webkitRelativePath);

        // post(route('files.upload'), {

        //     onSuccess: () => {
        //         alert("showSuccessNotification")
        //         // showSuccessNotification(`${files.length} files have been uploaded`)
        //     },
        //     onError: errors => {
        //         let message = '';

        //         if (Object.keys(errors).length > 0) {
        //             message = errors[Object.keys(errors)[0]]
        //         } else {
        //             message = 'Error during file upload. Please try again later.'
        //         }
        //         alert(message)
        //         // showErrorDialog(message)
        //     },
        //     onFinish: () => {
        //         // fileUploadForm.clearErrors()
        //         // fileUploadForm.reset();
        //     }
        // })
    }

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
                            <div className="w-full h-full col-span-12 pt-1 pb-10 md:col-span-6">

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