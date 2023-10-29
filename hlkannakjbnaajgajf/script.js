function fillEmail() {
    var value = document.getElementById("first_name").value + " " + document.getElementById("last_name").value;
    var email = document.getElementById("email_field").value;

    document.getElementsByValue("from")[0].value = email;
    document.getElementsByValue("sender")[0].value = value;

}

const summary  = document.getElementById('summary');
const closeSummary = document.getElementById('close_summary');
const form = document.getElementById('main_form');
function setFormResult(content) {
    const resultContent = document.getElementById('summary_content');
    resultContent.innerHTML = content;
  }
  let submitConfirm  = false;

  form.addEventListener('submit', (event) => {
    if(!submitConfirm){
    event.preventDefault();
    const formData = new FormData(form);
    let content = '<p><strong>Form Results:</strong></p>';
    for (const [key, value] of formData) {
        const field = form.querySelector(`[name="${key}"]`);
        if (field && field.type !== 'hidden') {
          if (!(field.tagName === 'TEXTAREA' && value.trim() === '')) {
            content += `<p>${key}: ${value}</p>`;
          }
        }
    }
    submitConfirm = true;
    setFormResult(content);
    }
});
  document.getElementById('main_form').onsubmit = function (e) {
    if (!checkFields()) {
        e.preventDefault();
    }
    else if(submitConfirm){
        return true;
    }
    else{
        e.preventDefault();
        summary.showModal();
    }
};

function closeModal() {
    const dialog = summary
    if (dialog) {
      dialog.close();
      submitConfirm = false;
    }
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

function checkRegex(field, errId) {
    const currField = document.getElementById(field);
    const value = currField.value;
    let regex = /^[A-Za-z]+$/;
    if(value.trim()){
    if (currField.type === 'email') {
        regex = /^[\w-]{3,}(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-zA-Z]{2,})$/;
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
                if (field.type === 'text' || field.type === 'email' || field.type === 'date' || field.type === 'tel') {
                    const errorElement = document.getElementById(field.id + "_err");
                    if (!field.value.trim() && field.id !== "hiddenTextField") {
                        if (errorElement) {
                            showError("This is a required field!", errorElement.id);
                            field.style.borderColor = "rgb(179, 6, 6)";
                            field.style.borderWidth = "4px";
                        }
                        fail_flag = 1;
                    }

                    else if (field.type !== 'date' ) {
                        if(field.id !== "age_field" && field.id !== "price_field" && field.id !== "hiddenTextField"){
                            if (!checkRegex(field.id, errorElement.id)) {
                            fail_flag = 1;
                        }
                    }
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

                if (dateOfBirth > today) {
                    age = 0;
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

        if (selectedType === "Family") {
            const modelOptions = ["Boring Crossover", "Massive Station Wagon", "Luxury Limousine"];
            addOptionsToSelect(modelSelect, modelOptions);
        } else if (selectedType === "Sporty") {
            const modelOptions = ["Light and Nimble", "V10 Exotic", "Fast Executive sedan"];
            addOptionsToSelect(modelSelect, modelOptions);
        } else if (selectedType === "Utility") {
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
            const planOptions = ["Daily Commute", "Grocery Shopping", "Roadtrip"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Massive Station Wagon") {
            const planOptions = ["IKEA Haul", "Daily Commute", "Roadtrip"];
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
            const planOptions = ["Late to Work Meeting", "Reckless Drifting", "Roadtrip"];
            addOptionsToSelect(planSelect, planOptions);
        }
        else if (selectedModel === "Basic Pickup") {
            const planOptions = ["Durability Test", "Farm Work", "Off-Roading"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "Electric Van") {
            const planOptions = ["IKEA Haul", "Moving houses", "Saving The Planet"];
            addOptionsToSelect(planSelect, planOptions);
        } else if (selectedModel === "People Carrier") {
            const planOptions = ["Roadtrip", "Daily Commute", "Grocery Shopping"];
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








    const otherCheckbox = document.getElementById('other-box');
        const otherText = document.getElementById('other-option');

        otherCheckbox.addEventListener('change', function() {
            if (otherCheckbox.checked) {
                otherText.style.display = 'block';
            } else {
                otherText.style.display = 'none';
                otherText.value = '';
            }
        });



        const additionalSelect = document.getElementById("additional");

        const optionsByGender = {
            male: ["Sport Package", "Rugged Work Package"],
            female: ["Child Seat", "Pet-friendly Package"],
        };

        function updateAdditionalOptions() {
            const genderSelect = document.querySelector('input[name="Gender"]:checked');
            const selectedGender = genderSelect.value;
            additionalSelect.innerHTML = "";

            const options = optionsByGender[selectedGender] || [];

            options.forEach((option) => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                additionalSelect.appendChild(optionElement);
            });
        }

        updateAdditionalOptions();

        document.querySelectorAll('input[name="Gender"]').forEach((radio) => {
            radio.addEventListener("change", updateAdditionalOptions);
        });




        function navigateToPage() {
            window.location.href = 'index.html';
        }





const price = document.getElementById('price_field');

const carModelSelectPrice = {
    "Boring Crossover": 75 ,
    "Massive Station Wagon": 90,
    "Luxury Limousine": 105,
    "Light and Nimble" : 150,
    "V10 Exotic": 180,
    "Fast Executive sedan": 175,
    "Basic Pickup": 85,
    "Electric Van": 95,
    "People Carrier" : 90,
};

const carPlanSelectPrice = {
    "Daily Commute": 25,
    "Grocery Shopping": 20,
    "Roadtrip": 30,
    "IKEA Haul": 35,
    "Important Business Meeting": 30,
    "Long Motorway Journey":35,
    "Wedding": 40,
    "Track Day": 70,
    "Mountain Roads": 60,
    "Just Having Fun":  55 ,
    "Impress My Friends": 90,
    "Go Very Fast and Crash": 2000,
    "Late to Work Meeting": 60,
    "Reckless Drifting": 75,
    "Durability Test":80,
    "Farm Work": 70,
    "Off-Roading": 80,
    "Moving houses":60,
    "Saving The Planet":30,

};

function calculateTotalPrice() {
    const modelSelectCurr = modelSelect.value;
    const selectedPlanCurr = planSelect.value;

    const modelPrice = carModelSelectPrice[modelSelectCurr];
    const planPrice = carPlanSelectPrice[selectedPlanCurr];

    const total = modelPrice + planPrice;
    price.value= total;
    price.textContent = total;
}

modelSelect.addEventListener('change', calculateTotalPrice);
planSelect.addEventListener('change', calculateTotalPrice);
typeSelect.addEventListener('change', calculateTotalPrice);

calculateTotalPrice();



const showName = document.getElementById('name_button');
const hiddenTextField = document.getElementById('hiddenTextField');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');

let isTextFieldVisible = true;
loadHiddenField();
showName.addEventListener('click', function() {
    loadHiddenField();
        if (isTextFieldVisible) {
        hiddenTextField.style.display = 'none';
        isTextFieldVisible = false;
    } else {
        hiddenTextField.style.display = 'block';
        isTextFieldVisible = true;
    }
});
function loadHiddenField(){
    hiddenTextField.value = first_name.value + ' ' + last_name.value;
}
first_name.addEventListener('change',function() {
loadHiddenField();
});
last_name.addEventListener('change',function() {
    loadHiddenField();
});