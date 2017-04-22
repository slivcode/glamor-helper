export type T_StatefulProp = (k: string, ...args: ([string, any] | any)[]) => Object[];

export const StatefulProp: T_StatefulProp = (k, ...a) =>
	a.map((s) =>
		Array.isArray(s) ?
			{ [s[0]]: [{ [k]: s[1] }] } :
			{ [k]: s },
	);

