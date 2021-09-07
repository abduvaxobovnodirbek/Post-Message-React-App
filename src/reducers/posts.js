// eslint-disable-next-line import/no-anonymous-default-export
export default (state={posts:[],isLoading:true},action)=>{
    switch (action.type) {
        case "START_LOADING":
            return {...state,isLoading:true}
        case "END_LOADING":
            return {...state,isLoading:false}    
        case "FETCH_ALL":
            return {
                ...state,
                posts:action.payLoad.data,
                numberOfPage:action.payLoad.numberOfPage,
                currentPage:action.payLoad.currentPage
            }
        case "FETCH_POST":
            return {...state,post:action.payLoad}    
        case "SEARCH":    
            return {
                ...state,
                posts:action.payLoad
            }
        case "DELETE":
            return {...state,posts: state.posts.filter(post=>post._id !== action.payLoad)}    
        case "CREATE":
            return {...state,posts:[...state.posts, action.payLoad]}
        case "UPDATE":
        case "LIKEPOST":
            return {...state,posts:state.posts.map(post=>post._id === action.payLoad._id ? action.payLoad:post)}   
        default:
            return state
    }
}