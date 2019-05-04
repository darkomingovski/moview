import $ from "jquery";

function createUser(number) {
    const valid = 0;
    const inValid = 1;
    let userObj = {};

    if (valid === number) {
        userObj.watchedMovie = [];
        userObj.watchedTV = [];
        userObj.plannedMovie = [];
        userObj.plannedTV = [];
        const $form = $("#registration-form");
        $form.find("input").each(function () {
            userObj[this.name] = this.value;
        });
        delete userObj.passwordRepeat;
        return userObj;
    } else if (inValid === number) {
        userObj = null;
        return userObj;
    }
}

export { createUser }