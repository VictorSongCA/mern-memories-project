import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        // UPDATE and LIKE are the same, then no LIKE
        case UPDATE:       
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case COMMENT:
            return {
                ...state, posts: state.posts.map((post) => {                    
                    // change the post that just received a comment...
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }

                    // return all the other posts normally...
                    return post;
                })
            };
        case CREATE:
            return { ...state, posts: [ ...state.posts, action.payload] };
        default:
            return state;
    }
}