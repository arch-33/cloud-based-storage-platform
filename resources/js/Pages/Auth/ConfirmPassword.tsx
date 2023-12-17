import { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Button, CardBody, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const ConfirmPassword = () => {
	const { data, setData, post, processing, errors, reset } = useForm({
		password: '',
	});
	const [isPwdVisible, setIsPwdVisible] = useState(false);
	useEffect(() => {
		return () => {
			reset('password');
		};
	}, []);
	const togglePwdVisibility = () => setIsPwdVisible(!isPwdVisible);
	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('password.confirm'));
	};

	return (
		<GuestLayout title={"Confirm Password"}>
			<Head title="Confirm Password" />

			<CardBody className={"mt-4"}>
				<form className='flex flex-col gap-4' onSubmit={submit}>
					<Input
						label="Password"
						placeholder="Enter your password"
						size='md'
						labelPlacement='outside'
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
						endContent={<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
							{isPwdVisible ? (<EyeSlashIcon className="w-5 h-5 text-2xl pointer-events-none text-default-400" />) : (<EyeIcon className="w-5 h-5 text-2xl pointer-events-none text-default-400" />)}
						</button>}
						type={isPwdVisible ? "text" : "password"}
						isInvalid={!!errors.password}
						errorMessage={errors.password || ""}
						value={data.password}
						autoComplete="current-password"
						onChange={(e) => setData('password', e.target.value)}
					/>

					<div className="flex items-center justify-end mt-4">
						<Button className="font-semibold ms-4" disabled={processing} color='primary' variant='shadow' size='lg' type='submit'>
							Confirm
						</Button>
					</div>
				</form>
			</CardBody>

		</GuestLayout>
	);
}

ConfirmPassword.layout = (page: ReactNode) => <GuestLayout title={"Confirm Password"}>{page}</GuestLayout>;

export default ConfirmPassword;