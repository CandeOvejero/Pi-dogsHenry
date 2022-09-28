import { GET_DOGS, GET_NAME_DOG, GET_TEMPERAMENT, FILTER_BY_TEMPERAMENTS, FILTER_CREATED, ORDER_BY_NAME,ORDER_BY_WEIGHT,GET_DETAILS,CREATE_DOG } from "../actions"

const initialState = {
    dogs : [],
    allDogs: [],
    temperaments: [],
    detail: [],
    filterDogs: [],
}
function rootReducer(state=initialState, action){   
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                allDogs:action.payload, //se envia todo lo que te envia la accion dogs
                dogs:action.payload
            }

        case GET_NAME_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENTS:
            const temperamentFilter=
            action.payload === 'All' ? state.allDogs:
            state.allDogs.filter((e)=> e.temperament?.includes(action.payload))
        
            return {
                ...state,
                dogs: temperamentFilter,
            }
            case FILTER_CREATED :
            const allDogsCreated = state.allDogs
            const filterCreated = action.payload === 'created' ? allDogsCreated.filter(d => d.createdInDb)
            :
            allDogsCreated.filter(d => !d.createdInDb)

        return {
            ...state, 
            dogs : action.payload === "all" ?  state.allDogs : filterCreated
        }
        /*case FILTER_CREATED:
            const allDogsCreated = state.filterDogs
            const createdFilter= action.payload === 'created'?
            allDogsCreated.filter((e)=> e.createdInDb):
            action.payload === 'api' ?
            allDogsCreated.filter((e)=> !e.createdInDb):
            action.pay === 'all' && allDogsCreated
            return {
                ...state,
                dogs: createdFilter,
            }*/
        case ORDER_BY_NAME:
            let order = action.payload === "asc" ? state.allDogs.sort(function (a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }):
                state.allDogs.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                dogs:order
            }
            case ORDER_BY_WEIGHT:
            const orderWeight = action.payload === "desc" ? state.allDogs.sort((a, b) => {
                if (parseInt(a.weight_min) > parseInt(b.weight_min)) {
                    return 1;
                }
                if (parseInt(a.weight_min) < parseInt(b.weight_min)) {
                    return -1;
                }
                    return 0;
            })
            : state.allDogs.sort((a, b) => {
                if (parseInt(a.weight_min) > parseInt(b.weight_min)) {
                    return -1;
                }
                if (parseInt(a.weight_min) < parseInt(b.weight_min)) {
                    return 1;
                }
                    return 0;
            });
                return {
                  ...state,
                  dogs: orderWeight,
                };
       
              
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case CREATE_DOG:
            return {
                ...state
            }
                
        default:
            return state;    
    }  

}


export default rootReducer;