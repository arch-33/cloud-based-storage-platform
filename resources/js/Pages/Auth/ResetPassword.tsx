import { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, CardBody, Input } from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { PageProps } from '@/types';

type PropsType = PageProps<{ token: string, email: string }>;

const ResetPassword = ({ token, email }: PropsType) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		token: token,
		email: email,
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

		post(route('password.store'));
	};

	return (
		<>
			<Head title="Reset Password" />

			<CardBody className={"mt-4"}>
				<form className='flex flex-col gap-4' onSubmit={submit}>

					{/* email input */}
					<Input
						type="email"
						label="Email"
						size='md'
						name="email"
						placeholder="Enter your email"
						labelPlacement="outside"
						startContent={<EnvelopeIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
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
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
						endContent={
							<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
								{isPwdVisible ? (<EyeSlashIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400" />) :
									(<EyeIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400" />)
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
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
						endContent={
							<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
								{isPwdVisible ? (<EyeSlashIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400" />) :
									(<EyeIcon className="w-6 h-6 text-2xl pointer-events-none text-default-400" />)
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
						<Button className="font-semibold ms-4" disabled={processing} color='primary' variant='shadow' size='lg' type='submit'>
							Reset Password
						</Button>
					</div>
				</form>
			</CardBody>
		</>
	);
}


ResetPassword.layout = (page: ReactNode) => <GuestLayout title={"Reset Password"}>{page}</GuestLayout>;

export default ResetPassword;