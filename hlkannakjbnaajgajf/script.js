function fillEmail() {
    var name = document.getElementById("first_name").value + " " + document.getElementById("last_name").value;
    var email = document.getElementById("email_field").value;

    document.getElementsByName("from")[0].value = email;
    document.getElementsByName("sender")[0].value = name;

}
  document.getElementById('main_form').onsubmit = function (e) {
    if (!checkFields()) {
        console.log(" submit failed");
        e.preventDefault();
    }
    else{
        console.log(" submit success");
    }
};
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

    function checkFields() {
        const form = document.getElementById('main_form');
        if (form) {
            for (let i = 0; i < form.elements.length; i++) {
                const field = form.elements[i];
                if (field.type === 'text' || field.type === 'email' || field.tagName === 'TEXTAREA') {
                    if (!field.value.trim()) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            console.error('Form not found.');
        }
    }



    document.addEventListener("DOMContentLoaded", function() {
        let birthDate = document.getElementById('birth_field');
        if (birthDate) {
            birthDate.addEventListener("change", (event) => {
                let dateOfBirth = new Date(event.target.value);
                let today = new Date();

                let age = today.getFullYear() - dateOfBirth.getFullYear();
                let month = today.getMonth() - dateOfBirth.getMonth();

                if ( month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
                    age -= 1;
                }

                let ageField = document.getElementById('age_field');
                ageField.value = age;
            });
        }
    });


