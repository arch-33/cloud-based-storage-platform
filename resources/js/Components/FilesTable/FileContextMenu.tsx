import { ArrowDownTrayIcon, DocumentMagnifyingGlassIcon, EllipsisVerticalIcon, FolderOpenIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

interface IFileContextMenuProps {
    file: any
}

export default function FileContextMenu({ file }: IFileContextMenuProps) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0 w-6 h-6";

    return (
        <div className="relative flex items-center ">
            <Dropdown className="bg-background border-1 border-default-200" showArrow>
                <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                        <EllipsisVerticalIcon className="text-default-400" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded">
                    <DropdownSection showDivider>
                        <DropdownItem
                            startContent={
                                file.is_folder ? <FolderOpenIcon className={iconClasses} /> : <DocumentMagnifyingGlassIcon className={iconClasses} />
                            }>
                            View
                        </DropdownItem>
                        <DropdownItem startContent={<ArrowDownTrayIcon className={iconClasses} />}>
                            Download
                        </DropdownItem>
                        <DropdownItem startContent={<ShareIcon className={iconClasses} />}>
                            Share
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection >
                        <DropdownItem startContent={<TrashIcon className={iconClasses} />} className="text-danger" color='danger'>
                            Move to Trash
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
