### Semantic HTML 
Using semantic HTML is important because it provides meaning and context. This includes using the right tag for elements on a webpage to make 
them accessible, easier to understand, and  navigate. e.g. using the `<button>` element when you want a clickable element, or wrapping a form 
`<input>` element with a descriptive `<label>` element describing what should be entered into the form. Other examples include using the right 
`type=` in an input element for entries like emails, checkboxes, phone numbers etc. <br><br>

`<div>` and `<span>` are  generic containers not associated with any specific meaning. By default, they aren’t focusable and they don’t have 
any event handling by default. Overusing them can confuse some disabled 
users e.g. making a clickable button a div for blind users.

### Headings and landmarks
***Headings*** are the `<h1>` through `<h6>` elements, and like the name implies, these elements act as headings to sections of a page. <br>
***Landmarks***, on the other hand, are HTML elements that act as regions of a page. There are seven native HTML elements that define these 
landmark regions:
- `<aside>`
- `<footer>`
- `<form>`
- `<header>`
- `<main>`
- `<nav>`
- `<section>`

<p align="center">
  <img src="https://cdn.statically.io/gh/TheOdinProject/curriculum/b71f39e8c0934cc6cc80daaae9ed375f00753b09/advanced_html_css/accessibility/semantic_html/imgs/semantic_html_example.png" width=600px><br>
  <span>Webpage image of Odin project showing labeled landmarks</span>
</p>

By properly using landmarks and headings, you provide users of assistive technologies a more operable and understandable page: not only can screen reader 
users navigate a page via landmarks and headings by using navigation keyboard commands (or opening a menu in their screen reader), but these elements 
also have their roles announced to provide additional context. <br><br>

A contrast ratio is the difference in brightness between two colors expressed as a ratio. You can also check the contrast ratio of the text within an element 
using your browser’s dev tools. In **Chrome**, click the “element picker” tool in the Elements tab, then hover over an element on the web page. This displays 
a tooltip showing the contrast ratio under the Accessibility section. You can also view the contrast ratio by selecting an element with text in the Elements 
tab and clicking on the color picker tool for the “color” property in the Styles pane. <br><br>

You need to make sure that any interactive elements are ***focusable*** by and have event handling for keyboards.

### Tab Order
The tab order is the order in which elements on the page will receive focus when pressing the <kbd>Tab</kbd> key, and is by default in the same order as the 
order of elements listed in the HTML file:
```html
<!-- This element is first in the tab order. -->
<div tabindex='0'>This is the first element listed in the HTML.</div>

<!-- This element is second in the tab order. -->
<div tabindex='0'>This is the second element listed in the HTML.</div>
```

You should make sure the tab order matches the visual order of elements. If the tab order is different from the visual order, users could be left confused or 
frustrated trying to navigate the page with a keyboard, expecting one element to receive focus based on the visual layout and instead another element receives focus.

To prevent keyboard focus on hidden elements, give them a `tabindex` of ***-1***. Set the CSS properties for the hidden content container to `display: none` or 
`visibility: hidden` when it is meant to be hidden.