import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { RiFileUploadLine, RiFolderAddLine, RiFolderUploadLine } from "react-icons/ri";

import CreateFolder from "./CreateFolder";
import { PlusIcon } from "@heroicons/react/24/outline";
import UploadFile from "./UploadFile";

export default function NewDropdown({ }) {

    const disclosure = useDisclosure();

    const dropDownIconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <>
            <Dropdown
                backdrop="opaque"
                showArrow
                classNames={{
                    base: "before:bg-default-200", // change arrow background
                    content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                }}
            >
                <DropdownTrigger>
                    <Button
                        fullWidth
                        size="md"
                        color="primary"
                        variant="shadow"
                        className="relative font-sans font-semibold capitalize"
                        startContent={<PlusIcon className="absolute left-0 w-6 h-6 ml-4" />}
                    >
                        New
                    </Button>
                </DropdownTrigger>

                <DropdownMenu variant="faded">
                    <DropdownItem key="new" showDivider startContent={<RiFolderAddLine className={dropDownIconClasses} />} onPress={() => disclosure.onOpen()}>
                        New Folder
                    </DropdownItem>
                    <DropdownItem className='relative' key="upload-file" startContent={<RiFileUploadLine className={dropDownIconClasses} />}>
                        Upload file
                        <UploadFile/>
                    </DropdownItem>
                    <DropdownItem key="upload-folder" startContent={<RiFolderUploadLine className={dropDownIconClasses} />}>
                        Upload folder
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {/* create new folder modal  */}
            <CreateFolder
                disclosure={disclosure}
            />
        </>
    )
}