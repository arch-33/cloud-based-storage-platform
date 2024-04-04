import { FormEventHandler, ReactNode, useEffect, useReducer } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Divider, Input } from "@nextui-org/react";
import GuestLayout from '@/layouts/guestLayout';
import { EyeIcon, EyeOff, LockKeyhole, Mail, UserIcon } from 'lucide-react';

const Register = () => {
	const { data, setData, post, processing, errors, reset } = useForm({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});
	const [isPwdVisible, toggleIsPwdVisible] = useReducer(state => !state, false);

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation');
		};
	}, []);
	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('register'));
	};
	const iconClasses = "w-5 h-5 text-2xl pointer-events-none text-default-400";
	
	return (
		<>
			<Head title="Register" />
			<form className='flex flex-col gap-4 mt-6' onSubmit={submit}>
				{/* firstName input */}
				<Input
					type="text"
					label="First Name :"
					size='md'
					name="first_name"
					placeholder="Enter your first name"
					labelPlacement="outside"
					startContent={<UserIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					isInvalid={!!errors.first_name}
					errorMessage={errors.first_name || ""}
					value={data.first_name}
					autoComplete="first-name"
					autoFocus={true}
					onChange={(e) => setData('first_name', e.target.value)}
				/>


				{/* lastName input */}
				<Input
					type="text"
					label="Last Name :"
					size='md'
					name="last_name"
					placeholder="Enter your last name"
					labelPlacement="outside"
					startContent={<UserIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					isInvalid={!!errors.last_name}
					errorMessage={errors.last_name || ""}
					value={data.last_name}
					autoComplete="last-name"
					onChange={(e) => setData('last_name', e.target.value)}
				/>

				{/* email input */}
				<Input
					type="email"
					label="Email :"
					size='md'
					name="email"
					placeholder="Enter your email"
					labelPlacement="outside"
					startContent={<Mail className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					isInvalid={!!errors.email}
					errorMessage={errors.email || ""}
					value={data.email}
					autoComplete="email"
					onChange={(e) => setData('email', e.target.value)}
				/>

				{/* password input */}
				<Input
					label="Password"
					placeholder="Enter your password"
					size='md'
					labelPlacement='outside'
					startContent={<LockKeyhole className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleIsPwdVisible}>
							{isPwdVisible ? (<EyeOff className={iconClasses} />) :
								(<EyeIcon className={iconClasses} />)
							}
						</button>
					}
					type={isPwdVisible ? "text" : "password"}
					isInvalid={!!errors.password}
					errorMessage={errors.password || ""}
					value={data.password}
					autoComplete="new-password"
					onChange={(e) => setData('password', e.target.value)}
				/>

				{/* password confirmation input */}
				<Input
					label="Confirm Password"
					placeholder="Enter your password again"
					size='md'
					labelPlacement='outside'
					startContent={<LockKeyhole className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleIsPwdVisible}>
							{isPwdVisible ? (<EyeOff className={iconClasses} />) :
								(<EyeIcon className={iconClasses} />)
							}
						</button>
					}
					type={isPwdVisible ? "text" : "password"}
					isInvalid={!!errors.password_confirmation}
					errorMessage={errors.password_confirmation || ""}
					value={data.password_confirmation}
					autoComplete="new-password"
					onChange={(e) => setData('password_confirmation', e.target.value)}
				/>

				<Button
					className="mt-2 font-bold"
					color="primary"
					variant="shadow"
					disabled={processing}
					type="submit"
					size="md"
					fullWidth
				>
					Register
				</Button>
			</form>
			<Divider className="mt-6 mb-3" />

			<p className="mt-2 text-center text-gray-600 text-md dark:text-gray-400">
				Already have an account?
				<Link className="mx-2 font-medium text-blue-600 decoration-2 hover:underline" href={route('login')}>
					Sign in
				</Link>

			</p>
		</>
	);
}


Register.layout = (page: ReactNode) => <GuestLayout cardTitle="Create your Account">{page}</GuestLayout>;

export default Register;