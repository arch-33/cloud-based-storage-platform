import { FormEventHandler, ReactNode, useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, CardBody, Divider, Input, Switch } from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = ({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: '',
		password: '',
		remember: false,
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

		post(route('login'));
	};
	const iconClasses = "w-5 h-5 text-2xl pointer-events-none text-default-400";

	return (
		<>
			<Head title="Log in" />

			{status && <>
				<div className="mt-2 mb-4 text-sm font-medium text-center text-green-600">{status}</div>
				<Divider />
			</>}

			<CardBody className={"mt-4"}>
				<form className='flex flex-col gap-4' onSubmit={submit}>

					<Input
						type="email"
						label="Email :"
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


					<Input
						label="Password"
						placeholder="Enter your password"
						size='md'
						labelPlacement='outside'
						startContent={<LockClosedIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
						endContent={
							<button className="focus:outline-none" type="button" onClick={togglePwdVisibility}>
								{isPwdVisible ? (<EyeSlashIcon className={iconClasses} />) : (<EyeIcon className={iconClasses} />)}
							</button>
						}
						type={isPwdVisible ? "text" : "password"}
						isInvalid={!!errors.password}
						errorMessage={errors.password || ""}
						value={data.password}
						autoComplete="current-password"
						onChange={(e) => setData('password', e.target.value)}
					/>

					<Switch size='sm' name="remember" className='pl-2' isSelected={data.remember} onChange={(e) => setData('remember', e.target.checked)}>
						Remember me
					</Switch>

					<div className="flex items-center justify-end mt-4">
						{canResetPassword && (
							<Link
								href={route('password.request')}
								className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
							>
								Forgot your password?
							</Link>
						)}

						<Button className="font-bold ms-4" color='primary' variant='shadow' disabled={processing} type='submit' size='md'>
							Log in
						</Button>
					</div>

				</form>
			</CardBody>
		</>
	);
}

Login.layout = (page: ReactNode) => <GuestLayout showLinks={["register"]} title={"Login"}>{page}</GuestLayout>;

export default Login;
