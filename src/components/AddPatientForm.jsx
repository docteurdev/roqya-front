// import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextArea } from ".";
import { alterupdatePatient, getPatients } from "../redux/patients";
import Input from "./input/Input";
import {Loading} from "./index"
import { axios } from "./common/axios";

function AddPatientForm({ closePop }) {

  const centreInfo= JSON.parse(localStorage.getItem('centreInfo'))


  const [nom, setNom] = useState("");
  const [prenom, setpreNom] = useState("");
  const [naissance, setnaissance] = useState("");
  const [contact, setcontact] = useState("");
  const [profession, setprofession] = useState("");
  const [religion, setreligion] = useState("");
  const [sexe, setsexe] = useState("");
  const [ant_medical, setant_medical] = useState("");
  const [s_matrimoniale, sets_matrimoniale] = useState("");

  const [load, setLoad] = useState(false)
 
  const dispatch= useDispatch()

  const newPatient = (e) => {
    
    e.preventDefault();
    setLoad(true)
    // dispatch(alterupdatePatient(true))
    const data = {
        centreId: centreInfo.id,
        patient: {
        nom: nom,
        prenom: prenom,
        date_naissance: naissance,
        sexe: sexe,
        profession: profession,
        contact: contact,
        religion: religion,
        s_matrimoniale: s_matrimoniale,
        ante_medicaux: ant_medical
      }
    }
    axios.post("api/roqya_ci/carnet_create", data)
         .then(res => {
          // console.log('====================================');
          // console.log(res.data);
          // console.log('====================================');
          if(res.data){
            setLoad(false)
            setTimeout(() =>{
              dispatch(getPatients(centreInfo.id));

            }, 2000)
            document.getElementById('my-modal').click();
          }
         } )
         .catch(error => console.log(error) )
  
  }

    return (
      <>
       {/* {load? <Loading/>: null} */}
      <div>
        <form onSubmit={newPatient} >
          <div className=" sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-1 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={nom}
                    setValue={setNom}
                    label="Nom"
                    type="text" />
                </div>
                {/* <Input/> */}

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={prenom}
                    setValue={setpreNom}
                    label="Prenom"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={naissance}
                    setValue={setnaissance}
                    label="Date de naissance"
                    type="date" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="flex flex-col md:flex-row">
                    <label className="mr-2" htmlFor="">sexe:</label>
                    <div className="flex flex-wrap gap-4 ml-6">
                      <label htmlFor="">Masculin</label>

                      <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-primary"
                        onChange={() => setsexe("Masculin")}
                      />
                      <label htmlFor="">Féminin</label>

                      <input
                        type="radio"
                        name="radio-2"
                        className="radio radio-secondary"
                        onChange={() => setsexe("Féminin")}

                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={profession}
                    setValue={setprofession}
                    label="Profession"
                    type="text" />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={contact}
                    setValue={setcontact}
                    label="Contact"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Input
                    value={religion}
                    setValue={setreligion}
                    label="Réligion"
                    type="text"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="flex flex-col md:flex-row">
                    <label htmlFor="" className="mb-2">Situation matrimoniale:</label>
                    <div className="flex  gap-2 md:ml-6">
                      <label htmlFor="">C</label>

                      <input
                        type="radio"
                        name="radio-smatri"
                        onChange={() => sets_matrimoniale("Célibataire")}
                        className="radio radio-secondary-focus"
                      // checked
                      />
                      <label htmlFor="">M</label>

                      <input
                        type="radio"
                        name="radio-smatri"
                        onChange={(e) => sets_matrimoniale(sexe ==="Féminin"? "Mariée": "Marié")}
                        className="radio radio-accent"
                      />
                      <label htmlFor="">D</label>

                      <input
                        type="radio"
                        name="radio-smatri"
                        onChange={() => sets_matrimoniale(sexe ==="Féminin"? "Divorcée": "Divorcé")}
                        className="radio radio-secondary"
                      />
                      <label htmlFor="">V</label>

                      <input
                        type="radio"
                        name="radio-smatri"
                        onChange={() => sets_matrimoniale(sexe ==="Féminin"? "Veuve": "Veuf")}
                        className="radio checked:bg-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/*  */}

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-ee"
                >
                  Antécédant médical
                </label>
                <div className="mt-1">
                  <TextArea
                    value={ant_medical}
                    setValue={setant_medical}
                    placeholder="Antécédant médical"
                  />
                </div>

              </div>
             
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <label
                htmlFor="my-modal"
                type="submit"
                className="inline-flex justify-center 
               rounded-md border cursor-pointer
               border-2 
               bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm 
               hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Annuler

              </label>
              <label
              onClick={newPatient}
                type="submit"
                htmlFor="my-modal"
                className="inline-flex ml-4 justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Enregistrer
              </label>
            </div>
          </div>
        </form>
      </div>
      </>
    );
  }

  export default AddPatientForm;
