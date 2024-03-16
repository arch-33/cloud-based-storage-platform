import { ArrowDownTrayIcon, EllipsisVerticalIcon, FolderOpenIcon, ShareIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { FileDataType } from '@/types';

import useDownloadAction from '../Actions/useDownloadAction';
import useOpenFolderAction from '../Actions/useOpenFolder';
import useMoveToTrashAction from '../Actions/useMoveToTrash';
import { FileActions } from '../FileManager';
import { useId, useMemo } from 'react';
import clsx from 'clsx';


interface IFileContextMenuProps {
    file: FileDataType,
    actions: FileActions[]
}

type ActionItemType = {
    name: FileActions,
    Icon: typeof ArrowDownTrayIcon,
    color: "default" | "danger" | "primary" | "secondary" | "success" | "warning",
    label: (file: FileDataType) => string,
    onPress: () => void
}

export default function FileContextMenu({ file, actions }: IFileContextMenuProps) {

    const id = useId()

    const onMoveToTrash = useMoveToTrashAction(file);
    const onDownload = useDownloadAction(file);
    const onOpenFolder = useOpenFolderAction();

    const ActionsList: ActionItemType[] = [
        {
            name: "Download",
            Icon: ArrowDownTrayIcon,
            color: "default",
            label: file => `Download ${file.is_folder ? "as Zip" : "file"}`,
            onPress: onDownload
        },
        {
            name: "Share",
            Icon: ShareIcon,
            color: "default",
            label: file => `Share`,
            onPress: () => { }
        },
        {
            name: "Restore",
            Icon: ArrowPathIcon,
            color: "default",
            label: file => `Restore`,
            onPress: () => { }
        },
        {
            name: "Move To Trash",
            Icon: TrashIcon,
            color: "danger",
            label: file => `Move to Trash`,
            onPress: onMoveToTrash
        },
        {
            name: "Delete",
            Icon: TrashIcon,
            color: "danger",
            label: () => `Delete`,
            onPress: () => { }
        },
    ]

    const elementsList = useMemo(() => {
        const items = []
        if (file.is_folder) {
            items.push({
                name: "Open",
                Icon: FolderOpenIcon,
                color: "default",
                label: (file: FileDataType) => `Open`,
                onPress: () => onOpenFolder(file)
            })
        }

        ActionsList.forEach((item) => {
            if (actions.includes(item.name))
                items.push({ ...item })
        })
        return items;
    }, [actions, file])

    return (
        <div className="relative flex items-center ">
            <Dropdown className="bg-background border-1 border-default-200" showArrow>
                <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                        <EllipsisVerticalIcon className="text-default-400" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="solid" items={elementsList}>
                    {({ name, Icon, label, color, onPress }) => (
                        <DropdownItem
                            key={id + name}
                            startContent={<Icon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none atext-default-500" />}
                            onPress={onPress}
                            color={color}
                            className={clsx({ "text-danger": color === "danger" })}
                        >
                            {label(file)}
                        </DropdownItem>
                    )}

                    {/* <DropdownItem
                        
                        
                        showDivider={true}
                    >
                        Open
                    </DropdownItem> */}

                </DropdownMenu>
            </Dropdown>
        </div >
    );
}
