import { Context } from "@july/snarl";
import { JsxElement } from "@july/snarl/jsx-runtime";

export interface LayoutProps {
	children?: JsxElement | JsxElement[];
}

function flatten(arr: any[]): any[] {
	return arr.flatMap((x) => Array.isArray(x) ? flatten(x) : x);
}

export function Layout(props: LayoutProps = {}) {
	const children = flatten(props.children ? (Array.isArray(props.children) ? props.children : [props.children]) : []);
	const head: JsxElement[] = [], body: JsxElement[] = [], main: JsxElement[] = [];

	for (const child of children) {
		if (child?.tag === "head") {
			head.push(...child.props?.children ?? []);
		} else if (child?.tag === "body") {
			body.push(...child.props?.children ?? []);
		} else {
			main.push(child);
		}
	}

	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{head.map((node) => <>{node}</>)}
			</head>
			<body>
				{main.map((node, i) => <>{node}</>)}
				{body.map((node, i) => <>{node}</>)}
			</body>
		</html>
	);
}
