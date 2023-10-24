function fillEmail() {
    var value = document.getElementById("first_value").value + " " + document.getElementById("last_value").value;
    var email = document.getElementById("email_field").value;

    document.getElementsByvalue("from")[0].value = email;
    document.getElementsByvalue("sender")[0].value = value;

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

function checkRegex(field, errId) {
    const currField = document.getElementById(field);
    const value = currField.value;
    let regex = /^[A-Za-z]+$/;

    if (currField.type === 'email') {
        regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/;
    } else if (currField.type === 'tel') {
        regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    }

    if (!regex.test(value)) {
        showError("Invalid value format!", errId);
        currField.style.borderColor = "rgb(179, 6, 6)";
        currField.style.borderWidth = "4px";
        return false;
    } else {
        hideError(errId);
        currField.style.borderColor = "";
        currField.style.borderWidth = "";
        return true;
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
        let fail_flag = 0;
        if (form) {
            for (let i = 0; i < form.elements.length; i++) {
                const field = form.elements[i];
                if (field.type === 'text' || field.type === 'email' || field.tagName === 'TEXTAREA' || field.type === 'date' || field.type === 'tel') {
                    const errorElement = document.getElementById(field.id + "_err");
                    if (!field.value.trim()) {
                        if (errorElement) {
                            showError("This is a required field!", errorElement.id);
                            field.style.borderColor = "rgb(179, 6, 6)";
                            field.style.borderWidth = "4px";
                        }
                        fail_flag = 1;
                    }
                    else if (checkRegex(field.id, errorElement.id)) {
                        fail_flag = 1;
                    }
                }
            }
            console.log(fail_flag);
            if (fail_flag == 1) {
                return false;
            } else {
                return true;
            }
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





    function updateCharacterCount(inputElement) {
        const maxLength = inputElement.getAttribute("maxlength");
        const characterCount = inputElement.value.length;
        const countElement = document.getElementById(inputElement.id + "_counter");
        countElement.textContent = "   " + characterCount + "/" + maxLength;

        if (characterCount >= maxLength) {
            countElement.style.color = "rgb(255, 85, 0)";
        } else {
            countElement.style.color = "rgb(0, 70, 68)";
        }

    }


    const typeSelect = document.getElementById("type");
    const modelSelect = document.getElementById("model");
    typeSelect.addEventListener("change", updateModels);

    function updateModels() {


        modelSelect.innerHTML = "";

        const selectedType = typeSelect.value;

        if (selectedType === "family") {
            const modelOptions = ["Boring Crossover", "Massive Station Wagon", "Luxury Limousine"];
            addOptionsToSelect(modelSelect, modelOptions);
        } else if (selectedType === "sporty") {
            const modelOptions = ["Light and Nimble", "V10 Exotic", "Fast Executive sedan"];
            addOptionsToSelect(modelSelect, modelOptions);
        } else if (selectedType === "utility") {
            const modelOptions = ["Basic Pickup", "Electric Van", "People Carrier"];
            addOptionsToSelect(modelSelect, modelOptions);
        }
    }

    const  planSelect= document.getElementById("plan");
    modelSelect.addEventListener("change", updatePlans);
    typeSelect.addEventListener("change", updatePlans);

    function updatePlans() {


        planSelect.innerHTML = "";

        const selectedModel = modelSelect.value;

        if (selectedModel === "Boring Crossover") {
            const planOptions = ["Daily Commute", "Grocery Shopping", "Short Roadtrip"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Massive Station Wagon") {
            const planOptions = ["IKEA Haul", "Daily Commute", "Weekend Roadtrip"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Luxury Limousine") {
            const planOptions = ["Important Business Meeting", "Long Motorway Journey", "Wedding"];
            addOptionsToSelect(planSelect, planOptions);
        }
        else if (selectedModel === "Light and Nimble") {
            const planOptions = ["Track Day", "Mountain Roads", "Just Having Fun"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "V10 Exotic") {
            const planOptions = ["Track Day", "Impress My Friends", "Go Very Fast and Crash"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Fast Executive sedan") {
            const planOptions = ["Late to Work Meeting", "Reckless Drifting", "Fun Roadtrip"];
            addOptionsToSelect(planSelect, planOptions);
        }
        else if (selectedModel === "Basic Pickup") {
            const planOptions = ["Durability Test", "Farm Work", "Off-Roading"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Electric Van") {
            const planOptions = ["IKEA Haul", "Moving houses", "Saving The Planet"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "People Carrier") {
            const planOptions = ["Family Roadtrip", "Taking Kids to Football", "Grocery Shopping"];
            addOptionsToSelect(planSelect, planOptions);
        }
    }

    function addOptionsToSelect(select, options) {
        for (const option of options) {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        }
    }

    updateModels();
    updatePlans();


