

const user = {
    email: 'p@.ru',
    password: '55',
    name: 'Dimas'
};

const INVALID_CLASS = 'invalid';

const page = document.getElementById('page');
const btn = document.getElementById('btn');
const registerForm = document.forms['register'];

const loginEmail = document.getElementById('loginEmailInput');
const loginPassword = document.getElementById('loginPasswordInput');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');

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

loginEmail.addEventListener('input', eventHandler);
loginPassword.addEventListener('input', eventHandler);
loginBtn.addEventListener('click', onClick);


function eventHandler(event) {
    const hasInvalidClass = event.target.classList.contains(INVALID_CLASS);
    const isValid = event.target.value !== "";

    if (!hasInvalidClass && !isValid) {
        event.target.classList.add(INVALID_CLASS);
    }

    if (hasInvalidClass && isValid) {
        event.target.classList.remove(INVALID_CLASS);
    }

    if (message) {
        page.classList.remove(INVALID_CLASS);
        message.remove();
        message = null
    }

    setDisabledButtonState();
}

function onClick(event) {
    event.preventDefault();
    message = document.createElement('div');
    message.classList.add('message');

    if (loginEmail.value === user.email && loginPassword.value === user.password) {
        message.innerText = `Hello, ${user.name}!`;
    } else {
        message.innerText = 'Вы ввели неверный пароль. Попробуйте снова.';
        page.classList.add(INVALID_CLASS);
        loginForm.reset();

        setDisabledButtonState();
    }

    page.append(message);
}

function setDisabledButtonState() {
    if (loginEmail.value === '' || loginPassword.value === '') {
        loginBtn.disabled = true;
    } else {
        loginBtn.disabled = false;
    }
}

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



registerForm.addEventListener('input', function (event) {
    const name = event.target.name;
    const value = event.target.value;


    formHelper[name].value = value;
    const bindedHandler = formHelper[name].validationChecker.bind(formHelper);
    bindedHandler(value);
    handleAddingValidate(event.target, formHelper[name].valid);
    btn.disabled = !formHelper.checkFormValidation();
});

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = formHelper.getData();
    console.log(data);
});

function handleAddingValidate(node, isValid) {
    if (!isValid && !node.classList.contains('invalid')) {
        node.classList.add('invalid');
    }
    if (isValid && node.classList.contains('invalid')) {
        node.classList.remove('invalid');
    }
}