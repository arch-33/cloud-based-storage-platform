import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { RiFileUploadLine, RiFolderAddLine, RiFolderUploadLine } from "react-icons/ri";
import { FileUp, FolderPlus, FolderUp, Plus } from "lucide-react";
import NewFolderModal from "../modals/newFolderModal";
import UploadFilesModal from "../modals/uploadFilesModal";
import UploadFoldersModal from "../modals/uploadFoldersModal";

type PropsType = {
	currentFolderID: string
}

export default function NewDocumentsDropdown({ currentFolderID }: PropsType) {

	const newFolderDisclosure = useDisclosure();
	const uploadFilesDisclosure = useDisclosure()
	const uploadFoldersDisclosure = useDisclosure()

	const dropDownIconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0 h-6";

	return (
		<>
			<Dropdown
				backdrop="opaque"
				showArrow
				classNames={{
					base: "before:bg-default-200",
					content: "py-2 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
				}}
			>
				<DropdownTrigger>
					<Button
						fullWidth
						size="lg"
						color="default"
						variant="ghost"
						className="relative mx-3 font-sans font-semibold capitalize"
						startContent={<Plus className="absolute left-0 w-6 h-6 ml-4" />}
					>
						New Documents
					</Button>
				</DropdownTrigger>

				<DropdownMenu variant="faded">
					<DropdownSection title="Upload" showDivider>
						<DropdownItem
							className='relative'
							key="upload-file"
							startContent={<FileUp className={dropDownIconClasses} />}
							onPress={() => uploadFilesDisclosure.onOpen()}
							description="Upload one or many files"
						>
							Upload files
						</DropdownItem>

						<DropdownItem
							key="upload-folder"
							startContent={<FolderUp className={dropDownIconClasses} />}
							onPress={() => uploadFoldersDisclosure.onOpen()}
							description="Upload one or many folders"
						>
							Upload folder
						</DropdownItem>
					</DropdownSection>
					<DropdownSection title="Create">
						<DropdownItem
							key="new"
							description="Create a new empty folder"
							startContent={<FolderPlus className={dropDownIconClasses} />}
							onPress={() => newFolderDisclosure.onOpen()}
						>
							New Folder
						</DropdownItem>
					</DropdownSection>

				</DropdownMenu>
			</Dropdown>

			{/* create new folder modal  */}
			<NewFolderModal
				disclosure={newFolderDisclosure}
				currentFolderID={currentFolderID}
			/>
			{/* upload files modal */}
			<UploadFilesModal
				disclosure={uploadFilesDisclosure}
				currentFolderID={currentFolderID}
			/>

			{/* upload folders modal */}
			<UploadFoldersModal
				disclosure={uploadFoldersDisclosure}
				currentFolderID={currentFolderID}
			/>
		</>
	)
}