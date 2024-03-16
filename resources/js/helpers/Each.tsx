import { Children, ReactNode, useId } from "react"

type PropsType = {
	of: any[]
	render: (item: any, key: string) => ReactNode,
}

/* export default function Each<T>({ of, render }: PropsType<T>) {
	const id = useId();
	return ();
	return Children.toArray(of.map((item, index) => render(item, index)));
} */



export default function Each({ render, of }: PropsType) {
	const id = useId();
	return (
		of.map((element, index) => render(element, id + "--" + index))
	);
	// return Children.toArray(of.map((item, index) => render(item, index)));
}