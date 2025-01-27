

const ACTIONS = {
    ADD_EDU: "add_education",
    EDIT_EDU: "edit_education",
    TGGL_EDU: "toggle_education",
    DEL_EDU: "delete_education",
    RESET_EDU: "reset_education",
    ADD_PRF: "add_profession",
    EDIT_PRF: "edit_profession",
    TGGL_PRF: "toggle_profession",
    DEL_PRF: "delete_profession",
    RESET_PRF: "reset_profession",
}

const isEmptyObject = (obj) => Object.keys(obj).length !== 0;

export { ACTIONS, isEmptyObject }