import React from 'react'
import { LockClosedIcon } from '@heroicons/react/24/outline';
import {TbStethoscope} from "react-icons/tb"
import { useState } from 'react';
import RegisterInput from './input/RegisterInput';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { disconnectAssitant, disconnectCenter, setAssitantConx } from '../redux/connexion';
import logo from '../assets/stéthoscope.png'
import Loading from './common/Loading';
import { alterShowMsg, setMessage } from '../redux/message';
import { hideMsg } from './common/context';
import { axios } from './common/axios';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { IconContext } from 'react-icons';


function UserLogin({loadedDash}) {


    const [username, setUsername]= useState()
    const [password, setPassword]= useState();
    const [loading, setLoading] = useState(false);
    const showMsg = useSelector(state => state.message.showMsg)


    const dispatch= useDispatch();

    const centreInfo = JSON.parse(localStorage.getItem('centreInfo'));
    const navigate= useNavigate();


    const userLogin= (e) =>{
        setLoading(true)
        e.preventDefault()
        let data ={
            centreId: centreInfo.id,
            userName: username,
            password: password
        }

        axios.post("login/personels",data)
             .then(res =>{
                if(res.data){
                  // console.log(res.data);
                    // dispatch(setAssitantConx(res.data.data));

                    localStorage.setItem('rakyLogged',true)
                    let msg={status: 200, message:"Vous êtes connecté avec succèss"};
                    
                    dispatch(setMessage(msg))
                    dispatch(alterShowMsg(true))

                     setTimeout(() =>{
                     dispatch(alterShowMsg(false))
                     dispatch(disconnectCenter(false))
                      
                     navigate('/board')
                   }, 3000)


                   setTimeout(() =>{
                     dispatch(disconnectAssitant(false))
                    
                 }, 3200)
    
                    localStorage.setItem("userInfos", JSON.stringify(res.data.data));

                    setLoading(false)
                    loadedDash(true)

                }
             })
             .catch(error =>{
                // console.log(error.response);
                if(error){

                  let msg={status: 404, message:error.response.data}
                  dispatch(setMessage(msg))
                }

                dispatch(alterShowMsg(true))
                     setTimeout(() =>{
                      dispatch(alterShowMsg(false))
                      
                   }, 3000)

                setLoading(false)
                loadedDash(true)
             })
    }

    

  return (
    <div className='flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-white-200 z-10 backdrop-blur-lg ' >
      {loading? <Loading/>: null}
      {showMsg ? <Toast /> : null}

      <form onSubmit={userLogin}  className='md:w-4/12 w-full mx-8 flex flex-col justify-center p-4  h-96 bg-[#e8ebec] shadow-gray-50 rounded-lg ' >
        <div className="w-12 h-12 mx-auto p-1 mb-2 flex items-center justify-center bg-indigo-600 rounded-full">
          {/* <img src={logo} alt="roqya-logo" className='h-full w-full rounded-full mb-1' /> */}
          <IconContext.Provider value={{className: "w-8 h-8 text-white"}}>

          <TbStethoscope/>
          </IconContext.Provider>
        </div>
      <div className="text-center">
        <LockClosedIcon className="h-6 w-6 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        <p 
        className="font-sm text-[14px] text-indigo-600 hover:text-indigo-500 mb-5 text-left">
            Le Centre est connecté, connectez-vous en tant qu'utilisateur du centre afin d'accéder au tableau de board 
        </p>
       </div>

        <RegisterInput
        value={username}
        setValue={setUsername}
        placeholder="nom d'utilisateur"
        />
        <RegisterInput
        value={password}
        setValue={setPassword}
        placeholder="mot de passe"
        />
        <div>
            <button
             type='submit'
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
               Connexion
            </button>
          </div>
      </form>
    </div>
  )
}

export default UserLogin
