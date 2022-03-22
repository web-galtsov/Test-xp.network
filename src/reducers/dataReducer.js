const initialState = {
    data: {
        info: {},
        data: [],
    },
    pagination: {
        current: 1,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal(total, range) {
            return `${range} of ${total} items`;
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_DATA':
            return {
                ...state,
                data: action.payload.data,
            };
        case 'UPDATE_PAGINATION':
            return {
                ...state,
                pagination: action.payload.pagination,
            };
        case 'UPDATE_PAGE_SIZE':
            return {
                ...state,
                pagination: action.payload.pagination,
            };

        default:
            return state;
    }
};
