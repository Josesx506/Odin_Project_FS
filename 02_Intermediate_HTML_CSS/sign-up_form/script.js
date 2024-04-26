const contactForm = document.getElementById("contactForm");
const submitBtn = document.querySelector("#myFormSubmit");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const mismatchText = document.getElementById("passwordMismatch");

password.addEventListener("keyup", validate_password)
confirmPassword.addEventListener("keyup", validate_password)

function validate_password(e) {
    if (confirmPassword.value !== password.value) {
        password.classList.add("invalid");
        confirmPassword.classList.add("invalid");
        mismatchText.style.display = "block";
        password.style.borderColor="lightcoral";
        confirmPassword.style.borderColor="lightcoral";
    } else {
        password.classList.remove("invalid");
        confirmPassword.classList.remove("invalid");
        mismatchText.style.display = "None";
        password.style.borderColor="#E5E7EB";
        confirmPassword.style.borderColor="#E5E7EB";
    }
};


contactForm.noValidate = false;

submitBtn.addEventListener("click", validateForm)

function validateForm(e) {
    let form = e.target;
    if (form.checkValidity()) {
        // form is valid - make further checks
        form.submit()
      }
      else {
        // form is invalid - cancel submit
        e.preventDefault();
      }
}