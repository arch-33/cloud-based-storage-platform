import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Input } from "@nextui-org/react";
import { FormEventHandler, ReactNode } from 'react';
import { PageProps } from '@/types';
import GuestLayout from '@/layouts/guestLayout';
import { Mail } from 'lucide-react';

type PropsType = PageProps<{ status: string }>

const ForgotPassword = ({ status }: PropsType) => {
	const { data, setData, post, processing, errors } = useForm({ email: '' });

	const submit: FormEventHandler = (ev) => {
		ev.preventDefault();
		post(route('password.email'));
	};

	return (
		<>
			<Head title="Forgot Password" />
			<div className="mt-5 mb-4 text-gray-700 text-md dark:text-gray-400">
				No problem. Just let us know your email address and we will email you a password
				reset link that will allow you to choose a new one.
			</div>

			{status && <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">{status}</div>}

			<form onSubmit={submit} className='flex flex-col gap-4'>
				<Input
					type="email"
					label="Email :"
					size="md"
					name="email"
					placeholder="Enter your email"
					labelPlacement="outside"
					startContent={
						<Mail className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />
					}
					isInvalid={!!errors.email}
					errorMessage={errors.email || ""}
					value={data.email}
					autoComplete="email"
					autoFocus={true}
					onChange={(e) => setData("email", e.target.value)}
				/>

				<div className="flex items-center justify-center mt-4">
					<Button
						variant='shadow'
						size='lg'
						className="font-semibold"
						type='submit'
						disabled={processing}
						color='primary'
						fullWidth
					>
						Email Password Reset Link
					</Button>
				</div>
			</form>
			<div className="flex items-center py-3 mt-2 text-sm font-bold text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>
			<div className="flex items-center justify-between gap-4">
				<Button
					variant='faded'
					size='md'
					className="font-semibold"
					type='submit'
					disabled={processing}
					color='primary'
					fullWidth
					as={Link}
					href={route("login")}
				>
					Sign in
				</Button>
				<Button
					variant='faded'
					size='md'
					className="font-semibold"
					type='submit'
					disabled={processing}
					color='primary'
					fullWidth
					as={Link}
					href={route("register")}
				>
					Register
				</Button>
			</div>
		</>
	);
}

ForgotPassword.layout = (page: ReactNode) => <GuestLayout cardTitle={"Forgot password ?"}>{page}</GuestLayout>;

export default ForgotPassword;