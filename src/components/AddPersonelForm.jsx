// import axios from 'axios';
import React, { useState,} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPersonals } from '../redux/personnel';
import RegisterInput from './input/RegisterInput';
import { Loading } from "./index"
import { axios } from './common/axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function AddPersonelForm() {

  const [typePersonel, setTypePersonel] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setpreNom] = useState("");
  const [contact, setcontact] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [photo, setphoto] = useState("");
  const [load, setLoad] = useState(false);

  const rakis = useSelector(state => state.personels);
  // console.log(rakis);
  const dispatcha = useDispatch();

  const navigate= useNavigate();

  const centreInfo = JSON.parse(localStorage.getItem('centreInfo'));

  useEffect(() =>{
    // navigate('/assisLogin')
    console.log(rakis.length);
  },[])

  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      setphoto(e.target.files[0]);
    }
  }
  
  const newpersonel = () => {
    console.log(photo);

    setLoad(true)
     let formData= new FormData();
     formData.append('image', photo)
     formData.append('name', photo)
    let data = {
      idCentre: centreInfo.id,
      idTypeEmploye: typePersonel,
      image: "",
      employe: {
        userName: username,
        password: password,
        typeEmploye: typePersonel,
        nom: nom,
        prenom: prenom,
        contact: contact,
      }
    }

    // console.log('====================================');
    // console.log(data);
    // console.log('====================================');

    axios.post("api/roqya_ci/create_employe", data)
      .then(res => {
       
        if (res.data) {
           dispatcha(getPersonals(centreInfo.id));
           
           setTimeout(()=>{
            setLoad(false)
            
            if(rakis.length == 0){
              navigate('/assisLogin')
              console.log("navigate('/assisLogin')");
            }
            document.getElementById('new-personel').click();
          }, 2000)
          // console.log(res.data)

        }
      })
      .catch(res => {
        setLoad(false)
        console.log(res)

      }
      );
  }

  return (
    <div>
      <>
        {load ? <Loading /> : null}
        <form encType='multipart/from-data' >
          <div className="w-full">
            <h2 className='font-semibold' >Type de personel</h2>
            <select
              onChange={(e) => setTypePersonel(e.target.value)}
              className="select mt-1 select-accent w-full max-w-xs">
              <option disabled selected>Selectionner un raqki </option>
              <option value="raki">raki</option>
              <option value="sécrétaire">sécrétaire</option>
            </select>
          </div>

          <RegisterInput
            value={nom}
            setValue={setNom}
            placeholder="Nom"
          />
          <RegisterInput
            value={prenom}
            setValue={setpreNom}
            placeholder="Prenom"
          />
          <RegisterInput
            value={contact}
            setValue={setcontact}
            placeholder="Contact"
          />
          <RegisterInput
            value={username}
            setValue={setusername}
            placeholder="Nom d'utilisateur"
          />
          <RegisterInput
            value={password}
            setValue={setpassword}
            placeholder="mot de passe"
          />

          {/* <input
            type="file"
            className="relative block w-full my-2 appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            onChange={imgFilehandler}
            name="image"
          /> */}

          <div className="bg-gray-50 px-4 py-3 text-right flex ">
            <label
              htmlFor="new-personel"
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
              onClick={newpersonel}
              type="submit"
              className="inline-flex ml-4 justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Enregistrer
            </label>
          </div>

        </form>
      </>
    </div>
  )
}

export default React.memo(AddPersonelForm)
