export const SETADDRESS = "SETADDRESS"
export const SAVEPRICE = "SAVEPRICE"


export const LOGINSUCCESS = "LOGINSUCCESS"
//
export interface loginSuccess {
    type: typeof LOGINSUCCESS
    value: {
        address: string;
        token: string;
    }
}
//Action
export const createLoginSuccessAction = (token: string, address: string): loginSuccess => ({
    type: LOGINSUCCESS,
    value: {
        address,
        token
    }
})
//price Action
export const savePriceAction = (price: string): savePrice => ({
    type: SAVEPRICE,
    value: price
})

//
export const ADDMESSAGE = "ADDMESSAGE"
export const BEFOREADDMESSAGE = "BEFOREADDMESSAGE"
export interface message {
    message: string,
    index: number
}
export interface beforeAddMessage {
    type: typeof BEFOREADDMESSAGE
    value: message
}
export interface addMessage {
    type: typeof ADDMESSAGE
    value: message
}
export interface savePrice {
    type: typeof SAVEPRICE
    value: string
}
//Action
export const createAddMessageAction = (message: message): beforeAddMessage => ({
    type: BEFOREADDMESSAGE,
    value: message
})

//
export const DELMESSAGE = "DELMESSAGE"
export interface delMessage {
    type: typeof DELMESSAGE
    value: number
}
//Action
export const createDelMessageAction = (index: number): delMessage => ({
    type: DELMESSAGE,
    value: index
})
//LODING
export const SETLODING = "SETLODING"
export interface setLodingAction {
    type: typeof SETLODING
    value: Boolean
}
//Action
export const createSetLodingAction = (showLoding: Boolean): setLodingAction => ({
    type: SETLODING,
    value: showLoding
})
//reducer
export type reducerParameterType = loginSuccess | beforeAddMessage | addMessage | delMessage | setLodingAction | savePrice
