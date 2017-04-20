export type T_partitionObj = (lKeys: string[]) => <O>(o: O) => [Partial<O>, Partial<O>];
export const partitionObj: T_partitionObj = (l: string[]) => <O> (o: O) => {
	let isL = k => l.indexOf(k) !== -1;
	let a: any = {}, b: any = {};
	Object.keys(o).forEach(k => isL(k) ? (a[k] = o[k]) : (b[k] = o[k]));
	return [a, b] as any;
};