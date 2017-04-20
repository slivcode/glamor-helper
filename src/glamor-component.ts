import { css } from 'glamor';
import { createElement, CSSProperties, SFC } from 'react';
import { partitionObj } from '../../../cn-style-component/src/util/partition-obj';
export type T_GlamorComponent = <P>(a: {
	tag?: string | any,
	ep?: string[],
	rule?: (CSSProperties)[],
	cn?: (p: P) => (string | [boolean, string])[],
	style?: (p: P) => Object,
}) => SFC<P & { innerRef?: (el: HTMLElement) => void }>;
export const GlamorComponent: T_GlamorComponent = (a) => {
	let { tag = 'tag', ep = [], rule, cn, style: _s } = a;
	let baseCn = css(rule).toString();
	return (p) => {
		let [eP, dP] = partitionObj(ep.concat('innerRef'))(p);
		let className = cn ? [
			baseCn,
			...cn(eP).map(i => Array.isArray(i) ? (i[0] ? i[1] : false) : i)
		].filter(i => i).join(' ') : baseCn;
		let style = _s && _s(p);
		return createElement(tag, { className, style, ref: eP.innerRef, ...dP });
	};
};