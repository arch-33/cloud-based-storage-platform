import { FormEventHandler, ReactNode, useEffect, useReducer } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, Input } from "@nextui-org/react";
import GuestLayout from '@/layouts/guestLayout';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';

const ConfirmPassword = () => {
	const { data, setData, post, processing, errors, reset } = useForm({
		password: '',
	});
	const [isPwdVisible, toggleIsPwdVisible] = useReducer(state => !state, false);
	useEffect(() => {
		return () => {
			reset('password');
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route('password.confirm'));
	};

	const iconClasses = "w-5 h-5 text-2xl pointer-events-none text-default-400";
	return (
		<>
			<Head title="Confirm Password" />
			<form className='flex flex-col gap-4' onSubmit={submit}>
				<Input
					label="Password"
					placeholder="Enter your password"
					size='md'
					labelPlacement='outside'
					startContent={<LockKeyhole className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />}
					endContent={<button className="focus:outline-none" type="button" onClick={toggleIsPwdVisible}>
						{isPwdVisible ? (<EyeOff className={iconClasses} />) : (<Eye className={iconClasses} />)}
					</button>}
					type={isPwdVisible ? "text" : "password"}
					isInvalid={!!errors.password}
					errorMessage={errors.password || ""}
					value={data.password}
					autoComplete="current-password"
					onChange={(e) => setData('password', e.target.value)}
					autoFocus
				/>

				<div className="flex items-center justify-end mt-4">
					<Button className="font-semibold ms-4" disabled={processing} color='primary' variant='shadow' size='lg' type='submit' fullWidth>
						Confirm
					</Button>
				</div>
			</form>
		</>
	);
}

ConfirmPassword.layout = (page: ReactNode) => <GuestLayout cardTitle={"Confirm Password"}>{page}</GuestLayout>;

export default ConfirmPassword;