/** This function is used to toggle the header in responsive
 */
function editNav() {
  const topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// ------ DOM Elements ------ 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".modal-btn");
const confirmModalBtn = document.querySelector(".confirm-modal-btn");
const formData = document.querySelector(".form-data");
const closeBtn = document.querySelector(".close")
const form = document.querySelector("form")
const modalBody = document.querySelector(".modal-body")

let tagFirst = document.querySelector("#first")
let messageFirst = document.querySelector("#message-first")
let tagLast = document.querySelector("#last")
let messageName = document.querySelector("#message-name")
let tagEmail = document.querySelector("#email")
let messageMail = document.querySelector("#message-mail")
let tagBirthdate = document.querySelector("#birthdate")
let messageDate = document.querySelector("#message-date")
let tagQuantity = document.querySelector("#quantity")
let messageQuantity = document.querySelector("#message-quantity")
let tagLocation = document.getElementsByName("location")
let messageLocation = document.querySelector("#message-location")
let tagCheckbox = document.querySelector("#checkbox1")
let messageCG = document.querySelector("#message-cg")
let tagCheckbox2 = document.querySelector("#checkbox2")
let errorDetected = false

// ----- Other Variable ------
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
// Accepte les majuscules, minuscules, caractères accentués, espace (\s) aprostrophes et tirets
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$")
const twoOrMoreRegEx = /.{2,}/;
const numberRegEx = /^\d+$/;
// de 0 à 9 puis 10 à 29 puis 30 et 31 / mois / puis année commence par 19 ou 20
const dateRegEx = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$") 

// ------ Launch modal event ------ 
modalBtn.addEventListener("click", launchModal);  

// This function display the modal  
function launchModal() {
  modalbg.style.display = "block";
}

// ------ Close modal event ------ 
closeBtn.addEventListener("click", closeModal);
confirmModalBtn.addEventListener("click", closeModal);

// This function hide the modal 
function closeModal() {
  modalbg.style.display = "none"
}

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

/** This function Check that email is correct */
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
  // Extract user year
  let userDateSplit = date.split("-");
  let userYear = userDateSplit[0];

  // Extract current year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Age of the user calculation
  let userAge = currentYear - userYear

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

/** This function check that the participation is a number.
*/
function checkQuantity(quantity) {
  if (!numberRegEx.test(quantity)) {
    messageQuantity.innerText = formErrors.badQuantity;
    errorDetected = true;
  } else {
    messageQuantity.innerText = "";
  }
}

/** This function check if the term and conditions box is checked.
 */
function checkCG(checkbox) {
  if (!checkbox.checked) {
    messageCG.innerText = formErrors.refuseCG;
    errorDetected = true;
  } else {
    messageCG.innerText = "";
  }
}

/** This function ckeck is a city is chosen.
 */
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

// ------ function Submit ------ 
form.addEventListener("submit", (event) => {
  event.preventDefault();

  errorDetected = false;
  
  try {
    // 1st form control on submission event
    checkName(tagFirst.value,messageFirst);
    checkName(tagLast.value,messageName);
    checkEmail(tagEmail.value);
    checkBDate(tagBirthdate.value);
    checkQuantity(tagQuantity.value);
    checkCG(tagCheckbox);
    checkLocation(tagLocation);

    // Submission control on change event
    tagFirst.addEventListener('change', () => {
      checkName(tagFirst.value,messageFirst);
    });
    tagLast.addEventListener('change', () => {
      checkName(tagLast.value,messageName);
    });
    tagEmail.addEventListener('change', () => {
      checkEmail(tagEmail.value);
    });
    tagBirthdate.addEventListener('change', () => {
      checkBDate(tagBirthdate.value);
    });
    tagQuantity.addEventListener('change', () => {
      checkQuantity(tagQuantity.value);
    });
    tagCheckbox.addEventListener('change', () => {
      checkCG(tagCheckbox);
    });
    tagLocation.forEach((isNewLocationChecked) => isNewLocationChecked.addEventListener('change', function() {
      checkLocation(tagLocation); 
    }));

    if (errorDetected) {
      console.log("Le formulaire contient des erreurs. Veuillez les corriger.");
      return;
    }

      console.log("Soumission OK")  

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
    
    form.style.display = "none"       // Hide the form

    const confirmMessage =
    `    <div class="confirm-modal">
            <h1 class="confirm-modal-txt"> 
              Merci pour votre inscription
            </h1>
            <button class="confirm-modal-btn button close-btn"> 
              Fermer
            </button>
          </div>
   `
    modalBody.innerHTML += confirmMessage

    // Form destination URL
    const url = 'https://OCGameon.com/submit-form';

    // Fetch parameters 
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submissionForm)
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok) {
          formBody.reset()        // If Ok, Clean the form
          return response.json(); // If answer is ok, response can be add here         } else {
          
        } else {
          throw new Error('Échec de la requête');
        }
      })
      .then(data => {
        // The server's answer if need
        console.log('Réponse du serveur :', data);
      })


  } catch(error) {
      console.error("Erreur lors de la soumission du formulaire")
  }
}
);
