# React screen resize listener mixin

A simple React mixin who handle screen resize detection from your React components.

## Installation

```bash
npm install react-screen-onresize-mixin --save
```

## Usage

```javascript
// Import the mixin
import ScreenResizeMixin from 'react-screen-onresize-mixin';

const MyComponent = React.createClass({
  mixins: [ ScreenResizeMixin ], // add it to your component

  onScreenResize() {
    // This function is executed
    // each time the window is resized
  }
});
```
By default the function `onScreenResize` is executed after a delay of 250ms without resizing to prevent so many calls. This delay can be changed :

```javascript
mixins: [ ScreenResizeMixin.delay( 500 ) ]
```
