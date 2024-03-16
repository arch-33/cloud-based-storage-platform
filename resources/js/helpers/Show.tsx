import { Children, PropsWithChildren } from "react"

type PropsType = PropsWithChildren & {}

const Show = (props: PropsType) => {

	let when = null;
	let otherwise = null;

	Children.forEach(props.children, children => {
		if (children?.props?.isTrue === undefined)
			otherwise = children;

		else if (!when && children.props.isTrue === true)
			when = children;
	})

	return when || otherwise;
}


Show.When = ({ isTrue, children }: PropsWithChildren & { isTrue: boolean }) => isTrue && children;
Show.Else = ({ children }: PropsWithChildren) => children;

export default Show;