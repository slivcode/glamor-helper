import { partitionObj } from '../partition-obj';
test('partition obj test', () => {
	let t = partitionObj(['a', 'b'])({ a: 1, b: 2, c: 3, d: 4 });
	expect(t).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }]);
});