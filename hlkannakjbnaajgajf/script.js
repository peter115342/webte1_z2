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

    if (!inputField.value.trim()) {
        showError("This is a required field!", errId);
        inputField.style.borderColor = "rgb(179, 6, 6)";
        inputField.style.borderWidth = "4px";
        return 1;

    } else {
        hideError(errId);
        inputField.style.borderColor = "rgb(0, 70, 68)";
        inputField.style.borderWidth = "3px";
        return 0;

    }
}
    function ageAnnotationShow(errId) {
        showError("Age is determined automatically.", errId);
    }
    function ageAnnotationHide(errId) {
        hideError(errId);
    }


    function checkRequiredFields(formId, buttonId) {
        const form = document.getElementById(formId);
        const requiredFields = form.querySelectorAll('[required]');
        for (const field of requiredFields) {
            if (!field.value.trim()) {
                hideSubmitButton(buttonId);
                console.log("0");
                return 0;
            }
        }
        showSubmitButton(buttonId);
        console.log("1");
        return 1;

    }


    function showSubmitButton(buttonId){
        let button = document.getElementById(buttonId)
        button.visibility = "visible";
    }
    
    function hideSubmitButton(buttonId){
        let button = document.getElementById(buttonId)
        button.visibility = "hidden";
    }


