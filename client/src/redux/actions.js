export function LOG_IN_ACTION(name){
    return{
        type: 'LOG_IN',
        payload: name
    }
}
export function LOG_OUT_ACTION(){
    return{
        type: 'LOG_OUT',
        payload: 'Guest'
    }
}