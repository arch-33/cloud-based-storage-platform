import { UserType } from "@/types";
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";

type PropsType = {
	user: UserType
}
export default function UserProfileDropDown({ user }: PropsType) {
	return (
		<Dropdown
			showArrow
			placement="bottom-end"
			classNames={{
				base: "before:bg-default-200", // change arrow background
				content: "border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black"
			}}
			
		>
			<DropdownTrigger>
				<Button
					variant="faded"
					className="pl-0 capitalize transition-transform rounded-full"
					as={User}
					size={"lg"}
					name={user.first_name}
					avatarProps={{ color: "primary", radius: "full", name: user.first_name.charAt(0) }}
				/>
			</DropdownTrigger>

			<DropdownMenu>

				<DropdownItem key="user-email" className="p-0 " isReadOnly showDivider>
					<div className="flex items-center justify-center py-2 font-semibold text-center text-md">{user.email}</div>
				</DropdownItem>

				<DropdownItem key="edit-profile" className="p-0" showDivider>
					<Button
						className="items-center justify-start py-1 text-sm text-gray-800 dark:text-gray-100"
						size="sm"
						variant="light"
						color="primary"
						fullWidth
						startContent={<UserCircleIcon className="w-6 h-6 text-xl pointer-events-none text-primary" />}
						as={Link}
						href={route("profile.edit")}
					>
						Edit Profile
					</Button>

				</DropdownItem>

				<DropdownItem key="logout" className="p-0">
					<Button
						className="items-center justify-start py-1 text-sm text-gray-800 dark:text-gray-100"
						startContent={<ArrowLeftOnRectangleIcon className="w-6 h-6 text-xl pointer-events-none text-danger" />}
						color="danger"
						size="sm"
						variant="light"
						fullWidth
						as={Link}
						href={route("logout")}
						method="post"
					>
						Log Out
					</Button>
				</DropdownItem>

			</DropdownMenu>
		</Dropdown>
	)
}
