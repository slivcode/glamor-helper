import { StatefulProp } from '../glamor-stateful-prop';
import forEach = require('ramda/src/forEach');
test('glamor stateful prop test', () => {
	let MQ_TV = '@media(min-width: 1920px)';
	let t = StatefulProp('color', 'green',
		[':hover', 'red'],
		[':focus', 'green'],
		['.active', 'blue'],
		[MQ_TV, 'yellow'],
	);
	let m = expect(t);
	forEach(m.toContainEqual)([
		{ color: 'green' },
		{
			[MQ_TV]: [{ color: 'yellow' }],
		},
		{
			':hover': [{ color: 'red' }],
		},
	]);
});