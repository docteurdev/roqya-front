import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  UsersIcon,
  ChartPieIcon,
  ChevronDownIcon, ChevronUpIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  FaceFrownIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookSquare, FaGlobe, FaStoreAlt } from "react-icons/fa";

import '../../App.css'
import SmallCard from "../../components/card/SmallCard";
import image from "../../assets/roqya.jpg";
import Patients from "../../components/Patients/Patients";
import AddPatientForm from "../../components/AddPatientForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPersonals } from "../../redux/personnel";
import { getPatients } from "../../redux/patients";
import { AddPersonelForm, Header, Loading, Toast } from "../../components";
import UserLogin from "../../components/UserLogin";
import { alterStatShon, disconnectAssitant, disconnectCenter } from "../../redux/connexion";
import { useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Centre", href: "#" },
  // { name: "Settings", href: "#" },
  { name: "Déconnexion", href: "#" },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RakisItem = ({ raki }) => {
  return (
    <div className="
        text-gray-800 text-left my-1 w-full 
        border-2 border-gray p-1 
        rounded-md hover:bg-gray-800 
        hover:text-white
        ">
      <h3 className="font-semibold"> {raki.nom} </h3>
      <h3 className="text-sm font-medium"> {raki.contact} </h3>
    </div>
  )
}


function Dash() {


  const stat = useSelector(state => state.login.statSHown);

  const [showRakis, setshowRakis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedDash, setloadedDash] = useState(false);

  const userInfos = JSON.parse(localStorage.getItem('userInfos'));
  const centreInfo = JSON.parse(localStorage.getItem('centreInfo'));
  const loaction = useLocation()
  const navigate = useNavigate()

  if (!userInfos && !centreInfo) {
    navigate('/')
  }
  // console.log('----dash load == false-------');
  //  console.log(userInfos);

  const dispatch = useDispatch();

  const personnels = useSelector(state => state.personels);
  const showMsg = useSelector(state => state.message.showMsg)



  const isAssitConx = useSelector(state => state.login.assitantConx);
  const isCenterConx = useSelector(state => state.login.centerConx);
  const updatePatient = useSelector(state => state.patients.updatePatient)

  useEffect(() => {


    setTimeout(() => {
      setLoading(false)
    }, 3000)

    if (!loaction.state?.Employes.length) {
      // setloadedDash(true)
      dispatch(disconnectCenter(false))
    }
    if (!userInfos) {
      dispatch(disconnectAssitant(true))
    }


    dispatch(getPersonals(loaction.state ? loaction.state.id : centreInfo.id));
    dispatch(getPatients(loaction.state ? loaction.state.id : centreInfo.id));

    return () => {
      // setloadedDash(false)
      // console.log("compt demonté");
    }

  }, [])






  return (
    <div className="min-h-full">

      {updatePatient ? <Loading /> : null}
      {showMsg ? <Toast /> : null}

      {isCenterConx ? <UserLogin loadedDash={setloadedDash} /> : null}
      {isAssitConx ? <UserLogin loadedDash={setloadedDash} /> : null}

      {/* <UserLogin loadedDash={setloadedDash} /> */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal bg-white-100 backdrop-blur-sm">
        <div className="modal-box w-11/12 max-w-5xl ">
          <AddPatientForm closePop="" />
        </div>
      </div>

      <input type="checkbox" id="new-personel" className="modal-toggle" />
      <div className="modal bg-white-100 backdrop-blur-sm">
        <div className="md:w-4/12  modal-box w-3/4 max-w-5xl ">
          <h2 className="text-medium font-bold">Ajouter un personel</h2>
          <AddPersonelForm closePop="" />
        </div>
      </div>

      <Header />

      <main className="relative">
        <div className="absolute z-10 top-0 left-0 w-full shadow bg-white-100 backdrop-blur-sm sm:px-6 lg:px-8">
          {stat ? (
            <div className="  flex flex-wrap items-center justify-center gap-2 stat w-full ">
              <SmallCard title="Hommes" />
              <SmallCard title="Femmes" />
              <SmallCard title="Enfants" />
              <SmallCard title="Musulmans" />
              <SmallCard title="Chrétiens" />
              <SmallCard title="Animistres" />
            </div>
          ) : null}
        </div>
        <div className="main-container md:flex-row md:mx-auto flex flex-col pt-8   ">
          <div className="hidden user-bx md:block h-auto w-[250px] ">
            <div className="h-auto p-md ml-1 bg-gray-800 text-white rounded-md border-solid border-2 px-4 w-full">
              <div className="w-[45px] mt-2 h-[45px] overflow-hidden border-solid border-2 rounded-full">
                <img src={user.imageUrl} alt="" />
              </div>
              <div className="flex items-center mt-4">
                <UserIcon className="h-6 w-6" />
                <p className="ml-2 text-xs font-semibold">{userInfos?.nom} {userInfos?.prenom} </p>
              </div>
              <div className="flex items-center mt-4">
                <PhoneIcon className="h-6 w-6" />
                <p className="ml-2 text-xs font-semibold">{userInfos?.contact}</p>
              </div>
              <div className="flex items-center mt-4">
                <IdentificationIcon className="h-6 w-6" />
                <p className="ml-2 text-xs font-semibold">{userInfos?.typeEmploye} {userInfos?.id} </p>
              </div>
              <div className="flex mt-4">
                <UsersIcon className="h-6 w-6" />
                <p className="ml-2 text-xs font-semibold">Nouveaux patients</p>
              </div>
              <div className="flex mt-4">
                <ClipboardDocumentListIcon className="h-6 w-6" />
                <p className="ml-2 text-xs font-semibold">Consultations 12 </p>
              </div>
              <h3 className="font-semibold mt-3 text-left text-sm">Rakis du centre</h3>
              <div className="w-full h-8 mt-2 bg-white  rounded-full flex justify-between items-center">
                <div style={{width: showRakis? '100%': 40, justifyContent:showRakis?'flex-start' :'center'}} className="rakis-search flex items-center pr-1 justify-center w-[40px] h-[40px] rounded-full bg-gray-800 border-2 border-white">
                {!showRakis ? <ChevronDownIcon
                  onClick={() => setshowRakis(!showRakis)}
                  className="w-[30px] p-1 h-[30px] text-white rounded-full cursor-pointer m-2"
                />
                  :
                  <ChevronUpIcon
                    onClick={() => setshowRakis(!showRakis)}
                    className="w-[30px] p-1 h-[30px] text-white rounded-full cursor-pointer m-2"
                  />}
                 {showRakis? <input
                  type="search"
                  className="relative block w-full appearance-none rounded-none rounded-tr-full rounded-br-full border border-gray-300 px-3 py-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Le nom du Raki"
                />: null}
                </div>
              </div>
              {showRakis ? <div className="w-full h-60 mt-2 bg-white  p-1 rounded-md ">
                {/* local component */}
                {
                  personnels?.filter(raki => raki.typeEmploye === "raki")
                    .map((personnel, index) => <RakisItem raki={personnel} key={index} />)
                }


              </div> : null}

              {userInfos ? <div className="flex items-center cursor-pointer hover:bg-white hover:text-gray-800 my-6 border-2 border-color-white rounded-md py-2">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                <p
                  onClick={() => {
                    localStorage.removeItem('userInfos')
                    dispatch(disconnectAssitant(true))
                  }}
                  className="ml-2 text-xs font-semibold cursor-pointer">Déconnexion</p>
              </div> : null}
            </div>
          </div>

          <div style={{}} className="patients-list px-4 w-[80%]">
            <Patients />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dash;
