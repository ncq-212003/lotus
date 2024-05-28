const initialStateCertification = {
    certifications: []
}

const HANDLERS_CERTIFICATION = {
    ADD_CERTIFICATION: 'ADD_CERTIFICATION',
    LIST_CERTIFICATION: 'LIST_CERTIFICATION',
    FIND_CERTIFICATION: 'FIND_CERTIFICATION',
    UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
    DELETE_CERTIFICATION: 'DELETE_CERTIFICATION'
}

const handlersCertification = {
    [HANDLERS_CERTIFICATION.ADD_CERTIFICATION]: (state, action) => {
        const certification = action.payload;

        return {
            ...state,
            certifications: [...state, certification]
        }
    },

    // list
    [HANDLERS_CERTIFICATION.LIST_CERTIFICATION]: (state, action) => {
        const certification = action.payload;

        return {
            ...state,
            certifications: certification
        }
    },

    // find
    [HANDLERS_CERTIFICATION.FIND_CERTIFICATION]: (state, action) => {
        const certification = action.payload;
        return certification;
    },

    //delete
    [HANDLERS_CERTIFICATION.DELETE_CERTIFICATION]: (state, action) => {
        return {
            certifications: []
        }
    },

    // update 
    [HANDLERS_CERTIFICATION.UPDATE_CERTIFICATION]: (state, action) => {
        return state;
    }
}

const reudecerCertification = (state, action) =>
    handlersCertification[action.type] ? handlersCertification[action.type](state, action) : state;
export { initialStateCertification, HANDLERS_CERTIFICATION, reudecerCertification } 