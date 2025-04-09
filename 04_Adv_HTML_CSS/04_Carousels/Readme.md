### Learning how to create accessible carousels with only CSS
Carousels are useful for showing sliding cards, testimonials, projects etc. <br>
I have plans to include them in a number of projects so I thought of implementing them using Kevin Powell's video 
[guide](https://www.youtube.com/watch?v=g03Yldh9Nkw&list=LL&index=1)

### Pseudo-element Naming
- `::scroll-button()` - The buttons on the right and left to toggle the carousel position. They scroll **85%** of a 
    scroll area when pressed. Essentially `<button>` elements under the hood.
- `::scroll-marker()` - The icons below the carousel (circles) that shows the position of the active item. Stateful 
    navigation `<a>` elements that aid in content access


### Preferential Start of Carousel
- Give the list or div item you want to start the carousel on a class name like `scroll-start`. Then update your css with 
    ```css
    .scroll-start {
        scroll-initial-target: nearest;
    }
    ```


### Ensuring the button only increments the active marker by one
If you want the buttons to move exactly one item at a time, use `scroll-snap-type: x mandatory;` combined with 
`scroll-snap-stop: always;` on each snap child e.g.
```css
/* Carousel Items */
.carousel > li {
    scroll-snap-align: center;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
}
```
This alone wouldn't work, especially if your cards are smaller than the image width and more than one card is being shown at 
once. The scroll button scrolls 85% of a scroll area when pressed, and the markers near the edges woukd be skipping. To fix 
this add empty pseudo-elements to the edge of the **carousel** to act like a buffer for the 85% scroll
```css
.carousel {
    ...

    &:before,&:after {
        content: "";
        display: block;
        inline-size: 50cqi;
    }
}
```
This way, the buffer from the pseudo-elements absorbs the scroll-width and makes it navigate each marker in the correct sequence.
> [!Note]
> The buttons are disabled when you get to the last item on both sides of the carousel.
`cqi` and `cqb` are similar to *vw* and *vh*, but instead of caring about the viewport, they care about their containers size. <br>
`cqi` is your inline-size unit (usually width in horizontal writing modes), while `cqb` handles block-size (usually height).


### Anchor positioning for the buttons
The scroll buttons can be positioned using a new css postion method known as anchor positioning, check 
[video](https://www.youtube.com/watch?v=DNXEORSk4GU). 
1. Assign the carousel an anchor name variable, allowing other elements/pseudo-
elements to be attached to it
    ```css
    .carousel {
        anchor-name: --carousel;
    }
    ```
2. Proceed to attach link both scroll-buttons to the anchor. Include a z-index that is higher than the scroll-markers if they 
    intersect each other on smaller screen sizes
    ```css
    .carousel::scroll-button(*) {
        position: absolute;
        position-anchor: --carousel;
        z-index: 2;
    }
    ```
3. Attach individual anchors to the left and right buttons individually, with additional alt text that should be shown as desired
    ```css
    .carousel::scroll-button(left) {
        content: "⬅" / "Left";
        left: anchor(left);
    }
    .carousel::scroll-button(right) {
        content: "⮕" / "Right";
        right: anchor(right);
    }
    ```
    You can also use `position-area: bottom left` or `position-area: bottom right` to position the buttons, but this positions the 
    buttons outide the carousels, and on smaller screens, it bumps onto the edge of the screen. This is useful if you want the 
    buttons to be centered on the right/left, just change *bottom* to `center`. However, if you want the buttons below the carousel,
    Using anchor combined with left and right positions the buttons inside and below the carousel. 


### Animations
In the end, I couldn't figure out how to animate the scrolling of the markers with only css, so I let it be. I managed to get an 
animation script to auto-scroll with JS but it doesn't work well with the markers and buttons, so it should only be used when the 
buttons and markers are hidden.