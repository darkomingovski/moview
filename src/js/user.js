import $ from "jquery";

function createUser(number) {
    const valid = 0;
    const inValid = 1;
    let userObj = {};

    if (valid === number) {
        userObj.watched = [];
        userObj.planned = [];
        userObj.favorites = [];
        const $form = $("#registration-form");
        $form.find("input").each(function () {
            userObj[this.name] = this.value;
        });
        delete userObj.passwordRepeat;
        return userObj;
    }
    else if (inValid === number) {
        userObj = null;
        return userObj;
    }
}

export { createUser }