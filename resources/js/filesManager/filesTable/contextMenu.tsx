import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useCallback, useId, useMemo } from 'react';
import { FileActions, FileDataType } from '@/types';
import clsx from 'clsx';
import { Download, EllipsisVertical, FolderOpen, LucideIcon, RotateCcw, Share, Trash } from 'lucide-react';
import { PressEvent } from "@react-types/shared";
import { useFileManagerConfig, useFileManagerState } from '../fileManagerContext';

type PropsType = {
	file: FileDataType,
}

type ActionItemType = {
	name: FileActions,
	label: string;
	Icon: LucideIcon;
	color?: "default" | "danger" | "primary" | "secondary" | "success" | "warning",
}

export default function FileContextMenu({ file }: PropsType) {

	const id = useId();
	const { can } = useFileManagerConfig();
	const { selectedKeys, setSelectedKeys } = useFileManagerState();

	const onAction = useCallback((actionName: string) => (ev: PressEvent) => {
		alert(actionName)
	}, [file])

	const actionsList: ActionItemType[] = useMemo(() => [
		{
			name: "Download",
			Icon: Download,
			color: "default",
			label: `Download ${file.is_folder ? "as Zip" : "file"}`,
		},
		{
			name: "Share",
			Icon: Share,
			color: "default",
			label: `Share`,
		},
		{
			name: "Restore",
			Icon: RotateCcw,
			color: "default",
			label: `Restore`,
		},
		{
			name: "Move To Trash",
			Icon: Trash,
			color: "danger",
			label: `Move to Trash`
		},
		{
			name: "Delete",
			Icon: Trash,
			color: "danger",
			label: `Delete`,
		},
	], [file]);

	const allowedActions = useMemo(() => {
		const items: ActionItemType[] = []
		if (file.is_folder) {
			items.push({ name: "Open", Icon: FolderOpen, color: "default", label: `Open` })
		}

		actionsList.forEach((item) => {
			if (can.fileActions.includes(item.name)) items.push({ ...item })
		});
		return items;

	}, [can.fileActions, file, actionsList])


	return (
		<div className="relative flex items-center ">
			<Dropdown className="bg-background border-1 border-default-200" showArrow>
				<DropdownTrigger>
					<Button isIconOnly radius="lg" size="sm" variant="ghost" color='default'>
						<EllipsisVertical className="h-6 text-default-400" />
					</Button>
				</DropdownTrigger>
				<DropdownMenu variant="solid" items={allowedActions}>
					{({ name, Icon, label, color }) => (
						<DropdownItem
							key={id + name}
							startContent={<Icon className="flex-shrink-0 w-6 h-6 text-xl pointer-events-none atext-default-500" />}
							onPress={onAction(name)}
							color={color}
							className={clsx({ "text-danger": color === "danger" })}
						>
							{label}
						</DropdownItem>
					)}
				</DropdownMenu>
			</Dropdown>
		</div >
	);
}
