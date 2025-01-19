### Responsive Design
Responsive Web Design is a set of techniques you can use to make your sites work on any size screen. The smallest screensize to develop 
for is typically *320px*.

Add this snippet into the <head> of your HTML file in just about every project you work on. <br>
<meta name="viewport" content="width=device-width, initial-scale=1">
It sets the initial width of the webpage to the size of the actual screen you’re viewing it on, and telling it not to zoom in or out. Easy!


Recommendations for Responsive Design
- ***Avoid fixed width and height*** - Use max-width or min-height instead. <br>
    In most cases, you should avoid setting a height altogether. There are some exceptions to this rule (headers and footers perhaps) but you 
    should prefer using margin and padding to increase space around your content.
- ***Use flex and grid*** - flexbox was created to enable the creation of flexible layouts. Using flex and grid doesn’t necessarily guarantee 
    perfect responsiveness. Helpful tools like flex's `flex-wrap` and grid’s `minmax`, `auto-fill` can be used to improve responsiveness.

> [!Tip]
> To centralize a container, use `margin: 0 auto;`.

### em vs rem
The default fontsize of most browsers is `16px` using `5em = 16px * 5 = 80px`. When **`em`** fontsize is used on a child element, it first references 
the fontsize of the parent element. If the parent element doesn't have a fontsize rule, it uses the default browser font size. If the parent 
element has a font-size, it inherits the parent element fontsize. <br>
- If a child and grand-child elements use `em`, and the parent element has a fixed fontsize e.g. 20px. 
- The child element first inherits the parent's fontsize e.g 2em = 20px * 2 = 40px. 
- Then the grandchild element also inherits the child element fontsize e.g. 2em = 40px (child) * 2 = 80px.

When using `em` in *margin* or *padding* arguments, it always calculates the sizes relative to the fontsize of the target element. e.g building from our 
previous example of the grandchild element
```CSS
.grand-child {
    fontsize: 2em; /* 80px */
    margin-bottom: 0.5em; /* references 80px. trueSize = 80px * 0.5 = 40px */
    
}
```

The inherited behaviour from parent/target elements can make using `em` in elements problematic, however, it can be useful in some situations e.g. when 
padding buttons, setting the padding relative to the button fontsize allows it to resize dynamically
```CSS
.btn-click {
    font-size: 0.5em; /* Assuming no parent inheritance */
    padding: 1em 3em;
}
```

<br><br>

**`rem`** - root em attempts to fix the issues of em. It allows you to always reference your root element when setting fontsizes. Again the default is 
16px but it can be altered in css
```CSS
html {
    font-size: 16px; /* or 1em or any preferred value */
}
```
This prevents inheritance from parent/target elements allowing you to reference a size that is a global variable.

A good explanation video for both fontsize types from Kevin Powell can be found [here](https://www.youtube.com/watch?v=_-aDOAMmDHI). 