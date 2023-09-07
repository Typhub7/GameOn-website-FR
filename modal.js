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

/**
 * Cette fonction actualise les DOM Elements
 * 
 * 

function updateInputDOM() {

}*/
  

// ------ Variable ------
let first = baliseFirst.value
console.log(first)
let last = baliseLast.value
console.log(last)
let email = baliseEmail.value
console.log(email)
let birthdate = baliseBirthdate.value
console.log(birthdate)
let quantity = baliseQuantity.value
console.log(quantity)
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
      console.log("erreur nom")
        throw new Error("Le nom est trop court. ")
    }  
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    if (!emailRegEx.test(email)) {
      console.log("erreur email")
      throw new Error("L'email n'est pas valide.")
  }
}

/**
 * Cette fonction prend la date de naissance en paramètre.
 * Elle valide qu'elle est au bon format. 
 * @param {date} date 
 * @throws {Error}
 */
function validerDate(date) {
  if (!dateRegEx.test(date)) {
    console.log("erreur date")
    throw new Error("Votre date de naissance n'est pas valide.")
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
function validerQuantity(quantity) {
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
  
  try {
    validerNom(nom);
    validerNom(prenom);
    validerDate(date);
    validerEmail(email);
    validerQuantity(quantity)
    console.log("Validation OK")
    form.submit;
    console.log("Soumission OK")  
  } catch(Error) {
    console.log("Erreur a été Catch")
  }
}
);
