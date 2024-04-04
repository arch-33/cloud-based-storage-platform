import { Listbox, ListboxItem } from "@nextui-org/react";
import { FolderCog, HardDrive, Trash2, UsersRound } from "lucide-react";
import { PropsWithChildren } from "react"
import { Link } from "@inertiajs/react";
import clsx from "clsx";

type PropsType = PropsWithChildren & {

}

export default function Sidebar({ }: PropsType) {
	
	const iconClasses = "text-xl pointer-events-none flex-shrink-0 h-6";
	
	return (
		<Listbox
			variant="flat"
			color="default"
			aria-label="sidebar navigation"
			className="gap-0 p-0 overflow-visible divide-y divide-default-300/50 dark:divide-default-100/80 shadow-small"
			itemClasses={{ base: "px-3 first:rounded-t-small last:rounded-b-small rounded-none gap-3 h-12 my-1" }}
		>

			<ListboxItem
				key="home"
				className={clsx({ "bg-primary text-primary-foreground": route().current('my-drive(.*)?') })}
				startContent={<HardDrive className={iconClasses} />}
				as={Link}
				href={route("my-drive.index")}
			>
				My Drive
			</ListboxItem>


			<ListboxItem
				key="SharedWithMe"
				className={clsx({ "bg-primary text-primary-foreground": route().current('sharedw-me(.*)?') })}
				startContent={<UsersRound className={iconClasses} />}
				as={Link}
				href={route("sharedw-me.index")}
			>
				Shared with me
			</ListboxItem>

			<ListboxItem
				key="SharedDocuments"
				className={clsx({ "bg-primary text-primary-foreground": route().current('sharing(.*)?') })}
				startContent={<FolderCog className={iconClasses} />}
				as={Link}
				href={route("sharing.index")}
				showDivider
			>
				Shared Documents
			</ListboxItem>

			<ListboxItem
				key="Trash"
				color="danger"
				className={clsx("text-danger", { "bg-danger text-danger-foreground": route().current('trash(.*)?') })}
				startContent={<Trash2 className={iconClasses} />}
				as={Link}
				href={route("trash.index")}
			>
				Trash
			</ListboxItem>
		</Listbox>
	)
}