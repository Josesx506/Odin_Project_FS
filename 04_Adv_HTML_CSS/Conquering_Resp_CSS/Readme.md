### Conquering Responsive Layouts by Kevin Powell [\[Link\]](https://courses.kevinpowell.co/view/courses/conquering-responsive-layouts)
21 day responsive layout CSS challenge


### Review of first week
- Percentages should be used for width rules to prevent adjust designs too much for small screens
- `max-width` should be set alongside percentage to prevent the page/text from getting too long on wide screens
- Avoid setting height arguments to CSS rules.
- In mobile view elements become typically longer on the screen, be wary of using `vh` and ensure `@media` queries are used to properly capture changes
- Why you shouldn't use `em` for `fontsizes` (use root em `rem`), because they compound on each other for nested child elements.
- `em` is useful for setting padding and margin because that only references the target element's fontsize. If rem is used for the fontsize to eliminate the 
    *compounding effect*, em is useful for creating dynamic padding and margins.
- Default `rem` value is 16px. It is a global variable except you manually change it in the `::root{}` argument. `rem` is great for fontsizes but not so 
    good for setting margin and padding arguments because it doesn't change as dynamically as em.

### Review of second week
- `<div>`s have a default width of 100%.