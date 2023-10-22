function fillEmail() {
    var name = document.getElementById("first_name").value + " " + document.getElementById("last_name").value;
    var email = document.getElementById("email_field").value;
    var age = document.getElementById("age_field").value;

    document.getElementsByName("from")[0].value = email;
    document.getElementsByName("sender")[0].value = name;
    return true;
}

function showError(message,errId) {
    let err = document.getElementById(errId);
    err.style.visibility = "visible";
    err.innerHTML = message;
}

function hideError(errId) {
    let err = document.getElementById(errId);
    err.style.visibility = "hidden";
    err.innerHTML = "";
}

function checkEmpty(field, errId) {
    let inputField = document.getElementById(field);
    let errorField = document.getElementById(errId);

    if (!inputField.value) {
        showError("This is a required field!", errId);
    } else {
        hideError(errId);
    }
}