## CSS Transforms
Transforms are ways to adjust HTML replaced elements e.g `<a>, <iframe>, and <img>`. Most elements can be transformed, with the exception of non-replaced 
elements like `<col>, <colgroup>` and inline elements like ` <span>, <b>, and <em>`. You should try to apply the transform property to an element and 
determine whether it works instead of memorizing elements. Transforms can be done in **2D** (x,y plane) or **3D**. Every element has an ***origin***, the 
anchor that the transform functions execute from. The `transform-origin: center;` is centered by default. It can be modified with css rules e.g.
```CSS
.element {
    transform: rotate(360deg);
    transform-origin: left top;
}
```
The transform origin acts as a pivot point for all transform types.

### Basic Transforms
- `rotate` - rotate an element about an axis 
    ```CSS
    .element {
        transform: rotate(20deg);
    }
    .element1 {
        transform: rotateX(45deg);
    }
    .element1 {
        transform: rotateY(1rad);
    }
    ```
    Calling `rotate()` alone with a single argument, applies the same rotation value in both the x-, y-, and z- directions. Another unit for rate is *turn*. 
    1 turn is equal to 360 degrees.
- `scale` - reduce or enlarge the size of an element in the x- or y- direction. Calling `transform: scale();` alone with a single argument, applies the same 
    rotation value in both the x- and y- directions. Seperate values can be specified for different axes with `transform: scale(0.25, 1.5);`. Other valid 
    transforms are `transform: scaleX();` and `transform: scaleY();`. The same argument formats can be specified for `skew` and `translate` but not the `rotate` 
    transform. Scale uses a unitless value that represents a multiple, similar to `line-height`. scale(2) means that the element should be 2x as big as it would 
    normally be.
- `skew` - distort a shape along an axes e.g. convert a rectangular shape to a parallelogram `transform: skew(45deg);`. Accepts *xy*, *x*, and *y* arguments.
- `translate` - shift an element within a parent element space e.g.
    ```HTML
    <div>
        <img class="translateXY" src="https://i.imgur.com/jkwFqfX.png" alt="top logo" />
    </div>
    ```
    ```CSS
    .translateXY {
        transform: translate(20px, -33%);
    }
    div {
        border: 1px solid black;
        margin-right: auto;
        padding: 24px;
    }
    img {
        width: 60px;
    }
    ```
    When we use a percentage value in translate, that percentage refers to the element's own size, not the available space within the parent container.

### Chaining multiple transforms
Chaining multiple transforms is done by adding more transform functions with a space between each one e.g.
```HTML
<div class="red-box"></div>
<div class="blue-box"></div>
```
```CSS
.red-box,
.blue-box {
  position: absolute;
  width: 100px;
  height: 100px;
}

.red-box {
  background: red;
  transform: rotate(45deg) translate(200%);
}

.blue-box {
  background: blue;
  transform: translate(200%) rotate(45deg);
}
```
The order in which you call chained transformations matter because composite transforms are effectively applied in order from right to left ([MDN Link](https://developer.mozilla.org/en-US/docs/Web/CSS/transform#values)).

### 3D transforms
The `rotate`, `scale`, and `translate` transform functions aren’t limited to just 2D planes. They also work for 3D planes as well! However, to perceive a 3D effect 
on some of these function values, a `perspective` argument is required. This is usually *chained* to the original transform.
```CSS
.translate-200 {
  transform: perspective(100px) translateZ(-200px);
}
```
***Perspective*** is the transform function value to set the distance from the user to the z = 0 plane. It is required to implement 3D transformations. By setting 
a perspective value, we are telling the object to render as if we were viewing it from a specific distance on the z-axis.

An uncommonly used transform type is `matrix()`. While not strictly a 3D transform function, matrix is a way of combining all transform functions into one. It is 
seldom used due to its poor readability, and almost never written by hand. Unless you have a very complex transformation to apply, you should use other transform 
function values instead.
```CSS
.element {
  transform: matrix();
  transform: matrix3d();
}
```

### Benefits of transforms
Transforms can be used to animate a page with CSS. They can also be hardware-accelerated via a device’s GPU.

## CSS Transitions
CSS Animations and Transitions rely on the concept of animatable properties, and all CSS properties are animatable unless otherwise specified. CSS transitions 
let you animate a change from an element’s initial state to an end state. `transition` has four main properties -
- `transition-property` - This determines what CSS property will be transitioned. In this case it is the background-color.
- `transition-duration` - This determines the duration that the transition will occur over. In this case the color change will gradually happen over 1 second.
- `transition-timing-function` - This lets us change the speed of the transition over the course of its duration. Here it will ease-out, meaning the color 
    change will be faster at the start than at the end of the transition.
- `transition-delay` - This determines the delay at which the transition will start. In this case, the color change starts a quarter of a second after the 
    cursor rests on the button.

```CSS
/* Long definition */
button {
  /* ... other CSS properties ... */
  transition-property: background-color;
  transition-duration: 1s;
  transition-timing-function: ease-out;
  transition-delay: 0.25s;
}
```

The transition properties can be abbreviated in css and written as
```CSS
/* shorthand definition */
button {
  /* ... other CSS properties ... */
  background-color: white;
  transition: background-color 1s ease-out 0.25s;
}
```
---
> [!Tip]
> You should keep your animations to only affecting `opacity` and `transform` if you want absolute best performance for animations on your web page.
---

Stacking context (z-index) is a three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user, who is assumed to be 
facing the viewport or the webpage.
