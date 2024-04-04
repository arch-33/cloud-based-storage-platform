import { FormEventHandler, ReactNode, useEffect, useReducer, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { PageProps } from '@/types';
import GuestLayout from '@/layouts/guestLayout';

type PropsType = PageProps<{ token: string, email: string }>;

const ResetPassword = ({ token, email }: PropsType) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		token: token,
		email: email,
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

		post(route('password.store'));
	};
	const iconClasses = "w-5 h-5 text-2xl pointer-events-none text-default-400";

	return (
		<>
			<Head title="Reset Password" />

			<form className='flex flex-col gap-4 mt-6' onSubmit={submit}>
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
					autoFocus
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
						<button className="focus:outline-none" type="button" onClick={toggleIsPwdVisible}>
							{isPwdVisible ? (<EyeSlashIcon className={iconClasses} />) :
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
					startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					endContent={
						<button className="focus:outline-none" type="button" onClick={toggleIsPwdVisible}>
							{isPwdVisible ? (<EyeSlashIcon className={iconClasses} />) :
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


				<div className="flex items-center justify-end mt-4">
					<Button className="font-semibold ms-4" disabled={processing} color='primary' variant='shadow' size='lg' type='submit' fullWidth>
						Reset Password
					</Button>
				</div>
			</form>
		</>
	);
}


ResetPassword.layout = (page: ReactNode) => <GuestLayout cardTitle={"Reset Password"}>{page}</GuestLayout>;

export default ResetPassword;