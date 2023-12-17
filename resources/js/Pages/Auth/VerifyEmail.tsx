import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';
import { Button, CardBody } from "@nextui-org/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { PageProps } from '@/types';

type PropsType = PageProps<{ status?: string }>;

const VerifyEmail = ({ status }: PropsType) => {
	const { post, processing } = useForm({});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('verification.send'));
	};

	return (
		<>

			<Head title="Email Verification" />

			<CardBody className={"mt-4"}>
				<div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
					Thanks for signing up! Before getting started, could you verify your email address by clicking on the
					link we just emailed to you? If you didn't receive the email, we will gladly send you another.
				</div>

				{status === 'verification-link-sent' && (
					<div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
						A new verification link has been sent to the email address you provided during registration.
					</div>
				)}

				<form onSubmit={submit}>
					<div className="flex items-center justify-between gap-4 mt-4">
						<Button disabled={processing} color='primary' variant='shadow' size='lg' className='text-sm font-semibold' type='submit'>
							Resend Verification Email
						</Button>

						<Button
							color='danger' variant='faded' size='md' className=''
							as={Link} href={route('logout')} method="post"
							startContent={<ArrowRightOnRectangleIcon className='w-8 h-8' />}
						>
							Log Out
						</Button>
					</div>
				</form>
			</CardBody>
		</>
	);
}


VerifyEmail.layout = (page: ReactNode) => <GuestLayout title={"Email Verification"}>{page}</GuestLayout>;

export default VerifyEmail;