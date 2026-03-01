import { css, Import } from "../mech/css.ts";

const typecycle = css(`
	:scope {
		--type-duration: 5s;
		--type-pause: 30%;
		display: inline-block;
	}

	:scope::after {
		content: "";
		border-right: 0.15em solid var(--theme-primary);
		animation: caret 1s ease-in-out infinite;
		padding-left: 0.25em;
	}

	:scope > .text {
		overflow: hidden;
		display: inline-block;
		vertical-align: bottom;
		margin-left: 0.875ch;
		animation: type-delete var(--type-duration) ease-in-out infinite;
	}

	@keyframes type-delete {
		0%,
		100% {
			max-width: 0;
		}
		30%,
		60% {
			max-width: 100%;
		}
		90% {
			max-width: 0;
		}
	}

	@keyframes caret {
		0%,
		100% {
			opacity: 1;
		}
		30%,
		60% {
			opacity: 0;
		}
		90% {
			opacity: 1;
		}
	}
`);

export function Typecycle() {
	return (
		<span class={typecycle.scope}>
			<Import styles={[typecycle]} />
			<span style="color: var(--theme-foreground-alt)">λ</span>
			<span class="text">kyure</span>
		</span>
	);
}
