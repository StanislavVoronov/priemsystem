import React from 'react';
import {expect} from 'chai'
import {shallow} from 'enzyme'
import Select from "../../components/common/multiSelect";
import Multiselect from 'react-widgets/lib/Multiselect';
import DropdownList from 'react-widgets/lib/DropdownList';
describe("Common/multiSelect component",()=>{
	it("It has multiSelect component",()=>{
		///const wrapper=mount(<Select />)
		
		const component = shallow(<Select muiTheme/>)
  			component.setProps({ multiSelect: true });

 
    		expect(component.find(Multiselect)).to.have.length(1);
    		expect(component.find(DropdownList)).to.have.length(0);
  	})
  	it("It has DropdownList select component",()=>{
		///const wrapper=mount(<Select />)
		
		const component = shallow(<Select muiTheme/>)
  			component.setProps({ multiSelect: false });
  			expect(component.find(Multiselect)).to.have.length(0);
    		expect(component.find(DropdownList)).to.have.length(1);
  	})

})

