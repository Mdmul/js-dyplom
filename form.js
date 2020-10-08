import { INVALID_CLASS } from './constants.js';
import { initLogin } from './login.js';
import { initRegister } from './register.js';




const page = document.getElementById('page');
const btn = document.getElementById('btn');
const registerForm = document.forms['register'];
const { loginForm, setDisabledButtonState } = initLogin();
//const { registerForm, setDisabledButtonState } = initRegister();


const setLoginBtn = document.getElementById('setLoginBtn');
const setRegisterBtn = document.getElementById('setRegisterBtn');

setLoginFormActive();

function setLoginFormActive() {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    setLoginBtn.classList.add('active-btn');
    setRegisterBtn.classList.remove('active-btn');
    setDisabledButtonState();
}

function setRegisterFormActive() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    setLoginBtn.classList.remove('active-btn');
    setRegisterBtn.classList.add('active-btn');
    btn.disabled = !formHelper.checkFormValidation();
}

// loginForm

setLoginBtn.addEventListener('click', setLoginFormActive);

setRegisterBtn.addEventListener('click', setRegisterFormActive);

let message = null;



// registerForm

const formHelper = {
    name: {
        value: '',
        valid: false,
        validationChecker() {
            this.name.valid = this.name.value.length !== 0;
        }
    },

    email: {
        value: '',
        valid: false,
        validationChecker() {
            const emailRegex = RegExp(/^[w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            this.email.valid = emailRegex.test(this.email.value);
        },
    },

    repeatPassword: {
        value: '',
        valid: false,
        validationChecker() {
            this.repeatPassword.valid = this.repeatPassword.value === this.password.value;
        }
    },

    password: {
        value: '',
        valid: false,
        validationChecker() {
            this.password.valid = this.password.value.length !== 0;
        }
    },

    checkFormValidation() {
        for (const key in this) {
            if (typeof this[key] !== 'function' && !this[key].valid) {
                return false;
            }
        }
        return true;
    },

    getData() {
        return {
            name: this.name.value,
            email: this.email.value,
            password: this.password.value,
        };
    },
};



// registerForm.addEventListener('input', function (event) {
//     const name = event.target.name;
//     const value = event.target.value;


//     formHelper[name].value = value;
//     const bindedHandler = formHelper[name].validationChecker.bind(formHelper);
//     bindedHandler(value);
//     handleAddingValidate(event.target, formHelper[name].valid);
//     btn.disabled = !formHelper.checkFormValidation();
// });

// registerForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const data = formHelper.getData();
//     console.log(data);
// });

// function handleAddingValidate(node, isValid) {
//     if (!isValid && !node.classList.contains('invalid')) {
//         node.classList.add('invalid');
//     }
//     if (isValid && node.classList.contains('invalid')) {
//         node.classList.remove('invalid');
//     }
// }