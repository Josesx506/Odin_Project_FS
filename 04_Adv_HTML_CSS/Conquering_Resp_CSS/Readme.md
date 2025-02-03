### Conquering Responsive Layouts by Kevin Powell [\[Link\]](https://courses.kevinpowell.co/view/courses/conquering-responsive-layouts)
21 day responsive layout CSS challenge

- [Week 1](#review-of-first-week)
- [Week 2](#review-of-second-week)
- [Week 3](#review-of-third-week)


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
- When putting an image as a child into a flex container, flex automatically stretches/shrinks the image to match the text size, workarounds include wrapping 
    the image in a `<div>` so the div container is stretched but the image dimensions are preserved, or using `justify/align-self` to modify the img behaviour.
- Giving all images on a page a `max-width: 100%` ensures that they never grow outside a container such as extending outside div near edges.
- `flex-flow` argument combines flex-direction and flex-wrap into a single command.
- `align-content` behaves like justify-content and clashes with align-items. Best applied when you have **more** than 1 row or column to arrange.
- Every element is a flex container is a flex item, just saying. `flex-grow` and `flex-shrink`, 0 is false, any value > 1 is magnitude of growth/shrink.
    e.g flex-grow 4 would grow the item at a faster rate than flex-grow of 2. Same concept applies to shrink. `flex-basis` is the typical flex size e.g 250px.
- `flex` is a shorthand argument for grow, shink, and basis together e.g. `flex: 0 2 250px` means don't grow, shrink twice as fast, with a typical size of 250px.
- When using `display:grid`, if you explicityly declare grid-template-rows, avoid also declaring columns and vice versa. Makes it easier to handle.
    Also easier to avoid setting grid-template-rows as much as we avoid setting element heights.
- grid-row is shorthand for grid-row-start and grid-row-end. Same for columns. You don't have to explicity set line numbers like `grid-row: 1 / 3`, you 
    can use dynamic arrangements like `grid-row: 1 / span 2`, start at row 1 and occupy 2 columns.
- `grid-template-areas` is complex for initial setup but works great for dyanmic sizing. It starts with assigning variables for where you want each section to be with 
    strings on the grid container. Columns stay on the same line, and rows are broken into separate lines. This definition can be specified for different media queries too
    ```CSS
    .container {
        display: grid;
        grid-template-areas: 
            'one'
            'two'
            'three';
    }
    @media (min-width: 50em) {
        .container {
            grid-template-areas: 
                'one one'
                'two three';
        };
    };
    /* Assign the variables to children without strings */
    .container.item1 {
        grid-area: one;
    }
    .container.item2 {
        grid-area: two;
    }
    .container.item3 {
        grid-area: three;
    }
    ```
    What this example shows is a simple default view of 3 rows where the items are arranged on top of each other like flex-direction:column. At larger screens, we want the 
    first child to span 2 columns, and the remaining 2 ichildren to span 1 column each on the lower row. The flexibility it gives is that you can easily arrange complex 
    items in a grid, without worrying too much about your initial arrangement because the variable assignments helps you drag and drop elements across your entire layout.
    **NOTE**: The template are assignment uses strings and must end with a semi-colon but the variables assignment does not use strings.
- `grid-template-areas` automatically resizes the row and column sizes to make it fit your definitions but you can use `grid-auto-rows: 1fr` or columns to ensure that all 
    columns or rows have the same size.
- To push a single item in a list to the right (set a different className), set the `margin-left: auto`. This pushes that item, and any other items below it to the right. 
    `margin-right: auto`, pushes all other items in the list above the target element to the left. `margin: 0 auto` centers an elemnt, because both auto margins pushes the 
    element towards the middle.
- If you have 2 items in a flex container with *justifiy-content: space-between*, you can set `margin: 0 auto` to center any one of the items, allowing you to combine flex 
    and margin positioning.


### Review of third week
- Minimize media queries as much as possible and always try to use the minimum amount of breakpoints. 
- Interact with the page in DevTools, and insert breakpoints at screen-sizes where the design begins to fall apart.
> Remember, users don't switch the screen sizes and target getting a responsive design with just enough breakpoints.
- Common breakpoints are 600px, 900px, 1200px, and 1800px if you plan on giving the giant-monitor people something special. 