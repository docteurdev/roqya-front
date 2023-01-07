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
  ChevronDownIcon,
  ChevronUpIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  FaceFrownIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookSquare, FaGlobe, FaStoreAlt } from "react-icons/fa";

import "../../App.css";
import SmallCard from "../../components/card/SmallCard";
import image from "../../assets/roqya.jpg";
import Patients from "../../components/Patients/Patients";
import AddPatientForm from "../../components/AddPatientForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPersonals } from "../../redux/personnel";
import { getPatients } from "../../redux/patients";
import { AddPersonelForm, Header, ListPersonnel, Loading, Toast } from "../../components";
import UserLogin from "../../components/UserLogin";
import {
  alterStatShon,
  disconnectAssitant,
  disconnectCenter,
  setCenterConx,
} from "../../redux/connexion";
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
    <div
      className="
        text-gray-800 text-left my-1 w-full 
        border-2 border-gray p-1 
        rounded-md hover:bg-gray-800 
        hover:text-white
        "
    >
      <h3 className="font-semibold">
        {" "}
        {raki.nom} {raki.prenom}{" "}
      </h3>
      <h3 className="text-sm font-medium"> {raki.contact} </h3>
    </div>
  );
};

function Dash() {
  const stat = useSelector((state) => state.login.statSHown);

  const [showRakis, setshowRakis] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedDash, setloadedDash] = useState(false);
  const [filterRakis, setFilterRakis] = useState("");

  const userInfos = JSON.parse(localStorage.getItem("userInfos"));
  const centreInfo = JSON.parse(localStorage.getItem("centreInfo"));
  const rakyLogged = JSON.parse(localStorage.getItem("rakyLogged"));
  const loaction = useLocation();
  const navigate = useNavigate();

  if (!userInfos && !centreInfo) {
    navigate("/");
  }

  // console.log('----dash load == false-------');
  //  console.log(userInfos);

  const dispatch = useDispatch();

  const personnels = useSelector((state) => state.personels);
  const showMsg = useSelector((state) => state.message.showMsg);

  const isAssitConx = useSelector((state) => state.login.assitantConx);
  const isCenterConx = useSelector((state) => state.login.centerConx);
  const updatePatient = useSelector((state) => state.patients.updatePatient);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // console.log("isCenterConx 111", centreInfo);

    if (centreInfo?.Employes.length) {
      dispatch(disconnectCenter(true));
    }
    // if (userInfos) {
    //   dispatch(disconnectAssitant(true))
    // }

    dispatch(getPersonals(loaction.state ? loaction.state.id : centreInfo.id));
    dispatch(getPatients(loaction.state ? loaction.state.id : centreInfo.id));

    return () => {
      // setloadedDash(false)
      // console.log("compt demonté");
    };
  }, []);

  return (
    <div className="min-h-full">
      {updatePatient ? <Loading /> : null}
      {/* {showMsg ? <Toast /> : null} */}



      <input type="checkbox" id="listpersonel" className="modal-toggle" />
      <div className="modal bg-white-100 backdrop-blur-sm">
        <div className="modal-box w-3/12 max-w-5xl ">
          <ListPersonnel/>
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal bg-white-100 backdrop-blur-sm">
        <div className="modal-box w-11/12 max-w-5xl ">
          <AddPatientForm closePop="" />
        </div>
      </div>

      <input type="checkbox" id="new-personel" className="modal-toggle" />
      <div className="modal bg-white-100 backdrop-blur-sm">
        <div className="md:w-4/12  modal-box w-full mx-2 max-w-5xl ">
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
        <div className="main-container md:flex-row md:mx-auto flex flex-col pt-2   ">
          <div className="hidden user-bx md:block h-auto w-[250px] ">
            {userInfos ? (
              <div className="h-auto md:h-[130%] ml-1 py-2 bg-gray-800 text-white rounded-md border-solid border-2 px-4 w-full">
                <div className=" flex items-center justify-between border-b-2 border-white">
                  <div className="w-[45px] h-[45px] overflow-hidden border-solid border-2 rounded-full">
                    {userInfos.image ? (
                      <img src={user.imageUrl} alt="" />
                    ) : (
                      <UserIcon />
                    )}
                  </div>
                  {userInfos ? (
                    <div
                      onClick={() => {
                        localStorage.removeItem("userInfos");
                        navigate("/assisLogin");
                      }}
                      className="flex items-center cursor-pointer hover:bg-white hover:text-gray-800 my-6 border-2 border-color-white rounded-md py-2 px-2"
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                      <p className="ml-2 text-xs font-semibold cursor-pointer">
                        Déconnexion
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center mt-4">
                  <UserIcon className="h-6 w-6" />
                  <p className="ml-2 text-xs font-semibold">
                    {userInfos?.nom} {userInfos?.prenom}{" "}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <PhoneIcon className="h-6 w-6" />
                  <p className="ml-2 text-xs font-semibold">
                    {userInfos?.contact}
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <IdentificationIcon className="h-6 w-6" />
                  <p className="ml-2 text-xs font-semibold">
                    {userInfos?.typeEmploye} {userInfos?.id}{" "}
                  </p>
                </div>
                <div className="flex mt-4">
                  <UsersIcon className="h-6 w-6" />
                  <p className="ml-2 text-xs font-semibold">
                    Nouveaux patients
                  </p>
                </div>
                <div className="flex mt-4">
                  <ClipboardDocumentListIcon className="h-6 w-6" />
                  <p className="ml-2 text-xs font-semibold">
                    Consultations 12{" "}
                  </p>
                </div>
               
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center h-48 bg-gray-800 ml-1 text-white p-2 rounded-lg">
                <p className="text-[14px]">
                  Ajouter un personel afin de pouvoir ajouter un patient
                </p>
                <button
                  onClick={() =>
                    document.getElementById("new-personel").click()
                  }
                  className="hover:bg-slate-500 transition-all border-solid border-2 px-6 py-1 mt-4 rounded-lg"
                >
                  Ajouter un personel
                </button>
              </div>
            )}
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
