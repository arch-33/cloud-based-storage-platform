import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {Button, CardBody, Input} from "@nextui-org/react";
import {EnvelopeIcon} from "@heroicons/react/24/outline/index.js";
import { ReactNode } from 'react';
import { PageProps } from '@/types';

type PropsType = PageProps<{status: string}>

const  ForgotPassword = ({status}: PropsType) => {
	const {data, setData, post, processing, errors} = useForm({ email: ''});

	const submit = (e: Event ) => {
		e.preventDefault();

		post(route('password.email'));
	};

	return (
		<>
			<Head title="Forgot Password"/>

			<CardBody className={"mt-4"}>
				<div className="mb-4 text-gray-700 text-md dark:text-gray-400">
					No problem. Just let us know your email address and we will email you a password
					reset link that will allow you to choose a new one.
				</div>

				{status && <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">{status}</div>}

				<form onSubmit={submit} className='flex flex-col gap-4'>
					<Input
						type="email"
						size='md'
						name="email"
						placeholder="Enter your email"
						startContent={<EnvelopeIcon className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400"/>}
						isInvalid={!!errors.email}
						errorMessage={errors.email || ""}
						value={data.email}
						autoComplete="email"
						fullWidth={true}
						isFocused={true}
						onChange={(e) => setData('email', e.target.value)}
					/>

					<div className="flex items-center justify-center mt-4">
						<Button variant='shadow' size='lg' className="font-semibold ms-4" type='submit' disabled={processing} color='primary'>
							Email Password Reset Link
						</Button>
					</div>
				</form>
			</CardBody>
		</>
	);
}

ForgotPassword.layout = (page: ReactNode) => <GuestLayout showLinks={["login", "register"]} title={"Forgot password ?"}>{page}</GuestLayout>;

export default ForgotPassword;