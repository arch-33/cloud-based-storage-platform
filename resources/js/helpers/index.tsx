import { router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import axios from "axios"
import { saveAs } from "file-saver";


export function downloadRequest(data: any) {
    axios.post(route("files.download"), data, { responseType: "blob" })
        .then(({ data, headers }) => {
            saveAs(data, headers.get("filename"));
        })
        .catch(err => toast.error("Error, couldn't download selected file(s)", { position: "top-right" }))

}

export function openFolderRequest(folder: any) {
    if (folder?.is_folder) {
        router.visit(route("folders.show", { folder: folder.uuid }))
    }
}

type DeleteRequestPropsType = {
    form: any,
    onSuccess?: () => void,
    onError?: (errors: any) => void
}


export function deleteRequest({ form, onSuccess, onError }: DeleteRequestPropsType) {
    form.delete(route("files.delete"), {
        onSuccess: () => {
            toast.success(`files moved to trash successfully`,
                { position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } }
            );
            onSuccess && onSuccess();
        },
        onError: (errors: any) => {
            let message = '';

            if (Object.keys(errors).length > 0) {
                message = errors[Object.keys(errors)[0]]
            } else {
                message = 'Error while deleting files. Please try again later.'
            }
            toast.error(message, { position: "top-right", style: { padding: "1rem", fontSize: "1.25rem" } });
            onError && onError(errors);
        },
    });
}