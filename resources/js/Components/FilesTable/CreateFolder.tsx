import useCurrentFolderStore from "@/Store/currentFolderStore"
import { useForm } from "@inertiajs/react"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"

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

export default function CreateFolder({ disclosure }: PropsType) {
    const { folderId } = useCurrentFolderStore();
    const { data, setData, post, errors, reset } = useForm({ name: '', parent_id: "" })
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setData("parent_id", folderId)
    }, [folderId])


    function submit(e) {
        e.preventDefault()
        disclosure.onClose()

        post(route('folders.create'), {
            preserveScroll: true,
            onSuccess: () => {
                disclosure.onClose()
                toast.success(`The folder "${data.name}" was created successfully`, { position: "top-right", style: { padding: "1rem" } })
                reset(); // reset form
            },
            onError: () => inputRef.current?.focus(),
        })
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
                        <ModalHeader className="flex justify-center py-4 text-x">Create New Folder</ModalHeader>
                        <ModalBody>
                            <Input
                                ref={inputRef}
                                autoFocus
                                label="Folder Name"
                                variant="faded"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                errorMessage={<span className="text-base font-semibold">{errors.name}</span>}
                            />

                        </ModalBody>
                        <ModalFooter className="gap-4">
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit" onSubmit={submit}>
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    )
}