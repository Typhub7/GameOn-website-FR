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
const messageNom = document.querySelector("#message-name")
const tagEmail = document.querySelector("#email")
const messageMail = document.querySelector("#message-mail")
const tagBirthdate = document.querySelector("#birthdate")
const messageDate = document.querySelector("#message-date")
const tagQuantity = document.querySelector("#quantity")
const tagLocation = document.querySelectorAll("input[name='location']")
const tagCheckbox1 = document.querySelector("#checkbox1")
const tagCheckbox2 = document.querySelector("#checkbox2")
const formErrors = { shortName : "Il faut au minimum 2 charactères.", 
                   badEmail : "Veuillez renseigner une adresse mail valide.",
                   tooYoung : "Vous devez avoir plus de 18 ans pour participer",
                   afterToday : "Etes vous vraiment né dans le futur ?",
                   veryElder : "Merci de corriger votre année de naissance",
                   badDate : "Veuillez renseigner une date valide.",
                   badQuantity : "Veuillez renseigner un nombre.",
                   noCity : "Merci de selectionner une ville.",
                   RefuseCG : "Vous devez accepter les Conditions générales de participation."}  

/**
 * Cette fonction actualise les DOM Elements
 * 
 * 

function updateInputDOM() {
  tagFirst.addEventListener('change', checkName)
  tagLast.addEventListener('change', checkName)
  tagBirthdate.addEventListener('change', checkBDate)
  tagEmail.addEventListener('change', checkEmail)
  tagQuantity.addEventListener('change', checkQuantity)

  tagCheckbox1.addEventListener('change', validerCG)
} */
  

// ------ Launch modal event ------ 
modalBtn.addEventListener("click", launchModal);  

// ------ function launch modal ------ 
function launchModal() {
  modalbg.style.display = "block";
}

// ------ close modal event ------ 
closeBtn.addEventListener("click", closeModal);

// ------ function close modal  ------ 
function closeModal() {
  modalbg.style.display = "none"
}

// ------ Expression régulière RegEx ------
//Accepte les majuscules, minuscules, caractères accentués, espace (\s) aprostrophes et tirets
const nameFirstRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
const numberRegEx = new RegExp("^\\d+$")
// de 0 à 9 puis 10 à 29 puis 30 et 31 / mois / puis année commence par 19 ou 20
const dateRegEx = new RegExp("^(19|20)\\d\\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$") 

/**
 * Cette fonction prend un nom ou prénom en paramètre et valide qu'il est au bon format
 * ici : repond au caractéristique de la nameFirstRegex 
 * @param {string} param 
 * @throw {Error}
 */
function checkName(param) {
  console.log("message prenom",messageFirst)
    if (!nameFirstRegEx.test(param)) {
      messageFirst.innerText = formErrors.shortName
    }  
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function checkEmail(email) {
    if (!emailRegEx.test(email)) {
      messageMail.innerText = formErrors.badEmail
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide qu'elle est au bon format. 
 * @param {date} date 
 * @throws {Error}
 */
function checkBDate(date) {
  if (!dateRegEx.test(date)) {
    messageDate.innerText = formErrors.badDate
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide que l'individu a plus de 18 ans. 
 * @param {date} date 
 * @throws {Error}
 
function validerAge(date) {
  if (!dateRegEx.test(date)) {
    throw new Error("Votre date de naissance n'est pas valide.")
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




// ------ function Submit ajouter event.preventDefault() ------ 
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Recuperer les valeurs des champs 
  const first = tagFirst.value
  console.log(first)
  const last = tagLast.value
  console.log(last)
  const email = tagEmail.value
  console.log(email)
  const birthdate = tagBirthdate.value
  console.log(birthdate)
  const quantity = tagQuantity.value
  console.log(quantity)
  /*const checkbox1 = tagCheckbox1.checked*/

  const form = document.querySelector("form")
  
  try {
    checkName(first)
    console.log("First OK")
    checkName(last)
    console.log("Last OK")
    checkBDate(birthdate)
    console.log("birthdate OK")
    checkEmail(email)
    console.log("email OK")
    checkQuantity(quantity)
    console.log("nombre OK")
    /* validerCG(checkbox1)
    console.log("CG checkbox ok")
    form.submit;*/
    console.log("Soumission OK")  
  } catch(Error) {
    console.log("Erreur a été Catch")
  }
}
);
