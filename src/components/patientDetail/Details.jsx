import React, { useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {RiLockPasswordFill} from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewRdv from "../NewRdv";
import Loading from "../common/Loading";
import { IconContext } from "react-icons/lib";
import '../../App.css'

const RdvContentItem = ({ type, value }) => {
  return (
    <div className="">
      <button style={{ backgroundColor: type === "sorcellerie" ? '#bc4e9c' : type === "ventouse" ? '#71B280' : "#134E5E" }} className=" bg-primary text-white rounded-xl font-semibold px-4 h-[25px] " > {value} </button>
    </div>
  )
}

const Rdv = ({ rdv }) => {
  const [rdvContent, setrdvContent] = useState(false);


  return (
    <div className="">
      <div style={{ minHeight: rdvContent ? 200 : 50, }} className="w-full p-2 transition-height rounded-lg mt-2 border-2 border-solid">
        <div className="rdv-header  flex  justify-between items-center ">
          <h2 className="text-lg text-left font-normal flex items-center w-4/12 ">
            <span className="font-semibold mr-2">Date consultation:</span> <span> {rdv.date_consultation} </span>
          </h2>
          <h2 className="text-lg text-left font-normal flex items-center w-4/12">
            <span className="font-semibold mr-2">Sécrétaire:</span> <span>{rdv.secretaire} </span>
          </h2>
          <h2 className="text-lg text-left font-normal w-4/12">
            <span className="font-semibold mr-2">Raki:</span> <span> {rdv.rakis} </span>
          </h2>
          <h2 className="self-end">
            {!rdvContent ? (
              <ChevronDownIcon
                onClick={() => setrdvContent(true)}
                className="w-6 p-1 h-6 bg-primary text-white rounded-full cursor-pointer ml-2"
              />
            ) : (
              <ChevronUpIcon
                onClick={() => setrdvContent(false)}
                className="w-6 p-1 h-6 bg-primary text-white rounded-full cursor-pointer ml-2"
              />
            )}
          </h2>
        </div>
        {rdvContent ? <div className="rdv-body mt-2">
          {/* divider */}
          <div className="w-full h-1 bg-slate-500 mb-2" />
          <div className=" flex gap-2">
            <div className=" w-[40%]">
              <h2 className="font-medium">Sorcelleries à traiter</h2>
            </div>
            <div className="w-screen flex flex-wrap gap-2">
              {

                rdv.symptome ? rdv.symptome.map((item, index) => <RdvContentItem key={index} type="sorcellerie" value={item} />) : null
              }

            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className=" w-[40%]">
              <h2 className="font-medium">Ventouses</h2>
            </div>
            <div className="w-screen flex flex-wrap gap-2">
              {

                rdv.ventouse ? rdv.ventouse.map((item, index) => <RdvContentItem key={index} type="ventouse" value={item} />) : null
              }
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <div className=" w-[40%]">
              <h2 className="font-medium">Rédemdes</h2>
            </div>
            <div className="w-screen flex flex-wrap gap-2">

              {

                rdv.remede ? rdv.remede.map((item, index) => <RdvContentItem key={index} type="remede" value={item} />) : null
              }

            </div>
          </div>



        </div> : null}

      </div>
    </div>
  );
};



function Details() {

  const [showInfo, setShowInfo] = useState(false);
  const patient = useSelector(state => state.patients.patientRdv);

   console.log(patient);
  const [addRdv, setAddRdv] = useState(false);
  const [load, setload] = useState(false);
  const [fiterConsul, setFilterConsul] = useState('');
  


  return (
    <div>
      <div className="detail h-[80vh]  p-6">
      {/* {load ? <Loading /> : null} */}
        <div className=" hearder ">
          <h2 className="flex flex-col md:flex-row w-full text-xl text-left mb-4 font-semibold flex items-center ">
            <p className="text-[16px]" >Afficher les informations du patient</p>
            <div  className="flex w-full md:w-1/2  justify-between items-center">
            {!showInfo ? (
              <ChevronDownIcon
                onClick={() => setShowInfo(true)}
                className="w-6 p-1 h-6 bg-primary text-white rounded-full cursor-pointer ml-2"
              />
            ) : (
              <ChevronUpIcon
                onClick={() => setShowInfo(false)}
                className="w-6 p-1 h-6 bg-primary text-white rounded-full cursor-pointer ml-2"
              />
            )}
             <label onClick={() =>{
              setShowInfo(false)
              setAddRdv(false)
              }} htmlFor="patient-detail-modal" className="btn btn-premary sm:absolute top-5 right-5">Fermer</label>
            </div>
          </h2>

          {showInfo ? (
            <div className="mt-6 ">
                    <h2 className="text-lg font-semibold mb-4 "> <IconContext.Provider value={{ className: 'h-45 w-45 text-primary'}}>  <RiLockPasswordFill/></IconContext.Provider>   Code patient: <span class="text-secondary mr-8"> {patient.code_patient}</span> Mot de passe: <span class="text-secondary mr-8"> {patient.password}</span> Nom: <span class="text-secondary"> {patient.nom}</span></h2>
                <div className="w-full h-2 bg-gray-300 mb-2 rounded-lg"/>
              <div className="detail-header  flex flex-col md:flex-row justify-between gap-2">
              {!patient.image?<div className="photo-box w-40 h-40 bg-primary rounded-md"></div>
                :<div className="photo-box  rounded-md" style={{backgroundColor: "#f8f8f8", width: "120px", height: "120px",}} >
                  <img src={patient.image} className="photo-box " style={{width: "100%", height: "100%", objectFit:"fill"}} alt="patient photo" />
                </div> 
              }
                <div className="">
                  <div className="flex justify-between  w-[18rem]">
                    <h2 className="text-lg font-semibold ">{patient.nom} </h2>
                    <h2 className="text-lg font-semibold ">{patient.prenom}</h2>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 w-[18rem]">
                    <h2 className="text-sm">Date de naissance</h2>
                    <h2
                      className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                    >
                      {patient.date_naissance}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center mt-2 w-[18rem]">
                    <h2 className="text-sm">Situation matrimoniale</h2>
                    <h2
                      className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                    >
                      {patient.s_matrimoniale}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center mt-2 w-[18rem]">
                    <h2 className="text-sm">Réligion</h2>
                    <h2
                      className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                    >
                      {patient.religion}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center mt-2 w-[18rem]">
                    <h2 className="text-sm">Profession</h2>
                    <h2
                      className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                    >
                      {patient?.profession}
                    </h2>
                  </div>
                </div>
                <div className="">
                  {/* <div className="flex justify-between  w-[18rem]"> */}
                  <h2 className="text-lg text-left font-semibold ">
                    Informations du carnet
                  </h2>
                  {/* </div> */}

                  <div className="flex justify-between items-center mt-2 w-[18rem]">
                    <h2 className="text-sm">Date de l'inscription</h2>
                    <h2
                      className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                    >
                      12/05/1996
                    </h2>
                  </div>
                  <h2 className="text-sm my-2">Le rendez-vous prochain</h2>
                  <h2
                    className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                  >
                    26/03/2022{" "}
                  </h2>

                  <h2 className="text-sm my-2">Nombre de rendez-vous </h2>
                  <h2
                    className="text-sm 
                        border-2 border-primary text-primary
                        border-dashed 
                        rounded-md px-6 py-2
                      "
                  >
                    <span className="bg-primary p-2 mr-2 rounded-md text-white">
                      12
                    </span>{" "}
                    /
                    <span className="bg-primary p-2 ml-2 rounded-md text-white">
                      20
                    </span>
                  </h2>
                </div>
              </div>
              <h2 className="text-xl text-left mt-2 font-semibold ">
                Antécédent médical
              </h2>
              <div className="bg-slate-100 w-full mt-2 h-48 p-4">
              {patient?.ante_medicaux}

                </div>{" "}
            </div>
          ) : null}
        </div>
       {!showInfo? <div className="text-left mt-2 h-96 ">
          <h2 className="text-xl  font-semibold ">Liste de rendez-vous</h2>
          <input
            // value={fiterConsul}
            onChange={(e) => setFilterConsul(e.target.value)}
            type="search"
            placeholder="Rechercher consultation"
            className="input  w-full border-2 border-solid border-primary max-w-xs"
          />
          <button className="mt-5 btn btn-primary ml-2" onClick={() => setAddRdv(!addRdv)} >{!addRdv ? "Nouvelle consultation" : "Voir consultations"}</button>
          {/* list rdv ISCompo */}
          {addRdv ? <NewRdv loading={setload} newrdv={setAddRdv} /> :
            patient ? patient.filter(rdvFiltered =>{
              if(fiterConsul==""){
                return rdvFiltered
              }else if(rdvFiltered.date_consultation.toLowerCase().includes(fiterConsul.toLowerCase())){
                return rdvFiltered
              }
            })
            .map((rdv, index) => <Rdv key={index} rdv={rdv}  />) : null
          }
        </div>: null}
      </div>
    </div>
  );
}

export default Details;
