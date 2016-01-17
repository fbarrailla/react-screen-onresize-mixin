import test from 'ava';
import sinon from 'sinon';
import 'babel-core/register';

import jsdom from 'jsdom';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import mixin from '../src/index';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

function getReactElement(mxn){
  return React.createClass({
    mixins: [mxn],
    onScreenResize: () => {},
    render: () => React.createElement('div', null)
  });
}

function simulateWindowResizing(){
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, false);
  window.dispatchEvent(event);
}

test.cb('Listen onresize event on component mount', t => {
  t.plan(1);
  const Cmpnt = getReactElement( mixin );
  const component = TestUtils.renderIntoDocument( React.createElement(Cmpnt) );
  sinon.spy(component, 'onScreenResize');
  simulateWindowResizing();
  setTimeout(() => {
    t.ok(component.onScreenResize.calledOnce);
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
    t.end();
  }, 250 + 10);
});

test.cb('Custom debounce delay', t => {
  t.plan(1);
  const Cmpnt = getReactElement( mixin.delay(1000) );
  const component = TestUtils.renderIntoDocument( React.createElement(Cmpnt) );
  sinon.spy(component, 'onScreenResize');
  simulateWindowResizing();
  setTimeout(() => {
    t.ok(component.onScreenResize.calledOnce);
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
    t.end();
  }, 1000 + 10);
});

test('Call window.removeEventListener on after component unmount', t => {
  const Cmpnt = getReactElement( mixin );
  const component = TestUtils.renderIntoDocument( React.createElement(Cmpnt) );
  sinon.spy(window, 'removeEventListener');
  ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
  t.ok(window.removeEventListener.calledOnce);
});
