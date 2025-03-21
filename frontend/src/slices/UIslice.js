import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false
}

const UISlice = createSlice({
    initialState : initialState,
    name : "ui",
    reducers : {
        setLoading(state,action){
            // console.log(action.payload)
            state.loading = action.payload
        }
    }
})

export const {setLoading} = UISlice.actions
export default UISlice.reducer