// This function is used to toggle the header menu
function editNav() {
  const topNav = document.getElementById("mytopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// ------ DOM Elements ------ 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close")
const form = document.querySelector("form")
const modalBody = document.querySelector(".modal-body")
const formBody = document.querySelector(".form-body")
const thanksModalBtn = document.querySelector(".thanks-modal-btn");
const thanks = document.querySelector(".thanks");

// ID for form informations
const tagFirst = document.querySelector("#first")
const tagLast = document.querySelector("#last")
const tagEmail = document.querySelector("#email")
const tagBirthdate = document.querySelector("#birthdate")
const tagQuantity = document.querySelector("#quantity")
const tagLocation = document.getElementsByName("location")
const tagCheckbox = document.querySelector("#checkbox1")
const tagCheckbox2 = document.querySelector("#checkbox2")

// ID for error alert Message
const messageFirst = document.querySelector("#message-first")
const messageName = document.querySelector("#message-name")
const messageMail = document.querySelector("#message-mail")
const messageDate = document.querySelector("#message-date")
const messageQuantity = document.querySelector("#message-quantity")
const messageLocation = document.querySelector("#message-location")
const messageCG = document.querySelector("#message-cg")


// ----- Other Variable ------
let errorDetected = false
const currentDate = new Date()
const formErrors = { shortName : "Il faut au minimum 2 charactères.",
                   badName : "Un caractère n'est pas reconnu. Merci de corriger.",
                   badEmail : "Veuillez renseigner une adresse mail valide.",
                   tooYoung : "Vous devez avoir plus de 18 ans pour participer",
                   futureMan : "Etes vous vraiment né dans le futur ?",
                   badDate : "Veuillez renseigner une date valide.",
                   badQuantity : "Veuillez renseigner un nombre.",
                   noCity : "Merci de selectionner une ville.",
                   refuseCG : "Merci d'accepter les conditions d'utilisation."}  

                   
// ------ Regular Expression RegEx ------
// "Accepts uppercase, lowercase, accented characters, spaces (\s), apostrophes, and hyphens."
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$")
const twoOrMoreRegEx = /.{2,}/;
const numberRegEx = /^\d+$/;
/*  Date format is YYYY-MM-DD 
* Year starting by 19 or 20 follow by two decimals
* Month from 01 to 12 
* Days 0 to 9 /  10 to 29 / 30 and 31 
*/
const dateRegEx = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$") 

// ------ Event listener for open and close modal  ------ 
modalBtn.forEach(launchBtn => {launchBtn.addEventListener("click", launchModal);})
closeBtn.addEventListener("click", closeModal); 

// This function display the modal  
function launchModal() {modalbg.classList.remove("hidden");}

// This function hide the modal 
function closeModal() {
 modalbg.classList.add("hidden");   
}
// ------ Event listener for close thanks  ------ 
thanksModalBtn.addEventListener("click", closeThanks); 

// This function display the thanks  
function launchThanks() {
  thanks.classList.remove("hidden");
}

// This function hide the thanks 
function closeThanks() {
 thanks.classList.add("hidden");   
}

/** All Check informations Function **/

/** This function check that the name / firstname are 
 *  - using normal letters 
 *  - have more than 2 letters
 *  Received two parameters : 
 * {firstOrName} Name or FirstName 
 * {messageLoc} output message location  
 */
function checkName(firstOrName,messageLoc) {
  if (!twoOrMoreRegEx.test(firstOrName)) {
    messageLoc.innerText = formErrors.shortName;
    errorDetected = true;
  } else if (!nameFirstRegEx.test(firstOrName)) {
      messageLoc.innerText = formErrors.badName;
      errorDetected = true;
    }
  else {
    messageLoc.innerText = "";
  }
}

// This function Check that email is correct 
function checkEmail(email) {
    if (!emailRegEx.test(email)) {
      messageMail.innerText = formErrors.badEmail;
      errorDetected = true;
  }
  else {
    messageMail.innerText = "";
  }
}

/**
 * This function check that the birthdate :
 * - use normal numbers
 * - the user is not under 18 years old
 * - the user birthday is not after current date
 */
function checkBDate(date) {
  const today = new Date();
  const birthDate = new Date(date);
  
  let userAge = today.getFullYear() - birthDate.getFullYear();
  let monthCount = today.getMonth() - birthDate.getMonth();
  if (monthCount < 0 || (monthCount === 0 && today.getDate() < birthDate.getDate())) {
    userAge--;
  }

  if (!dateRegEx.test(date)) {
    messageDate.innerText = formErrors.badDate;
    errorDetected = true;
  } else if ( userAge < 0 ) {
    messageDate.innerText = formErrors.futureMan;
    errorDetected = true;
  } else if ( userAge < 18 ) {
    messageDate.innerText = formErrors.tooYoung;
    errorDetected = true;
  } else {
    messageDate.innerText = "";
  }
}

// This function check that the participation is a number.
function checkQuantity(quantity) {
  if (!numberRegEx.test(quantity)) {
    messageQuantity.innerText = formErrors.badQuantity;
    errorDetected = true;
  } else {
    messageQuantity.innerText = "";
  }
}

// This function check if the term and conditions box is checked.
function checkCG(checkbox) {
  if (!checkbox.checked) {
    messageCG.innerText = formErrors.refuseCG;
    errorDetected = true;
  } else {
    messageCG.innerText = "";
  }
}

// This function ckeck is a city is chosen.
function checkLocation(location) {
  let isChecked = false;
  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      isChecked = true;
      break;
    }
  } 
  if (isChecked) {
    messageLocation.innerText = "";
  } else {
    messageLocation.innerText = formErrors.noCity;;
    errorDetected = true;
  }
}

/**  ALL other function **/

/** This function :
 * Check the value of the form buy calling individual checking function 
 * Control on Event change, that the new form value is valid (same check)
*/
const globalValidation = () => {
  // 1st form control on submission event
  checkName(tagFirst.value,messageFirst);
  checkName(tagLast.value,messageName);
  checkEmail(tagEmail.value);
  checkBDate(tagBirthdate.value);
  checkQuantity(tagQuantity.value);
  checkCG(tagCheckbox);
  checkLocation(tagLocation);

  // Submission control on change event
  tagFirst.addEventListener('change', () => {checkName(tagFirst.value,messageFirst);});
  tagLast.addEventListener('change', () => {checkName(tagLast.value,messageName);});
  tagEmail.addEventListener('change', () => {checkEmail(tagEmail.value);});
  tagBirthdate.addEventListener('change', () => {checkBDate(tagBirthdate.value);});
  tagQuantity.addEventListener('change', () => {checkQuantity(tagQuantity.value);});
  tagCheckbox.addEventListener('change', () => {checkCG(tagCheckbox);});
  tagLocation.forEach((isNewLocationChecked) => isNewLocationChecked.addEventListener('change', function() {
    checkLocation(tagLocation); 
  }));
}

const validationFetch = async () => {

    // Adding form info object
    const submissionForm = { 
      fistName : tagFirst.value,
      lastName : tagLast.value,
      email : tagEmail.value,
      birthdate : tagBirthdate.value,
      numberParticipation : tagQuantity.value,
      Terms : tagCheckbox.checked ? "Accept" : "Refused",
      newsletter : tagCheckbox2.checked ? "Accept" : "Refused"
      }
      console.log("Données renvoyée par le formulaire :", submissionForm)
  
    // Form destination fake URL add for example
    const url = 'https://OCGameon.com/submit-form';

    // Fetch parameters 
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submissionForm)
    };

    const response = await fetch(url, requestOptions)

    if (response.ok) {
      formBody.reset()        // If Ok, Clean the form
      console.log('Réponse du serveur :', response)
      return response.json(); // If answer is ok, response can be add here         } else {    
    } else {
      throw new Error('Échec de la requête');
    } 
}
function submitAndFetch(event) {
  event.preventDefault()
  
  errorDetected = false 
  
  try {
    globalValidation()

    if (errorDetected) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger.");
      return;
    }
    console.log("Formulaire correctement rempli")
 
    validationFetch()
    console.log("ValidationFetch OK")
    formBody.reset();     // Remove It when validation fetch will be ok
    closeModal();
    console.log("close Modal Ok")

    launchThanks();
    console.log("thanks Display Ok")


  } catch(error) {
      console.error("Erreur lors de la soumission du formulaire")
  }
}

// ------ Submit ------ 
form.addEventListener("submit", event => submitAndFetch(event))
