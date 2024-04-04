import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { RiUploadLine } from "react-icons/ri";
import DropZone from "../ui/dropZone";
import { FormEvent, useCallback } from "react";
import prettyBytes from "pretty-bytes";
import { CircleX, File } from "lucide-react";
import toast from "react-hot-toast";

type PropsType = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
	},
	currentFolderID: string
}

export default function UploadFilesModal({ disclosure, currentFolderID }: PropsType) {

	const uploadForm = useForm<{ files: File[], parent_id: string }>({
		files: [], parent_id: ""
	});

	const removeAll = useCallback(() => uploadForm.setData("files", []), [])

	const removeByName = useCallback((name: string) => () => {
		const tmp = uploadForm.data.files.filter((item) => item.name !== name)
		uploadForm.setData("files", [...tmp])
	}, [uploadForm.data.files])

	const submit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		
		uploadForm.setData("parent_id", currentFolderID);

		
		uploadForm.post(route('my-drive.files.upload'), {
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
					<form>
						<ModalHeader className="flex justify-center py-4 text-xl"> Upload </ModalHeader>

						<ModalBody className="flex items-center justify-center w-full">
							<DropZone
								uploadType="files"
								setFiles={(files: File[]) => uploadForm.setData("files", files)}
							/>

							<Card className="w-full">
								<CardHeader className="flex justify-between gap-3">
									<p className="font-semibold text-md">Selected Files</p>
									<Button color="danger" variant="light" className="text-sm" onPress={removeAll}>Clear Selected</Button>
								</CardHeader>
								<Divider />
								<CardBody>
									<Listbox variant="flat" aria-label="" className="overflow-x-hidden overflow-y-auto max-h-[23rem]">

										{uploadForm.data.files.map((item: File, i) =>
											<ListboxItem
												key={"file" + item.name + item.size}
												title={item.name.slice(0, 30)}
												description={prettyBytes(item.size)}
												startContent={<File className="w-6 h-6" />}
												endContent={
													<Button onPress={removeByName(item.name)} isIconOnly color="danger" variant="light">
														<CircleX className="w-6 h-6" />
													</Button>
												}
											/>)
										}
									</Listbox>
								</CardBody>
							</Card>
						</ModalBody>
						<ModalFooter className="gap-6">
							<Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
							<Button color="primary" type="submit" startContent={<RiUploadLine className="w-5 h-5" />} onPress={submit}>
								Upload
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}
