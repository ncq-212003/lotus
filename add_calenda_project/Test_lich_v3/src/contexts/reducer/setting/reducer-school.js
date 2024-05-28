const initialStateSchool = {
    companies: [],
};

const HANDLERS_SCHOOL = {
    ADD_SCHOOL: "ADD_SCHOOL",
    LIST_SCHOOL: "LIST_SCHOOL",
    DELETE_SCHOOL: "DELETE_SCHOOL",
    FIND_SCHOOL_BYID: "FIND_SCHOOL_BYID",
    UPDATE_SCHOOL: "UPDATE_SCHOOL",
};

const handlersSchool = {
    // add
    [HANDLERS_SCHOOL.ADD_SCHOOL]: (state, action) => {
        const school = action.payload;

        return {
            ...state,
            companies: [ ...state, school],
        };
    },

    // list
    [HANDLERS_SCHOOL.LIST_SCHOOL]: (state, action) => {
        const companies = action.payload;

        return {
            ...state,
            companies: [companies],
        };
    },

    // delete
    [HANDLERS_SCHOOL.DELETE_SCHOOL]: (state, action) => {
        return {
            companies: [],
        };
    },

    // find byid
    [HANDLERS_SCHOOL.FIND_SCHOOL_BYID]: (state, action) => {
        const school = action.payload;

        return school;
    },

    // update
    [HANDLERS_SCHOOL.UPDATE_SCHOOL]: (state, action) => {
        return state;
    },
};

const reducerSchool = (state, action) =>
handlersSchool[action.type] ? handlersSchool[action.type](state, action) : state;

export { initialStateSchool, reducerSchool, HANDLERS_SCHOOL };