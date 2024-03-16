import { useCallback } from "react"
import { FileDataType } from "@/types";
import toast from "react-hot-toast";
import { useFileManagerContext } from "../FileManagerContext";
import { ActionFormType, prepareData } from "./BaseAction";
import axios from "axios";
import { saveAs } from "file-saver";


export default function useDownloadAction(file?: FileDataType) {

	const { curentFolder, selectedKeys, routes } = useFileManagerContext();

	return useCallback(
		() => {
			if (!routes.download) return;

			const data: ActionFormType = prepareData({ curentFolder, selectedKeys, file })
			
			toast.promise(
				axios.post(route(routes.download), data, { responseType: "blob" })
					.then(({ data, headers }) => {
						saveAs(data, headers.filename);
					})
					.catch(err => console.log(err)),
				{
					loading: 'Downloading...',
					success: <b>download successful!</b>,
					error: <b>Couldn't finish downloading.</b>,
				}
			);

		},
		[curentFolder, file, selectedKeys, routes]
	);

}