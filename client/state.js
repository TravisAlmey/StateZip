let stateData = {};

var selectState;
var zipForm;

const noStateSelected = "Please select a state.";
const noZipSelected = "Please enter a zip code.";
const invalidZip = "The entered zip code is not valid for this state.";

const baseUri = "http://localhost:3000/"

function setOptions(data) {
    let options = Object.keys(data);

    options.forEach(option => {
        let el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        selectState?.appendChild(el);
    })

    selectState.setCustomValidity(noStateSelected);
}

function checkValidity() {
    const division = selectState.value;
    const zip = +(zipForm.value);

    if (!division) {
        selectState.setCustomValidity(noStateSelected);
        return;
    } else {
        selectState.setCustomValidity("");
    }

    if (!zip) {
        zipForm.setCustomValidity(noZipSelected);
        return;
    }

    let validZips = stateData[division];

    if (validZips.includes(zip)) {
        zipForm.setCustomValidity("");
    } else {
        zipForm.setCustomValidity(invalidZip);
    }
}

function loadData() {
    fetch(baseUri, {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }})
        .then((response) => response.json("zip"))
        .then((data) => {
            stateData = data;
            setOptions(data);
        });
}

function submitForm(event) {
    event.preventDefault();

    let formData = {
        state: selectState.value,
        zip: zipForm.value
    };

    fetch(baseUri, {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
}

window.onload = () => {
    loadData();

    selectState = document.getElementById("state");
    zipForm = document.getElementById("zip");

    selectState.onchange = checkValidity;
    zipForm.oninput = checkValidity;

    let stateForm = document.getElementById("wf-form-state");
    stateForm.onsubmit = submitForm;
  }

