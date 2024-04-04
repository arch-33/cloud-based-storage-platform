import { FormEventHandler, ReactNode, useEffect, useReducer } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Divider, Input, Switch } from "@nextui-org/react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import GuestLayout from "@/layouts/guestLayout";

const Login = ({ status, canResetPassword }: { status?: string; canResetPassword: boolean; }) => {

	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	const [isPwdVisible, toggleIsPwdVisible] = useReducer(state => !state, false);

	useEffect(() => {
		return () => { reset("password"); };
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();
		post(route("login"));
	};

	const iconClasses = "w-5 h-5 text-2xl pointer-events-none text-default-400";

	return (
		<>
			<Head title="Log in" />

			{status && (
				<>
					<div className="mt-2 mb-4 font-medium text-center text-md text-success-600">
						{status}
					</div>
					<Divider />
				</>
			)}
			<form
				className="flex flex-col gap-4 mt-6"
				onSubmit={submit}
			>
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

				<Input
					label="Password"
					placeholder="Enter your password"
					size="md"
					labelPlacement="outside"
					startContent={
						<LockKeyhole className="flex-shrink-0 w-6 h-6 text-2xl pointer-events-none text-default-400" />
					}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={toggleIsPwdVisible}
						>
							{isPwdVisible ? <EyeOff className={iconClasses} /> : <Eye className={iconClasses} />}
						</button>
					}
					type={isPwdVisible ? "text" : "password"}
					isInvalid={!!errors.password}
					errorMessage={errors.password || ""}
					value={data.password}
					autoComplete="current-password"
					onChange={(e) => setData("password", e.target.value)}
				/>

				<Switch
					size="md"
					name="remember"
					className="pl-2 mt-2"
					isSelected={data.remember}
					onChange={(e) => setData("remember", e.target.checked)}
				>
					Remember me
				</Switch>

				<Button
					className="font-bold"
					color="primary"
					variant="shadow"
					disabled={processing}
					type="submit"
					size="md"
					fullWidth
				>
					Sign in
				</Button>

				{canResetPassword && (
					<div className="flex items-center justify-end m2-4">
						<Link
							href={route("password.request")}
							className="text-gray-600 underline rounded-md text-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
						>
							Forgot your password?
						</Link>
					</div>
				)}
			</form>

			<Divider className="mt-6 mb-3" />

			<p className="mt-2 text-center text-gray-600 text-md dark:text-gray-400">
				Don’t have an account yet?
				<Link className="mx-2 font-medium text-blue-600 decoration-2 hover:underline" href={route('register')}>
					Register
				</Link>

			</p>
		</>
	);
}

Login.layout = (page: ReactNode) => <GuestLayout cardTitle="Sign in to your account">{page}</GuestLayout>;

export default Login;
