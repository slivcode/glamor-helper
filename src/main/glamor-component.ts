import { css } from 'glamor';
import { CSSProperties, SFC } from 'react';
import StyledTagComponent from 'styled-tag-component';

export type T_GlamorComponent = <P>(a: {
	tag?: string | any,
	ep?: string[],
	rule?: (CSSProperties)[],
	cn?: (p: P) => (string | [boolean, string])[],
	style?: (p: P) => Object,
	nullIf?: (p: P) => boolean,
}) => SFC<P & { innerRef?: (el: HTMLElement) => void }>;
export const GlamorComponent: T_GlamorComponent = (a) => {
	let { rule, cn, ...rest } = a;
	let baseCn = css(rule).toString();
	let cnF = (p) => cn && cn(p).map(i => Array.isArray(i) ? (i[0] ? i[1] : false) : i);
	return StyledTagComponent({
		cn: (p) => [baseCn, ...cnF(p)].filter(i => i),
		...rest
	});
};