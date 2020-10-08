export function initRegister() {

    const page = document.getElementById('page');
    const btn = document.getElementById('btn');
    const registerForm = document.forms['register'];

    

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
    return { registerForm, handleAddingValidate }

}