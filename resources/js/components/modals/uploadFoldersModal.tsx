import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, CardHeader, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FormEvent, useCallback, useMemo } from "react";
import { CircleX, FolderOpen } from "lucide-react";
import toast from "react-hot-toast";
import { countBy, filter } from 'lodash';
import DropZone from "@/components/ui/dropZone";
import { Upload } from "lucide-react";


type PropsType = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
	},
	currentFolderID: string
}

type Inputs = { files: File[], relative_paths: string[], parent_id: string }

export default function UploadFoldersModal({ disclosure, currentFolderID }: PropsType) {

	const uploadForm = useForm<Inputs>({ files: [], relative_paths: [], parent_id: currentFolderID });

	const removeAll = useCallback(() => uploadForm.setData("files", []), [])

	const removeFolder = useCallback((name: string) => () => {
		const tmp = filter(uploadForm.data.files, function ({ webkitRelativePath }: File) {
			return webkitRelativePath.substring(0, webkitRelativePath.lastIndexOf("/")) !== name;
		});
		uploadForm.setData("files", [...tmp])
	}, [uploadForm.data.files]);

	const foldersList = useMemo(() => {
		const tmp = countBy(uploadForm.data.files,
			({ webkitRelativePath }: File) => webkitRelativePath.substring(0, webkitRelativePath.lastIndexOf("/"))
		)
		return Object.entries(tmp).map(([key, value]) => ({ folder: key, children: value }));
	}, [uploadForm.data.files])


	const submit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		
		uploadForm.data.relative_paths = uploadForm.data.files.map(f => f.webkitRelativePath)
		
		uploadForm.post(route('my-drive.folders.upload'), {
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
					<form onSubmit={submit}>
						<ModalHeader className="flex justify-center py-4 text-xl"> Upload Folders</ModalHeader>

						<ModalBody className="flex items-center justify-center w-full">
							<DropZone
								uploadType="folders"
								setFiles={(files: File[]) => uploadForm.setData("files", files)}
							/>

							<Card className="w-full">
								<CardHeader className="flex justify-between gap-3">
									<p className="font-semibold text-md">Selected Folders</p>
									<Button color="danger" variant="light" className="text-sm" onPress={removeAll}>Clear Selected</Button>
								</CardHeader>
								<Divider />
								<CardBody>
									<Listbox variant="flat" aria-label="" className="overflow-x-hidden overflow-y-auto max-h-[23rem]">
										{foldersList.map(({ folder, children }) => (
											<ListboxItem
												key={"file" + folder}
												title={folder.slice(0, 30)}
												description={`${children} elements`}
												startContent={<FolderOpen className="w-6 h-6" />}
												endContent={
													<Button onPress={removeFolder(folder)} isIconOnly color="danger" variant="light">
														<CircleX className="w-6 h-6" />
													</Button>
												}
											/>
										))}

									</Listbox>
								</CardBody>
							</Card>
						</ModalBody>
						<ModalFooter className="gap-6">
							<Button color="danger" variant="flat" onPress={onClose}>Cancel</Button>
							<Button color="primary" type="submit" startContent={<Upload className="w-5 h-5" />}>
								Upload
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}
