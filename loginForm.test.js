import React from 'react';
import {expect} from 'chai'
import {shallow} from 'enzyme'
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const dispatch = spy();
import Drawer from '../../components/common/Drawer'
import LoginForm from '../../components/common/LoginForm'
describe("Common/Drawer component", ()=>
{
	it ("LoginForm dialog is visiable",()=>
	{
		const component=shallow(<Drawer dispatch={dispatch} store={mockStore({ PriemAccount: {user:{}} })} />)
		
		expect(component.find('div')).to.have.length(1)
	})
})
