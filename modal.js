/** Cette fonction gère le basculement en responsive du menu du header
 * @param {} : aucun
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
const formData = document.querySelector(".form-data");
const closeBtn = document.querySelector(".close")
const form = document.querySelector("form")
const tagFirst = document.querySelector("#first")
const messageFirst = document.querySelector("#message-first")
const tagLast = document.querySelector("#last")
const messageName = document.querySelector("#message-name")
const tagEmail = document.querySelector("#email")
const messageMail = document.querySelector("#message-mail")
const tagBirthdate = document.querySelector("#birthdate")
const messageDate = document.querySelector("#message-date")
const tagQuantity = document.querySelector("#quantity")
const tagLocation = document.querySelectorAll("input[name='location']")
const tagCheckbox1 = document.querySelector("#checkbox1")
const tagCheckbox2 = document.querySelector("#checkbox2")
const formErrors = { shortName : "Il faut au minimum 2 charactères.",
                   badName : "Un caractère n'est pas reconnu. Merci de corriger.",
                   badEmail : "Veuillez renseigner une adresse mail valide.",
                   tooYoung : "Vous devez avoir plus de 18 ans pour participer",
                   afterToday : "Etes vous vraiment né dans le futur ?",
                   veryElder : "Merci de corriger votre année de naissance",
                   badDate : "Veuillez renseigner une date valide.",
                   badQuantity : "Veuillez renseigner un nombre.",
                   noCity : "Merci de selectionner une ville.",
                   RefuseCG : "Vous devez accepter les Conditions générales de participation."}  

// ------ Launch modal event ------ 
modalBtn.addEventListener("click", launchModal);  

// This function display the modal  
function launchModal() {
  modalbg.style.display = "block";
}

// ------ close modal event ------ 
closeBtn.addEventListener("click", closeModal);

// This function hide the modal 
function closeModal() {
  modalbg.style.display = "none"
}

// ------ Expression régulière RegEx ------
// Accepte les majuscules, minuscules, caractères accentués, espace (\s) aprostrophes et tirets
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$")
const twoOrMoreRegEx = /.{2,}/;
const numberRegEx = /^\d+$/;
// de 0 à 9 puis 10 à 29 puis 30 et 31 / mois / puis année commence par 19 ou 20
const dateRegEx = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$") 

/** This function check that the name / firstname are 
 *  - using normal letters 
 *  - have more than 2 letters  
 */
function checkName(firstOrName,messageLoc) {
  if (!twoOrMoreRegEx.test(firstOrName)) {
    messageLoc.innerText = formErrors.shortName
  } else if (!nameFirstRegEx.test(firstOrName)) {
      messageLoc.innerText = formErrors.badName
    }
  else {
    messageLoc.innerText = "";
  }
}

/** This function Check that email is correct */
function checkEmail(email) {
    if (!emailRegEx.test(email)) {
      messageMail.innerText = formErrors.badEmail
  }
  else {
    messageMail.innerText = "";
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide qu'elle est au bon format. 
 */
function checkBDate(date) {
  if (!dateRegEx.test(date)) {
    messageDate.innerText = formErrors.badDate
  }
  if (!twoOrMoreRegEx.test(date)) {
    messageDate.innerText = formErrors.badDate
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide que l'individu a plus de 18 ans.
 * N'a pas plus de 130 ans.
 * N'est pas né après la date du jour.

function validerAge(date) {
  if (!dateRegEx.test(date)) {
     new Error("Votre date de naissance n'est pas valide.")
  }
} */
function checkQuantity(quantity) {
  if (!numberRegEx.test(quantity)) {
      console.log("erreur nombre")
      throw new Error("Votre nombre de participation n'est pas un nombre.")
  }
}

/**
 * Cette fonction vérifie que les condition générales sont acceptées.
 * @param {string} checkbox1 
 * @throws {Error}
 */
function validerCG(checkbox) {
  if (!checkbox.checked) {
    console.log("erreur CG")
    throw new Error("Vous n'avez pas acceptez les conditions d'utilisations.")
  }
}

/**
 * Cette fonction vérifie qu'une ville est choisie.
 * @param {string} checkbox1 
 * @throws {Error}
 */


// ------ function Submit ------ 
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Recuperer les valeurs des champs 

  const birthdate = tagBirthdate.value
    console.log(birthdate)
  const quantity = tagQuantity.value
    console.log(quantity)
  /*const checkbox1 = tagCheckbox1.checked
  const form = document.querySelector("form")*/
  
  try {
    // 1st form control on submission event
    checkName(tagFirst.value,messageFirst);
    checkName(tagLast.value,messageName);
    checkEmail(tagEmail.value);

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
 
    

    checkBDate(birthdate)
      console.log("birthdate OK")

      console.log("email OK")
    checkQuantity(quantity)
      console.log("nombre OK")
    /* validerCG(checkbox1)
    console.log("CG checkbox ok")
    form.submit;*/
      console.log("Soumission OK")  


      const submissionForm = { fistName : tagFirst.value,
        lastName : tagLast.value,
        email : tagEmail.value,
        birthdate : tagBirthdate.value,
        numberParticipation : tagQuantity.value,
        newsletter : tagCheckbox2.checked ? "accept" : "Refused"
       }
  } catch(Error) {
      console.log("Erreur a été Catch")
  }
}
);
