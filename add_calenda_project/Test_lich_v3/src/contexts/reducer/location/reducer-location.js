const initialStateLocation = {
    locations: []
}

const HANDLERS_LOCATION = {
    LIST_CITY: 'LIST_CITY',
    LIST_DISTRICT: 'LIST_DISTRICT',
    LIST_STREET: 'LIST_STREET',
    LIST_WARD: 'LIST_WARD'
}

const handlersLocation = {
    // list city
    [HANDLERS_LOCATION.LIST_CITY]: (state, action) => {
        const loction = action.payload;

        return {
            ...state,
            locations: [loction]
        }
    }
}

const reducerLocation = (state, action) =>
    handlersLocation[action.type] ? handlersLocation[action.type](state, action) : state;
export { initialStateLocation, HANDLERS_LOCATION, reducerLocation }