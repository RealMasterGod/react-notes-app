import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    notes: [],
}

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state,action) => {
            state.notes = [{id: action.payload.id,title: action.payload.title, details: action.payload.details, date: action.payload.date}, ...state.notes]
        },
        editNote: (state,action) => {
            state.notes[state.notes.findIndex(item => item.id === action.payload.id)] = action.payload
        },
        deleteNote: (state,action) => {
            state.notes = state.notes.filter(item => item.id !== action.payload)
        }
    }
})

export const {addNote,editNote,deleteNote} = noteSlice.actions

export default noteSlice.reducer