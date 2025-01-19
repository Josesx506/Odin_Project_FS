### Responsive Design
- [Recommendations](#recommendations-for-responsive-design)
- [em vs rem](#em-vs-rem)
- [Responsive Images](#responsive-images)
- 


Responsive Web Design is a set of techniques you can use to make your sites work on any size screen. The smallest screensize to develop 
for is typically *320px*.

Add this snippet into the <head> of your HTML file in just about every project you work on. <br>
<meta name="viewport" content="width=device-width, initial-scale=1">
It sets the initial width of the webpage to the size of the actual screen you’re viewing it on, and telling it not to zoom in or out. Easy!


### Recommendations for Responsive Design
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


### Responsive Images
The most basic problem for responsive images is the aspect ratio. If the image width is shrinked from smaller screens, always set the `height: auto;`. <br>
`background-position` and `background-size` are properties that work on elements with a background image, and do not work on normal `<img>` tags. For example, 
`background-position: center` will make sure the image is always centered in its container, even if the container is too small to fit the whole image. 
`background-size: cover` will resize the image so that it is always completely filling its container while cropping as little as possible. <br><br>

`object-fit` works similarly, but is meant for `img` tags. With the object-fit property you can specify a width and height for your images and then tell an 
image how it is supposed to fit itself to those dimensions. The default value for object-fit is `fill`, which stretches the image to fit the dimensions, but 
much like `background-size` you can also tell it to `cover` or `contain` the image. <br>

It is also possible to literally use different images for different screen sizes. You can present a cropped version of an image on smaller screens in two ways 
and the most flexible way is using the `<picture>` tag. The `<picture>` element is a wrapper containing several `<source>` elements that provide different 
sources for the browser to choose from, followed by the all-important `<img>` element.
```HTML
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```
The source-set allows it to load smaller versions of a file for smaller screens and vice-versa. The img tag includes the default value before any media queries 
are run. <br><br>
> When the browser starts to load a page, it starts to download (preload) any images before the main parser has started to load and interpret the page's CSS 
and JavaScript. That mechanism is useful in general for reducing page load times, but it is not helpful for responsive images — hence the need to implement 
solutions like `srcset`. For example, you couldn't load the `<img>` element, then detect the viewport width with JavaScript, and then dynamically change the 
source image to a smaller one if desired. By then, the original image would already have been loaded, and you would load the small image as well, which is 
even worse in responsive image terms.


### Media Queries
The basic syntax for media queries is as follows:
```CSS
body {
  margin: 24px;
}

@media (max-width: 600px) {
  body {
    margin: 8px;
  }
}
```
In the above example, the margin is changed based on screen size. Specifically, on all screens below or equal to `600px`, the margin will be `8px`, and on all 
screens above `600px`, it will be `24px`. <br>

It is possible to create an unlimited number of media queries for every possible screen size. However, it is `best` to ***minimize*** your media-query usage and 
rely more on the natural flexibility of your layouts. 

#### Breakpoints
***Breakpoint*** is the term for the screen size that triggers your media query. You will find quite a lot of differing opinions on what exactly your breakpoints 
should be. In general, it’s helpful to think about the kinds of devices and screens that your users will be using. Mobile phones are usually under `500px`. Tablets 
are often between `500px` and `1000px`. Anything larger than `1000px` is likely to be a normal browser screen. Super wide screens are also becoming more common, 
which means that your site could end up being viewed on a screen wider than `2000px`! <br>

This does not mean that you should just start your project with media queries for each device. Each project is going to have different requirements based on the 
design you’re trying to achieve. As mentioned above, try to limit your breakpoints to just what you need. With many relatively basic layouts, you can get by with 
**only one** mobile-centric breakpoint somewhere around `500-600px`. More complex layouts might benefit from doing a full-sized layout above `1200px`, an altered 
“tablet” layout between `600px` and `1200px` and mobile below `600px`. The real takeaway here is that it doesn’t really matter exactly where you set your 
breakpoints, just do what makes sense for your project.