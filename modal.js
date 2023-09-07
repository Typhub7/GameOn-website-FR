/**
 * Cette fonction gère le basculement en responsive du menu du header
 * @param {} : aucun
 */
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ------ DOM Elements ------ 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close")
let baliseFirst = document.getElementById("first")
let baliseLast = document.getElementById("last")
let baliseEmail = document.getElementById("email")
let baliseBirthdate = document.getElementById("birthdate")
let baliseQuantity = document.getElementById("quantity")
let baliseLocation = document.querySelectorAll("input[name='location']")
let baliseCheckbox1 = document.getElementById("checkbox1")
let baliseCheckbox2 = document.getElementById("checkbox2")

// ------ Variable ------
let first = baliseFirst.value
let last = baliseLast.value
let email = baliseEmail.value
let birthdate = baliseBirthdate.value
let quantity = baliseQuantity.value
let form = document.querySelector("form")


// ------ launch modal event ------ 
// simplification : btn.addEventListener("click", launchModal) 
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));  

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
const nomPrenomRegEx = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$") 
const emailRegEx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
const numberRegEx = new RegExp("^\d+$/")
// de 0 à 9 puis 10 à 29 puis 30 et 31 / mois / puis année commence par 19 ou 20
const dateRegex = new RegExp("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\d{2}$") 

/**
 * Cette fonction prend un nom ou prénom en paramètre et valide qu'il est au bon format
 * ici : repond au caractéristique de la nomPrenomRegex 
 * @param {string} nom 
 * @throw {Error}
 */
function validerNom(nom) {
    if (!nomPrenomRegEx.test(nom)) {
        throw new Error("Le nom est trop court. ")
        console.log("erreur nom")
    }   
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    if (!emailRegEx.test(email)) {
      throw new Error("L'email n'est pas valide.")
      console.log("erreur email")
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide qu'elle est au bon format. 
 * @param {string} date 
 * @throws {Error}
 */
function validerDate(date) {
  if (!dateRegEx.test(date)) {
    throw new Error("Votre date de naissance n'est pas valide.")
    console.log("erreur date")
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide que l'individu a plus de 18 ans. 
 * @param {string} date 
 * @throws {Error}
 */
function validerAge(date) {
  if (!dateRegEx.test(date)) {
    throw new Error("Votre date de naissance n'est pas valide.")
  }
}


// ------ function Submit ajouter event.preventDefault() ------ 
form.addEventListener("submit", (event) => {
  event.preventDefault() })
