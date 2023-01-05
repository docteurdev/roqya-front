// import axios from 'axios';

import { axios } from '../components/common/axios';

const {createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const centreId = JSON.parse(localStorage.getItem('centreInfo'))

export const getPatients = createAsyncThunk("patients/getPatients", async(id) =>{

    const patients = await axios.get(`api/roqya_ci/getAll_patients/${id}`)
                    .then(res =>{
                        if(res.data){

                            return res.data.data
                        }
                    })
                    .catch(error => console.log(error) )
    return patients;
}) 

const patientsSlice = createSlice({
    name: "patients",
    initialState:{
        pats:[],
        patient:{},
        patientRdv:[],
        updatePatient: null
},
    reducers:{
        getPatient:(state, action) =>{
           state.patient= action.payload;
             
        },
        setPatientRdv:(state, action) =>{
            state.patientRdv= action.payload;
              
         }, 
         alterupdatePatient(state, {payload}){
            state.updatePatient=payload

        }
    },
    extraReducers:{
        [getPatients.pending]:() =>{
            console.log("pending");
        },

        [getPatients.fulfilled]: (state, {payload}) =>{
              state.pats= payload;
              state.updatePatient=false
        },

        [getPatients.rejected]: () =>{
            console.log("call is rejected");
        }
    }
})
export const {getPatient, alterupdatePatient, setPatientRdv,} = patientsSlice.actions;
export default patientsSlice;