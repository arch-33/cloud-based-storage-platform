import { useForm } from "@inertiajs/react";
import UploadModalBase from "./UploadModalBase";

type PropsType = {
    disclosure: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
        onOpenChange: () => void;
    }
}


export default function UploadFilesModal({ disclosure }: PropsType) {

    const uploadForm = useForm<{ files: File[], parent_id: string }>({
        files: [],
        parent_id: ""
    });

    const preSubmit = ({ files, parent_id }: { files: File[], parent_id: string }) => {
        uploadForm.data.files = files;
        uploadForm.data.parent_id = parent_id;
    }

    return (
        <UploadModalBase
            disclosure={disclosure}
            uploadType="Files"
            preSubmit={preSubmit}
            uploadForm={uploadForm}
        />
    )
}