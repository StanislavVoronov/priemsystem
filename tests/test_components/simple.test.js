
import React from 'react';
import {Provider} from 'react-redux'
import {shallow} from 'enzyme'
import {expect,assert} from 'chai'
import sinon from 'sinon'
import Select from "../../components/common/multiSelect";
import {validateFields} from '../../components/common/priemGlobals'
describe("Simple Test",()=>{
	it("Empty data array",()=>{

		expect(validateFields([],"personData")).to.deep.equal(["last_name","first_name","birthdate","sex"])
	})
	it("All data have",()=>{
		expect(validateFields(["last_name","first_name","birthdate","sex"],"personData")).to.deep.equal([])
	})
	it("Need some data",()=>{

		expect(validateFields(["birthdate","sex"],"personData")).to.deep.equal(['last_name', 'first_name'])
	})


})