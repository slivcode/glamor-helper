import { GlamorComponent } from '../glamor-component';
import * as React from 'react';
import { StatefulProp } from '../glamor-stateful-prop';

import { mount, shallow } from 'enzyme';
import { createElement } from 'react';
test('glamor component test', () => {
	let El = GlamorComponent<{ isActive }>({
		ep: ['isActive'],
		tag: 'div',
		rule: [
			{
				color: 'red',
			},
			{
				'.is-active': {
					color: 'yellow',
				},
			},
		],
		cn: ({ isActive }) => [[isActive, 'is-active']],
		style: ({ isActive }) => ({ color: isActive ? 'blue' : 'red' }),
	});
	let R = (f) => f();
	R(() => {
		let f = jest.fn();
		let $ = mount(createElement(El, { isActive: true, innerRef: f }));
		expect($.hasClass('is-active')).toBeTruthy();
		let $div = $.render().find('div');
		expect($div.attr('class').match(/css-/)).toBeTruthy();
		expect($div.attr('style').match(/color: blue;/)).toBeTruthy();
		expect(f).toBeCalled();
	});
	R(() => {
		let $ = shallow(createElement(El, { isActive: false }));
		expect($.hasClass('is-active')).toBeFalsy();
	});
});