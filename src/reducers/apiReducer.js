const initialState = {
    loading: false,
    tableLoading: false,
    error: false,
    errorMessage: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'API_LOADING':
            return {
                ...state,
                loading: true,
                error: false,
                errorMessage: '',
            };
        case 'API_TABLE_LOADING':
            return {
                ...state,
                tableLoading: true,
                error: false,
                errorMessage: '',
            };
        case 'API_SUCCESS':
            return {
                ...state,
                loading: false,
                tableLoading: false,
                error: false,
                errorMessage: '',
            };
        case 'API_ERROR':
            return {
                ...state,
                loading: false,
                tableLoading: false,
                error: true,
                errorMessage: action.payload.errorMessage,
            };

        default:
            return state;
    }
};
