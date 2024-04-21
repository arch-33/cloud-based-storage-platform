import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, RadioGroup, RadioProps, VisuallyHidden, cn, useDisclosure, useRadio } from "@nextui-org/react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ConfirmProps, useConfirm } from "react-confirm-hook";
import { When } from "react-if";
import toast from "react-hot-toast";
import axios from "axios";
import { router, useForm } from "@inertiajs/react";
import { useFileManagerConfig, useFileManagerState } from "@/filesManager/fileManagerContext";
import { Globe2Icon, ShieldIcon } from "lucide-react";
import { prepareSelectionData } from "@/helpers";
import { forEach } from "lodash";
import SharedSuccessfulModal from "./SharedSuccessful";

export type ShareInput = {
	is_public: boolean,
	email: string,
	permission: "view" | "edit",
	parent_id: "",
	selected_all: boolean
	selected_ids: string[]
}

type PropsType = ConfirmProps & {
	data: {
		parent_id: string;
		selected_all: boolean;
		selected_ids: string[];
	}
};

type ShareFilesModalProps = {
	disclosure: {
		isOpen: boolean;
		onOpen: () => void;
		onClose: () => void;
		onOpenChange: () => void;
		isControlled: boolean;
		getButtonProps: (props?: any) => any;
		getDisclosureProps: (props?: any) => any;
	},

	onSubmit?: () => void,

	data?: {
		parent_id: string;
		selected_all: boolean;
		selected_ids: string[];
	}
}


export function ShareFilesModal({ disclosure }: ShareFilesModalProps) {

	const { folder, can, routes } = useFileManagerConfig();
	const { selectedKeys, setSelectedKeys } = useFileManagerState()

	const form = useForm<ShareInput>({
		is_public: false,
		email: "",
		permission: "view",
		parent_id: "",
		selected_all: false,
		selected_ids: []
	});
	const successAlert = useConfirm(SharedSuccessfulModal);


	const onAccessOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const is_public = e.target.value === "public";
		form.setData(old => ({ ...old, is_public }))
	}
	const onPermissionOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		const permission = e.target.value === "edit" ? "edit" : "view";
		form.setData(old => ({ ...old, permission }))
	}

	const onSubmit = useCallback(() => {

		const selectionData = prepareSelectionData(selectedKeys, undefined);

		const data = {
			...form.data,
			...selectionData,
			parent_id: folder.uuid,
		}

		axios.post(route("sharing.new"), data)
			.then((res) => {
				successAlert({
					file_url: "file DJQJ",
					onConfirm: () => { },
					onCancel: () => {
						disclosure.onClose()
					},
				});

				console.log(res.data);
			})
			.catch((error) => {
				if (error.response.status === 422) {
					const validationErrors = error.response.data.errors;
					Object.keys(validationErrors).forEach(key => {
						form.setError(key, validationErrors[key][0]);
					});
				} else {
					// Handle other types of errors
					console.error('Unexpected error:', error);
				}
			});
		// toast.promise(
		// 	,
		// {
		// 	loading: 'Sharing...',
		// 	// success: <b>shared successful!</b>,
		// 	// error: <b>Couldn't finish operation.</b>,
		// }
		// );
	}, [form, selectedKeys, folder])


	return (
		<Modal
			isOpen={disclosure.isOpen}
			isDismissable={false}
			hideCloseButton
			className="bg-white dark:bg-gray-800 max-w-[35rem]"
		>
			<ModalContent>
				<ModalHeader className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Files</h3>
				</ModalHeader>
				<ModalBody>
					<h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Change the general access for your file : </h3>
					<ul className="grid w-full gap-6 md:grid-cols-2">
						<li>
							<input
								type="radio" id="access-restricted" name="access" required className="hidden peer"
								value="restricted"
								checked={!form.data.is_public}
								onChange={onAccessOptionChange}
							/>
							<label htmlFor="access-restricted" className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
								<div className="block">
									<div className="w-full text-lg font-semibold">Restricted</div>
									<div className="w-full">Only people with access can open the file.</div>
								</div>
								<ShieldIcon className="w-10 h-10 ms-3" />
							</label>
						</li>
						<li>
							<input
								type="radio" id="access-public" name="access" className="hidden peer"
								value="public"
								checked={form.data.is_public}
								onChange={onAccessOptionChange}
							/>
							<label htmlFor="access-public" className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
								<div className="block">
									<div className="w-full text-lg font-semibold">Public</div>
									<div className="w-full">Anyone with the link can open your file.</div>
								</div>
								<Globe2Icon className="w-10 h-10 ms-3" />
							</label>
						</li>
					</ul>


					<When condition={!form.data.is_public}>
						<div className="p-2 px-4 border border-gray-200 rounded-lg shadow-md dark:border-gray-700">
							<h3 className="my-2 text-lg font-medium text-gray-900 dark:text-white">	Choose who to share with :</h3>
							<div className="sm:col-span-2">
								<Input
									type="email"
									variant="faded"
									label="Email :"
									placeholder="Enter recipient email"
									value={form.data.email}
									onValueChange={email => form.setData(old => ({ ...old, email }))}
									isInvalid={!!form.errors.email}
									color={form.errors.email ? "danger" : "default"}
									errorMessage={form.errors.email && "Please enter a valid email"}
								/>
							</div>

							<h3 className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">	How they can use your file ?</h3>

							<div className="grid space-y-3">
								<div className="relative flex items-start">
									<div className="flex items-center h-5 mt-1">
										<input
											id="view-only-option" name="permission" type="radio" className="text-blue-600 border-gray-200 rounded-full focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
											value="view"
											checked={form.data.permission === "view"}
											onChange={onPermissionOptionChange}
										/>
									</div>
									<label htmlFor="view-only-option" className="ms-3">
										<span className="block text-sm font-semibold text-gray-800 dark:text-neutral-300">View only</span>
										<span id="view-only-option-description" className="block text-sm text-gray-600 dark:text-neutral-500">
											View/ download access.
										</span>
									</label>
								</div>
								<div className="relative flex items-start">
									<div className="flex items-center h-5 mt-1">
										<input
											id="edit-option" name="permission" type="radio" className="text-blue-600 border-gray-200 rounded-full focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
											value="edit"
											checked={form.data.permission === "edit"}
											onChange={onPermissionOptionChange}
										/>
									</div>
									<label htmlFor="edit-option" className="ms-3">
										<span className="block text-sm font-semibold text-gray-800 dark:text-neutral-300">View and Edit</span>
										<span id="edit-option-description" className="block text-sm text-gray-600 dark:text-neutral-500">
											Full access.
										</span>
									</label>
								</div>
							</div>
						</div>
					</When>
				</ModalBody>
				<ModalFooter className="justify-between">
					<Button color="danger" variant="flat" className="text-sm font-semibold rounded-lg" onPress={disclosure.onClose}>
						Close
					</Button>
					<Button
						color="primary"
						variant="flat"
						className="w-1/2 font-semibold rounded-lg text-md"
						size="md"
						onPress={onSubmit}
					>
						Share
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}


export default function ShareFiles({ open, onConfirm, onCancel, data }: PropsType) {
	const discloser = useDisclosure()
	const [formData, setFormData] = useState<ShareInput>({
		is_public: false,
		email: "",
		permission: "view"
	})

	const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isEmailInvalid = useMemo(() => {
		if (formData.email === "") return false;

		return validateEmail(formData.email) ? false : true;
	}, [formData.email]);

	const isValidData = useMemo(() => {
		console.log("formData.is_public", formData.is_public);
		if (formData.is_public) return true;

		console.log("isEmailInvalid", isEmailInvalid);
		if (isEmailInvalid && formData.email.trim().length === 0) return false;
		console.log("formData.permission", formData.permission);
		if (!["view", "edit"].includes(formData.permission)) return false;

		return true;

	}, [formData.permission, formData.is_public, isEmailInvalid])

	const onSubmit = (onClose: () => void) => {

		// VALIDATION
		if (!formData.is_public) {
			if (isEmailInvalid && formData.email.trim().length < 3) return;
			if (["view", "edit"].includes(formData.permission)) return;
			console.log("??");
		}


		toast.promise(
			axios.post(route(`sharing.new`), data)
				.then(response => {
					router.reload({
						only: ["descendants"],
						preserveScroll: true
					})
				})
				.catch(err => console.log(err)),
			{
				loading: 'Sharing...',
				success: <b>files shared successfully</b>,
				error: <b>Error while sharing files. Please try again later.</b>,
			}
		);
		onConfirm();
		onClose();

	}


	return (
		<Modal isOpen={open} isDismissable={false} hideCloseButton className="bg-white dark:bg-gray-800 max-w-[30rem]">
			<ModalContent className="">
				{(onClose) => (
					<>
						<ModalHeader className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5 dark:border-gray-600">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Share Files
							</h3>
						</ModalHeader>
						<ModalBody className="grid gap-4 sm:grid-cols-2 sm:gap-6">
							<div className="sm:col-span-2">
								<RadioGroup
									label="General access for your file : "
									classNames={{
										wrapper: "content-center",
										label: "block mb-2 text-md font-medium text-gray-900 dark:text-white"
									}}
									defaultValue="Restricted"
									value={formData.is_public ? "Public" : "Restricted"}
									onValueChange={value => setFormData({ ...formData, is_public: value === "Public" })}
								>
									<CustomRadio
										description="Only people with access can open the file."
										value={"Restricted"}
									>
										Restricted
									</CustomRadio>
									<CustomRadio
										description="Anyone can get access to your file, without signing in to their Account."
										value="Public"
									>
										Public
									</CustomRadio>
								</RadioGroup>
							</div>

							<When condition={!formData.is_public}>
								<p className="block mt-2 font-medium text-gray-900 sm:col-span-2 text-md dark:text-white">
									Choose who to share with
								</p>

								<div className="sm:col-span-2">
									<Input
										type="email"
										variant="faded"
										label="Email :"
										placeholder="Enter recipient email"
										value={formData.email}
										onValueChange={value => setFormData({ ...formData, email: value })}
										isInvalid={isEmailInvalid}
										color={isEmailInvalid ? "danger" : "default"}
										errorMessage={isEmailInvalid && "Please enter a valid email"}
									/>
								</div>

								<div className="sm:col-span-2">
									<RadioGroup
										label="How they can use your file !"
										color="primary"
										classNames={{ wrapper: "content-center", label: "block mb-2 text-md font-medium text-gray-900 dark:text-white" }}

										value={formData.permission}
										onValueChange={value => setFormData({ ...formData, permission: value })}
									>
										<CustomRadio description="view/download access." value={"view"}>
											View only
										</CustomRadio>
										<CustomRadio description="full access." value={"edit"}>
											View and Edit
										</CustomRadio>
									</RadioGroup>
								</div>

							</When>
						</ModalBody>
						<ModalFooter className="justify-between">
							<Button color="default" variant="flat" className="text-sm font-semibold rounded-lg"
								onPress={() => {
									onCancel()
									onClose()
								}}
							>
								Close
							</Button>
							<Button
								color="primary"
								variant="flat"
								className="w-1/2 font-semibold rounded-lg text-md"
								size="md"
								disabled={!isValidData}
								isDisabled={!isValidData}
								onPress={() => {
									onSubmit(onClose);
								}}
							>
								Share {isValidData.toString()}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

function CustomRadio(props: RadioProps) {
	const {
		Component,
		children,
		isSelected,
		description,
		getBaseProps,
		getWrapperProps,
		getInputProps,
		getLabelProps,
		getLabelWrapperProps,
		getControlProps,
	} = useRadio(props);

	return (
		<Component
			{...getBaseProps()}
			className={cn(
				"group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
				"max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
				"data-[selected=true]:border-primary",
			)}
		>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>
			<span {...getWrapperProps()}>
				<span {...getControlProps()} />
			</span>
			<div {...getLabelWrapperProps()}>
				{children && <span {...getLabelProps()}>{children}</span>}
				{description && (
					<span className="text-small text-foreground opacity-70">{description}</span>
				)}
			</div>
		</Component>
	);
};