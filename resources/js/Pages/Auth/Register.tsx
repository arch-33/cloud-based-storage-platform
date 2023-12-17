import {FormEventHandler, ReactNode, useEffect, useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {Button, CardBody, Input} from "@nextui-org/react";
import {EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon} from "@heroicons/react/24/outline";

const Register = ()=> {
	const {data, setData, post, processing, errors, reset} = useForm({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});
	const [isPwdVisible, setIsPwdVisible] = useState(false);

	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation');
		};
	}, []);
	const togglePwdVisibility = () => setIsPwdVisible(!isPwdVisible);
	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('register'));
	};

	return (
		<>

			<Head title="Register"/>


			<CardBody className={"mt-4"}>
				<form className='flex flex-col gap-4' onSubmit={submit}>
					{/* firstName input */}
					<Input
						type="text"
						label="First Name :"
						size='md'
						name="first_name"
						placeholder="Enter your first name"
						labelPlacement="outside"
						startContent={<UserIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						isInvalid={!!errors.first_name}
						errorMessage={errors.first_name || ""}
						value={data.first_name}
						autoComplete="first-name"
						isFocused={true}
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
						startContent={<UserIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						isInvalid={!!errors.last_name}
						errorMessage={errors.last_name || ""}
						value={data.last_name}
						autoComplete="last-name"
						isFocused={true}
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
						startContent={<EnvelopeIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						isInvalid={!!errors.email}
						errorMessage={errors.email || ""}
						value={data.email}
						autoComplete="email"
						isFocused={true}
						onChange={(e) => setData('email', e.target.value)}
					/>

					{/* password input */}
					<Input
						label="Password"
						placeholder="Enter your password"
						size='md'
						labelPlacement='outside'
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						endContent={
							<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
								{isPwdVisible ? (<EyeSlashIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400"/>) :
									(<EyeIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400"/>)
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
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						endContent={
							<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
								{isPwdVisible ? (<EyeSlashIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400"/>) :
									(<EyeIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400"/>)
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

					<div className="flex items-center justify-end mt-4">
						<Link
							href={route('login')}
							className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
						>
							Already registered?
						</Link>

						<Button className="font-bold ms-4" color='primary' size="md" variant='shadow' disabled={processing} type='submit'>
							Register
						</Button>
					</div>
				</form>
			</CardBody>
		</>
	);
}


Register.layout = (page: ReactNode) => <GuestLayout showLinks={["login"]} title={"Register"}>{page}</GuestLayout>;

export default Register;