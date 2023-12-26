interface IUploadFileProps {
}

export default function UploadFile({ }: IUploadFileProps) {

    return (
        <input type="file" className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer" multiple />
    );

}
