import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import logoImg from "../../assets/roqya.jpg";
import * as yup from "yup";
import { Formik } from "formik";
import { Loading, RegisterInput, Toast } from "../../components";
// import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPersonals } from "../../redux/personnel";
import { getPatients } from "../../redux/patients";
import { disconnectCenter } from "../../redux/connexion";
import { alterShowMsg, setMessage } from "../../redux/message";
import { axios } from "../../components/common/axios";
import { TbStethoscope } from "react-icons/tb";
import { IconContext } from "react-icons";

function Login() {
  const [registier, setRegister] = useState(false);

  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const centerInfos = JSON.parse(localStorage.getItem("centreInfo"));

  const dispatch = useDispatch();

  const showMsg = useSelector((state) => state.message.showMsg);

  // useEffect(() => {
  //     if(centerInfos) return navigate('/assisLogin')

  // }, [centerInfos])

  const navLink = (route) => {
    navigate(route);
  };
  const schema = yup.object().shape({
    nomCentre: yup.string().required("le nom de centre est obligatoire"),
    situationGeo: yup
      .string()
      .required("la situation Géographique est obligatoire"),
    contact: yup.string().required("le contact situationGeo"),
    siteweb: yup.string().url(),
    email: yup.string().email(),
    facebook: yup.string().url(),
    youtube: yup.string().url(),
    password: yup.string().required("le mot de passe est obligatoire"),
  });

  const register = (e) => {
    setLoading(true);
    e.preventDefault();
    let data = {
      userName: userName,
      password: password,
    };

    axios
      .post("login/centre", data)
      .then((resp) => {
        if (resp.data) {
          setLoading(false);
          dispatch(disconnectCenter(false));
          let msg = {
            status: 200,
            message: "Le centre est connecté avec succèss",
          };

          dispatch(setMessage(msg));
          dispatch(alterShowMsg(true));

          setTimeout(() => {
            dispatch(alterShowMsg(false));
          }, 3000);

          localStorage.setItem("centreInfo", JSON.stringify(resp.data.data));

          if (resp.data.data.Employes.length > 0) {
            navigate("/assisLogin");
          } else {
            navigate("/board");
          }
          setLoading(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data);

        let msg = { status: 404, message: error.response.data };

        dispatch(setMessage(msg));
        dispatch(alterShowMsg(true));

        setTimeout(() => {
          dispatch(alterShowMsg(false));
        }, 3000);
      });
  };

  return (
    <div className="flex h-[100vh]  bg-gray-100 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {showMsg ? <Toast /> : null}
      <div className="login-bx w-full shadow-md p-4 max-w-md space-y-8">
        {loading ? <Loading /> : null}

        <div>
          {/* <img
            className="mx-auto h-40 w-auto"
            src={logoImg}
            alt="logo"
          /> */}

          <div className="w-12 h-12 mx-auto p-1 my- flex items-center justify-center bg-indigo-600 rounded-full">
            {/* <img src={logo} alt="roqya-logo" className='h-full w-full rounded-full mb-1' /> */}
            <IconContext.Provider value={{ className: "w-8 h-8 text-white " }}>
              <TbStethoscope/>
            </IconContext.Provider>
          </div>

          <h2 className="mt-6 text-center text-md font-bold tracking-tight text-gray-900">
             Connecter le centre
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </a>
            </p> */}
        </div>

        <form onSubmit={register} className="mt-8 space-y-6">
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}
          <div className="-space-y-px rounded-md shadow-sm">
            <>
              <RegisterInput
                type="text"
                placeholder="Nom utilisateur"
                value={userName}
                setValue={setuserName}
              />

              <RegisterInput
                type="text"
                value={password}
                placeholder="Mot de passe"
                setValue={setPassword}
              />
            </>
          </div>

          <div className="text-right">
            <div className="text-sm">
              <p
                onClick={() => navLink("/create-center")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                {registier ? "Se connecter?" : "Créer un nouveau centre?"}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Connexion
            </button>
          </div>
        </form>

        <Outlet />
      </div>
    </div>
  );
}

export default Login;
