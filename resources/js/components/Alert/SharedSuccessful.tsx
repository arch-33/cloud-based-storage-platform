import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, Snippet } from "@nextui-org/react";
import { BadgeCheck, CheckCheck, Clipboard, LinkIcon } from "lucide-react";

import { ConfirmProps } from "react-confirm-hook";

type PropsType = ConfirmProps & {
	file_url: string
};

export default function SharedSuccessfulModal({ open, onConfirm, onCancel, file_url }: PropsType) {

	return (
		<Modal isOpen={open} isDismissable={false} hideCloseButton className="bg-white dark:bg-gray-800 max-w-[35rem]">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalBody className="">
							<div className="items-center justify-center gap-4 py-4 md:flex">
								<div className="flex items-center justify-center w-20 h-20 border rounded-full border-success">
									<BadgeCheck className="w-16 h-16 p-2 text-success" />
								</div>
								<p className="text-xl font-bold text-gray-900 dark:text-white"> Files Shared Successfully!
								</p>
							</div>

							<p className="text-gray-900 ps-4 dark:text-white">Copy the link :</p>
							<Snippet
								variant="bordered"
								symbol={""}
								classNames={{
									copyButton: "h-10 w-10"
								}}
								copyButtonProps={{
									variant: "faded"
								}}
								copyIcon={<Clipboard />}
								checkIcon={<CheckCheck />}
								size="lg"
							>
								{file_url}
							</Snippet>
						</ModalBody>
						<ModalFooter>
							<Button color="default" variant="solid" className="text-sm font-semibold rounded-lg"
								onPress={() => {
									onCancel()
									onClose()
								}}
							>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}
