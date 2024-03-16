import { FormEvent, useState } from "react"
import { useFileManagerContext } from "../../FileManagerContext";
import toast from "react-hot-toast";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { RiUploadLine } from "react-icons/ri";
import { DropZone } from "./DropZone";
import ListUploadables from "./ListUploadables";

type PropsType = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
	},
	uploadType: "Files" | "Folders",
	preSubmit: (data: { files: File[], parent_id: string }) => void
	uploadForm: any
}

export default function UploadModalBase({ disclosure, uploadType, preSubmit, uploadForm }: PropsType) {

	const { curentFolder } = useFileManagerContext();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


	const submit = (ev: FormEvent) => {
		ev.preventDefault();

		preSubmit({ files: selectedFiles, parent_id: curentFolder?.uuid || "" })

		uploadForm.post(route('files.upload'), {
			forceFormData: true,
			onSuccess: () => {
				toast.success(
					`${uploadForm.data.files.length} files have been uploaded`,
					{ position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } }
				);
				disclosure.onClose();
				uploadForm.clearErrors();
				uploadForm.reset();
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
				uploadForm.clearErrors();
				uploadForm.reset();
				setSelectedFiles([])
			}
		})
	}


	return (
		<Modal
			isOpen={disclosure.isOpen}
			onOpenChange={disclosure.onOpenChange}
			placement="top-center"
			backdrop="opaque"
			isDismissable={false}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={submit}>
						<ModalHeader className="flex justify-center py-4 text-xl">
							Upload {uploadType}
						</ModalHeader>

						<ModalBody>
							<div className="flex items-center justify-center w-full">

								{/* ------------------------- Drop Zone  upload from ------------------------- */}
								<DropZone
									selectedFiles={{ get: selectedFiles, set: setSelectedFiles }}
									uploadType={uploadType}
								/>
							</div>

							{/* list uploadables */}
							<ListUploadables
								selectedFiles={{ get: selectedFiles, set: setSelectedFiles }}
								uploadType={uploadType}
							/>

						</ModalBody>
						<ModalFooter className="gap-6">
							<Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
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


