import useCurrentFolderStore from "@/Store/currentFolderStore";
import { useForm } from "@inertiajs/react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { DropZone } from "./DropZone";
import ListUploadables from "./ListUploadables";
import { RiUploadLine } from "react-icons/ri";

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


    const { data, post, clearErrors, reset } = useForm<{ files: File[], relative_paths: string[], parent_id: string }>({
        files: [],
        relative_paths: [],
        parent_id: ""
    });


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

                                <DropZone
                                    selectedFiles={{ get: selectedFiles, set: setSelectedFiles }}
                                    uploadType="folders"
                                />

                            </div>
                            <ListUploadables
                                selectedFiles={{ get: selectedFiles, set: setSelectedFiles }}
                            />
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