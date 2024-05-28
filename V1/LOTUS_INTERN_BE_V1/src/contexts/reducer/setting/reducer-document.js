import dayjs from "dayjs";

const initialStateDocument = {
  documents: []
};

const HANDLERSDOCUMENT = {
  LIST_DOCUMENTS: 'LIST_DOCUMENTS',
  ADD_DOCUMENTS: 'ADD_DOCUMENTS',
};

const handlersDocument = {
  [HANDLERSDOCUMENT.LIST_DOCUMENTS]: (state, action) => {
    return {
      ...state,
      documents:  action.payload
    };
  },

//   [HANDLERSDOCUMENT.ADD_DOCUMENTS]: (state, action) => {
//     const { tab, ...payload } = action.payload;
//     return {
//       ...state,
//       documents: [...state.documents, { ...payload }],
//     };
//   },
};

const reducerDocument = (state, action) =>
  handlersDocument[action.type] ? handlersDocument[action.type](state, action) : state;

  
export { initialStateDocument, reducerDocument, HANDLERSDOCUMENT };
