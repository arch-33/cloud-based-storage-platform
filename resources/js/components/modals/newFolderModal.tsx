import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import { FormEvent, useRef } from "react"
import toast from "react-hot-toast"
import { useForm } from "@inertiajs/react"
import { FolderPlus } from "lucide-react"

type PropsType = {
	disclosure: {
		isOpen: boolean;
		onClose: () => void;
		onOpenChange: () => void;
	},
	currentFolderID: string
}

export default function NewFolderModal({ disclosure, currentFolderID }: PropsType) {

	const { data, setData, post, errors, reset, setError, clearErrors } = useForm<{ name: string, parent_id: string }>({ name: "", parent_id: "" })

	const inputRef = useRef<HTMLInputElement>(null)


	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		data.parent_id = currentFolderID;

		if (!data.name.trim().length) {
			setError("name", "folder name mustn't be empty");
			return;
		}

		post(route('my-drive.folders.new'), {
			preserveScroll: true,
			onSuccess: () => {
				disclosure.onClose()
				toast.success(`The folder "${data.name}" was created successfully`,
					{ position: "top-right", style: { padding: "1rem" } }
				);
				clearErrors();
				reset(); // reset form
			},
			onError: (errors) => {
				let message = '';
				if (Object.keys(errors).length > 0) {
					message = errors[Object.keys(errors)[0]]
				} else {
					message = 'Error during creating folder. Please try again later.'
				}
				setError("name", message);
				// toast.error(message, { position: "top-right", style: { padding: "1rem" } });
				inputRef.current?.focus()
			},
		})
	}


	return (
		<Modal
			isOpen={disclosure.isOpen}
			onOpenChange={disclosure.onOpenChange}
			placement="top-center"
			isDismissable={false}
			backdrop="opaque"
			onClose={() => clearErrors()}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={onSubmit}>
						<ModalHeader className="flex justify-center py-4 text-xl">Create New Folder</ModalHeader>
						<ModalBody>
							<Input
								ref={inputRef}
								label="Folder Name"
								labelPlacement="outside"
								variant="faded"
								startContent={<FolderPlus className="flex-shrink-0 mr-2 text-2xl pointer-events-none text-default-400" />}
								autoFocus
								isRequired
								value={data.name}
								onChange={e => setData('name', e.target.value)}
								errorMessage={<span className="text-base font-semibold">{errors.name}</span>}
							/>
						</ModalBody>
						<ModalFooter className="gap-4">
							<Button color="danger" variant="ghost" onPress={onClose}>
								Cancel
							</Button>
							<Button color="primary" className="flex-1" type="submit" >
								Create
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}