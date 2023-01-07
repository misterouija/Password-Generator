// Imports
import { specialCharacters, numericCharacters, lowerCasedCharacters, upperCasedCharacters } from "./modules/chars.js";

// Generate password length options
const weakOptions = document.querySelector('.weak');
const mediumOptions = document.querySelector('.medium');
const strongOptions = document.querySelector('.strong');

for (let i = 10; i < 65; i++) {
    if (i < 30) {
        weakOptions.innerHTML += `<option value="${i}">${i}</option>`;
    } else if (i < 50) {
        mediumOptions.innerHTML += `<option value="${i}">${i}</option>`;
    } else {
        strongOptions.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

// Function to prompt user for password options
function getPasswordOptions () {
    const passwordLength = document.getElementById('passwordlength').value;
    const upperCaseChecked = document.getElementById('uppercasechars').checked;
    const numericChecked = document.getElementById('numericchars').checked;
    const specialCharactersChecked = document.getElementById('specialchars').checked;
    const options = [[upperCasedCharacters, upperCaseChecked], [numericCharacters, numericChecked], [specialCharacters, specialCharactersChecked]];
    // Default option
    let selectedCharacters = lowerCasedCharacters;
    // Loop through options and create an array of all selected characters
    options.forEach((opt) => {
        if (opt[1] === true) {
            selectedCharacters = selectedCharacters.concat(opt[0]);
        }
    });
    // Return an array of password length and all selected characters
    return [passwordLength, selectedCharacters];
}

// Function for getting a random element from an array
const getRandom = (arr) => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

// Function to generate password with user input
const generatePassword = (arr) => {
    let password = '';
    // Get password length for password options
    const passwordLength = getPasswordOptions()[0];
    // Loop the length of the password, select a random 
    // character from array and concatnate to password variable
    for (let i = 0; i < passwordLength; i++) {
        password += getRandom(arr);
    }

    return password;
};

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
const writePassword = () => {
    // Get selected characters from password options
    const selectedCharacters = getPasswordOptions()[1];
    const password = generatePassword(selectedCharacters);
    const passwordText = document.querySelector('#password');
    passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
