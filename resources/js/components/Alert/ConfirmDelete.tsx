import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { ConfirmProps } from "react-confirm-hook";

type PropsType = ConfirmProps & {};

export default function ConfirmDelete({ open, onConfirm, onCancel }: PropsType) {

    return (
        <Modal
            isOpen={open}
            isDismissable={false}
            hideCloseButton
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="p-4">
                            <div className="items-center md:flex">
                                <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 mx-auto border border-gray-300 rounded-full">
                                    <ShieldExclamationIcon className="p-2 text-3xl text-gray-500" />
                                </div>
                                <div className="mt-4 text-center md:mt-0 md:ml-6 md:text-left">
                                    <p className="font-bold"> Deleting files ! </p>
                                    <p className="mt-1 text-sm text-gray-700">
                                        Are you sure you want to delete <strong>selected</strong> elments ?
                                    </p>
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="flat" className="text-sm font-semibold rounded-lg"
                                onPress={()=>{
                                    onCancel()
                                    onClose()
                                }}
                            >
                                Close
                            </Button>
                            <Button color="danger" variant="flat" className="text-sm font-semibold text-red-700 rounded-lg"
                                onPress={() => {
                                    onConfirm();
                                    onClose()
                                }}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
