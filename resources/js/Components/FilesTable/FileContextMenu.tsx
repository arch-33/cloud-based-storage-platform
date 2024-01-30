import { ArrowDownTrayIcon, DocumentMagnifyingGlassIcon, EllipsisVerticalIcon, FolderOpenIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';

import useCurrentFolderStore from '@/Store/currentFolderStore';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { saveAs } from "file-saver";
import { openFolderRequest } from '@/helpers';

interface IFileContextMenuProps {
    file: any,
}

export default function FileContextMenu({ file }: IFileContextMenuProps) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0 w-6 h-6";
    const folderId = useCurrentFolderStore.use.folderId()

    const deleteForm = useForm({
    })
    const downloadForm = useForm<{
        selected_all: boolean,
        selected_ids: string[],
        parent_id: string
    }>({
        selected_all: false,
        selected_ids: [],
        parent_id: ""
    })
    const page = usePage()

    const onDownload = () => {
        const data = {
            parent_id: folderId,
            selected_all: false,
            selected_ids: [file.uuid],
        }
        axios.post(route("files.download"), data, { responseType: "blob" }).then(({ data, headers }) => {
            saveAs(data, headers.get("filename"));
        }).catch(err => console.log(err))



        /* 
        console.log(page);
        httpPost(route("files.download"), {
            parent_id: folderId,
            selected_all: false,
            selected_ids: [file.uuid],
        })
    
        fetch(route('files.download', {
            parent_id: folderId,
            selected_all: false,
            selected_ids: [file.uuid],
        }))
            .then((res) => res.blob())
            .then((blob) => {
                // const a = document.createElement('a');
                // a.download = "res.filename";
                // a.href = res.url;
                // a.click();
    
                // const file = window.URL.createObjectURL(blob)
                // window.location.assign(file)
            }) */

        /* 
        
                fetch(route('files.download', {
                    method
                }))
                    /* .then((res) => res.blob())
                    .then((res) => {
                        console.log(res);
        
                        // const a = document.createElement('a');
                        // a.download = "res.filename";
                        // a.href = res.url;
                        // a.click();
        
                        // const file = window.URL.createObjectURL(blob)
                        // window.location.assign(file)
                    }) */

        /* downloadForm.data.parent_id = folderId;
        downloadForm.data.selected_all = false;
        downloadForm.data.selected_ids = [file.uuid];
        downloadForm.post(route("files.download"), {
            preserveState: true,
        }); */
    }


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
                        {file.is_folder &&
                            <DropdownItem
                                startContent={<FolderOpenIcon className={iconClasses} />}
                                onClick={() => openFolderRequest(file)}
                            >
                                Open
                            </DropdownItem>
                        }

                        <DropdownItem onPress={onDownload} startContent={<ArrowDownTrayIcon className={iconClasses} />}>
                            Download {file.is_folder ? "as Zip" : "file"}
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
