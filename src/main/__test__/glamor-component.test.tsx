import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { createElement } from 'react';
import { GlamorComponent } from '../glamor-component';
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
		cn: ({ isActive }) => [
			[isActive, 'is-active'],
			'extra-cn',
		],
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
		expect($.hasClass('extra-cn')).toBeTruthy();
	});
});