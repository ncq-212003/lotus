const initialStateBranch = {
    companies: [],
};

const HANDLERS_BRANCH = {
    ADD_BRANCH: "ADD_BRANCH",
    LIST_BRANCH: "LIST_BRANCH",
    DELETE_BRANCH: "DELETE_BRANCH",
    FIND_BRANCH_BYID: "FIND_BRANCH_BYID",
    UPDATE_BRANCH: "UPDATE_BRANCH",
};

const handlersBranch = {
    // add
    [HANDLERS_BRANCH.ADD_BRANCH]: (state, action) => {
        const branch = action.payload;

        return {
            ...state,
            companies: [ ...state, branch],
        };
    },

    // list
    [HANDLERS_BRANCH.LIST_BRANCH]: (state, action) => {
        const companies = action.payload;

        return {
            ...state,
            companies: [companies],
        };
    },

    // delete
    [HANDLERS_BRANCH.DELETE_BRANCH]: (state, action) => {
        return {
            companies: [],
        };
    },

    // find byid
    [HANDLERS_BRANCH.FIND_BRANCH_BYID]: (state, action) => {
        const branch = action.payload;

        return branch;
    },

    // update
    [HANDLERS_BRANCH.UPDATE_BRANCH]: (state, action) => {
        return state;
    },
};

const reducerBranch = (state, action) =>
  handlersBranch[action.type] ? handlersBranch[action.type](state, action) : state;

export { initialStateBranch, reducerBranch, HANDLERS_BRANCH };