export function initLogin() {
    const user = [
        {
            email: 'p@.ru',
            password: '55',
            name: 'Dimas'
        },
        {
            email: 'be@.ru',
            password: '9',
            name: 'Oleg',
        },
        {
            email: 'nom@.ru',
            password: '1111',
            name: 'Nina',
        }

    ];


    const page = document.getElementById('page');
    // const btn = document.getElementById('btn');
    // const registerForm = document.forms['register'];

    const loginEmail = document.getElementById('loginEmailInput');
    const loginPassword = document.getElementById('loginPasswordInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');

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
    return { loginForm, setDisabledButtonState }

}

