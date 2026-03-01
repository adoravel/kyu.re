import { css, Import } from "../mech/css.ts";

const style = css(`
	:scope {
  		font-size: var(--font-size-md);
  		font-weight: bold;
  		position: relative;
  		display: flex;
  		align-items: center;
  		color: var(--theme-foreground);
	}
`);

export default function SectionTitle({ children, class: className }: { children: string; class?: string }) {
	return (
		<h2 class={style.scope + (className ? ` ${className}` : "")}>
			<Import styles={[style]} />
			{children}
		</h2>
	);
}
