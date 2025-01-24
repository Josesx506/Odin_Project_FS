### React Overview
React is “The library for web and native (mobile) interfaces.”

The advantages of React JS are :
- It is composable.
- It is declarative.
- Write once, and learn anywhere.
- It is simple.
- SEO friendly.
- Fast, efficient, and easy to learn.
- It guarantees stable code.
- It is backed by a strong community.


Composable is similar to writing functions to create elements for webpack but here the elements don't require `document.createElement()`. This is also
similar to creating functions/classes in other programs like python and reusing them in an application. Unlike webpack, you don't need to create a 
template `index.html` with a content `<div>` for injecting JS. An example of composable code in react
```JS
import React, { Component } from 'react';
 
function HeaderContent() {
    return (
        <h2>Hey!</h2>
    )
}
 
function MainContent() {
    return (
        <h1>I'm learning React!</h1>
    )
}
 
function FooterContent() {
    return (
        <h2>Goodbye!</h2>
    )
}
 
ReactDOM.render(
    <div>
        <HeaderContent />
        <MainContent />
        <FooterContent />
    </div>,
    document.getElementById("root"))
```