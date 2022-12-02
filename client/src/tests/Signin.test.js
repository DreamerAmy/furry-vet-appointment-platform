import React from 'react';
import Signin from "./Signin";
import {shallow} from "enzyme";
import './enzymeConfig';
describe('Test case for testing login',() =>{
    let wrapper;
    test('username check',()=>
    {
        wrapper = shallow(<Signin/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'wade'}});
        expect(wrapper.state('username')).toEqual('wade');
    })
    it('password check',()=>{
        wrapper = shallow(<Signin/>);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '1234'}});
        expect(wrapper.state('password')).toEqual('1234');
    })
    it('login check with right data',()=>{
        wrapper = shallow(<Signin/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant123'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(true);
    })
    it('login check with wrong data',()=>{
        wrapper = shallow(<Signin/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'krishankant1234'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogined')).toBe(false);
    })
})