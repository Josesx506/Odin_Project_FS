# Content
- [Transforms](#css-transforms)
- [Transitions](#css-transitions)
- [Animations](#css-animations)

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
> You should restrict your animations to only affect `opacity` and `transform` if you want absolute best performance for animations on your web page.
---

Stacking context (z-index) is a three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user, who is assumed to be 
facing the viewport or the webpage. <br>

### Differences between Transitions and Animations
- Transitions were designed to animate an element from one state to another. 
- They can loop, but they weren’t designed for that. Transitions need a trigger, such as the use of pseudo-classes like `:hover` or `:focus`, or by 
  adding/removing a class via JavaScript. 
- Transitions are not as flexible as using animations.

Both animations and transitions have their use cases and best judgement is required to avoid overkill.


## CSS Animations
Animations were designed with the purpose of explicitly enabling loops. They can work without triggers and can start running immediately the page loads.
`animate` has four main properties
- `animation-duration` - length of an animation cycle following which it will restart.
- `animation-name` - custom variable name of the animation rules. Must match the name assigned in `@keyframes` argument.
- `animation-iteration-count` - number of animation cycles. Can be an integer or *infinite*.
- `animation-direction` - This property decides if our animation should *alternate* direction on the completion of one cycle, or reset to the start point and 
  repeat itself. Valid arguments are `normal; reverse; alternate; alternate-reverse;`. Using normal or reverse starts the animate from the beginning or end, 
  and skips the animation back to the beginning immediate. Using alternate allows the animation to start from 0->100,100->0,0->100 etc. This avoids jumping 
  back to the beginning at the end of each animation loop and makes it smoother. alternate-reverse is similar to alternate but begins the animation from the 
  end.

```CSS
/* Long definition */
#ball {
  /* ... other CSS properties ... */
  animation-duration: 2s;
  animation-name: change-color;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

**`@keyframes`** define the sequence of rules for each animation loop. A keyframe requires a variable name, initial rule defined with `from`, final rule 
defined with `to`, and intermediate rules can be defined by specifying the value *at* each percentage of the loop. *from* and *to* are aliases for `0%` 
and `100%` respectively. The `!important` declaration in a keyframe can be used to suppress a rule you don't want to include. Seems easier to delete or 
comment out the rule in my opinion.

```CSS
@keyframes change-color {
  from {
    background-color: red;
  }
  
  33% {
    background-color: yellow;
  }
  
  66% {
    background-color: aqua;
    transform: scale(1.5) !important;
  }

  to {
    background-color: green;
  }
}
```
In the example above, we want to change the background color of the ball element from `red -> yellow -> aqua -> green` in each animation loop. Additional 
rules like `transform: scale(1.5);` can also be applied to any of the keyframe timestamps. The definiition of the animation can also be shortened to 

```CSS
#ball {
  /* ... other CSS properties ... */
  animation: change-color 2s infinite alternate;
}
```

Additional animation properties include
```CSS
.element {
  animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];
}
```
`timing-function` uses generic timing functions like transition properties e.g ***ease-in,ease-out,ease-in-out*** etc.