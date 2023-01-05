import connexionSlice from './connexion';
import messageSlice from './message';
import patientsSlice from './patients';
import personelSlice from './personnel';
import { rdvSlice } from './rdv';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const { configureStore} = require('@reduxjs/toolkit');

const persistConfig={
 key: 'root',
 storage,
}

const persistedReducer = persistReducer(persistConfig)

export const store = configureStore({
    // devTools: process.env.NODE_ENV !=='development',
    reducer:{
        patients: patientsSlice.reducer,
        personels: personelSlice.reducer,
        rendezVous: rdvSlice.reducer,
        login: connexionSlice.reducer,
        message: messageSlice.reducer,
    }
})