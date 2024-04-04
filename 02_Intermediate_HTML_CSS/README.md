### Forms
- Forms have multiple actions and methods
    - actions can be endpoints e.g `form-home:com/signup`. If we leave the action attribute blank, 
    we’re telling the form to submit to the same URL. 
    - methods are for request types e.g `post`, `get` etc

- input are form children elements just like `<li>` are `<ul>` children elements.
    - input elements can be defined like self-closing elements or not.
    - They have attributes like `type` e.g *text*, *email*, *date*, *password*, *website* etc.
        - Use `type="number"` only for **incremental fields**, for example, the quantity of a product. 
        Browsers show an **up/down arrow** for type="number" which makes no sense for payment card 
        numbers. You can use `inputmode="numeric"` to show an optimized on-screen keyboard for 
        entering numbers.
    - `placeholder` e.g *John Doe...* are used as place holder text before the user enters input.
    - `autocomplete` can be used to indicate entries where the form can be autocompleted by the browser.
    - input elements also have a `name` attribute. This serves as the key of each of the 
    form input values when the form is submitted as a json request. Omitting the name 
    attribute can lead cause omission of the input from the json request. The name can
    be set to the same value as the id.
    - **radio** buttons are a type of input for forms that can be specified with `type="radio"`.
    They allow us to create multiple options that the user can choose one of. 
        - Multiple options for radio buttons are grouped by associating all radio buttons 
        with the `name` attribute.
        - Unlike text fields, the user can’t enter custom values into a radio button, which is why each one of them needs an explicit `value` attribute.
        - The default selection is made with the `checked` attribute.
        ```html
        <div>
            <input type="radio" id="adult" name="ticket_type" value="adult" checked>
            <label for="adult">Adult</label>
        </div>
        ```
    - **checkboxes** are like radio buttons with the exception that they allow users to choose
    multiple options from preselected choices. They can be created by setting `type="checkbox"`, 
    they are grouped by `name`,the `value` is preset, and the `checked` attribute is used for selection.

- input elements can be linked to `labels` by their id.
    - When limked, if you click on a label element that is associated with an input form,
    it will focus the cursor on that input.
    - labels have attributes like `for` which should be the same as the associated input `id`.

- You can also include ***multi-line inputs*** in forms using a `textarea` element e.g. 
`<textarea rows="20" cols="60"></textarea>`.

- Selection allow users to choose options from a predefined list. This is implemented using the 
`select` element that has children elements `option`.
    ```html
    <select name="Car">
        <option value="mercedes">Mercedes</option>
        <option value="volvo" selected>Volvo</option>
    </select>
    ```
    - All the option elements should have a `value` attribute (otherwise the text content inside is used).
    - one of the options to be the default selected element when the browser first renders the form by giving one of the options the `selected` attribute.
    - We may also split the list of options into groups using the `<optgroup>` element. The optgroup element takes a `label` attribute which the browser uses as the label for each group:

    ```html
    <select name="fashion">
        <optgroup label="Clothing">
            <option value="t_shirt">T-Shirts</option>
            <option value="sweater">Sweaters</option>
        </optgroup>
        <optgroup label="Foot Wear">
            <option value="sneakers">Sneakers</option>
            <option value="boots">Boots</option>
        </optgroup>
    </select>
    ```


### Form Buttons
- Buttons are another type of form elements used for a variety of purposes. Like inputs, they can have 
`type` attributes. Examples of button types are *submit*, *reset*, or *button*. The type attribute has 
a value of submit by default
    - submit button sends the values of the form to the backend.
    - reset button clears all the data the user has entered into the form.
    - button is a generic button use in interactive mode with JS.

### Organizing Form Elements
- The `fieldset` element is a container element that allows us to group related form inputs into one logical unit.
    ```html
    <fieldset>
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name">

        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name">
    </fieldset>
    ```

- The `legend` element is used to give field sets a heading or caption so the user can see what a grouping of inputs is for.
    ```html
    <fieldset>
        <legend>Contact Details</legend>

        <label for="first_name">First Name</label>
        <input type="text" id="name" name="name">

        <label for="phone_number">Phone Number:</label>
        <input type="tel" id="phone_number" name="phone_number">
    </fieldset>
    ```

### Form Validation
Forms can be validated with either CSS or JS. We can target form controls that have passed or 
failed validations using the `:valid` and `:invalid` pseudo-classes.

#### CSS Validation types
- Input from forms can be validated by setting the `required` attribute. 
- Other validation types include `minlength` and `maxlength` which specify the minimum and maximum 
length of textual data (strings). This is used for character lenght on social media apps.
- `min` and `max` values can also be used as validation for number type of inputs. E.g. in a e-commerce
website, it allows you to specify the min or max orders depending on inventory or customer minimum
purchase quantity.
- `pattern` attribute can also be used to specify a regular expression *regex* that defines a pattern the entered data needs to follow. An example of using a pattern for a card expiration date, and US zipcode
that allows (5 numbers followed by an optional dash and 4 more numbers). Additional pattern examples 
can be found [here](https://www.html5pattern.com/Names).

    ```html
    <label for="expiration">
      <span>Expiration date:</span>
      <strong><span aria-label="required">*</span></strong>
    </label>

    <input
      type="text"
      id="expiration"
      name="expiration"
      required
      placeholder="MM/YY"
      pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$" />
    
    <label for="zip_code">Postal / Zip Code:</label>
    <input
        type="text" 
        id="zip_code" 
        name="zip_code" 
        pattern="(\d{5}([\-]\d{4})?)" 
        required
        placeholder="65251">
    ```
- For number fields (i.e. `<input type="number">`), the `min` and `max` attributes can be used to provide a range of valid values. If the field contains a value outside this range, it will be invalid.

#### JS Validation
JS allows customization of look and feel of native error messages. It can be implemented using the `Constraint Validation API`. An example of JS validation is shown below.
```html
<form>
  <label for="mail">
    I would like you to provide me with an email address:
  </label>
  <input type="email" id="mail" name="mail" />
  <button>Submit</button>
</form>
```
```JS
const email = document.getElementById("mail");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});
```

Additional details on form validation can be found [here](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation). 
<br><br>

Desktop layout for css can be specified with media queries e.g
```CSS
@media only screen and (min-width: 700px) {
    /* CSS for desktop */
    .legacy-form-row {
        margin-bottom: 10px;
    }
}
```