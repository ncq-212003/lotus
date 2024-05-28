const initialStateItem = {
    item: []
}
const HANDLERS_ITEM = {
    LIST_ITEM: "LIST_ITEM",
};


const handlesItem = {
    // list
    [HANDLERS_ITEM.LIST_ITEM]: (state, action) => {
        const itemsData = action.payload;

        return {
            ...state,
            items: itemsData,
        };
    },
};

const reducerItem = (state, action) => 
    (handlesItem[action.type] ? handlesItem[action.type](state, action) : state);

export { initialStateItem, reducerItem, HANDLERS_ITEM };