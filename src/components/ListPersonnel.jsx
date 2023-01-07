import { ChevronDownIcon, ChevronUpIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPersonals } from "../redux/personnel";

const RakisItem = ({ raki }) => {
  return (
    <div
    className="flex justify-between items-center  border-2 border-gray p-1 
    rounded-md hover:bg-gray-800 
    hover:text-white my-1  text-gray-800 text-left"
    >

        <div
        className="
             w-full 
           
            "
        >
        <h3 className="font-semibold">
            {" "}
            {raki.nom} {raki.prenom}{" "}
        </h3>
        <h3 className="text-sm font-medium"> {raki.contact} </h3>
        </div>
    <UserIcon className="w-8 h-8" />
    </div>
  );
};

function ListPersonnel() {
  const centreInfo = JSON.parse(localStorage.getItem("centreInfo"));
  const [showRakis, setshowRakis] = useState(false);
  const [filterRakis, setFilterRakis] = useState("");

  const dispatch = useDispatch();

  const loaction = useLocation();
  const personnels = useSelector((state) => state.personels);
  // console.log(personnels);

  useEffect(() => {
    dispatch(getPersonals(loaction.state ? loaction.state.id : centreInfo.id));
  }, []);

  return (
    <div>
      <div className="w-full h-96 mt-2 bg-white  rounded-full">
        <div className="flex items-center gap-4">
          <div
            onClick={() => document.getElementById("listpersonel").click()}
            className="flex justify-center items-center cursor-pointer text-white rounded-full p-1 w-8 h-8 bg-slate-500"
          >
            <RiCloseFill />
          </div>
          <div
            style={{
              width: "70%",
              justifyContent: "center",
            }}
            className="rakis-search overflow-hidden border-2 border-slate-600 flex items-center pr-1 justify-center h-[40px] rounded-lg"
          >
            
            
              <input
                onChange={(e) => setFilterRakis(e.target.value)}
                type="search"
                className="relative block w-full appearance-none rounded-lg border-none border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-none focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Le nom du Raki"
              />
            
          </div>
        </div>
        <div className="w-full h-60 mt-2 bg-white  p-1 rounded-md ">
          {/* local component */}
          {personnels.length &&
            personnels
              ?.filter((raki) => {
                if (filterRakis == "") {
                  return raki;
                } else if (
                  raki.userName
                    .toLowerCase()
                    .includes(filterRakis.toLowerCase())
                ) {
                  return raki;
                }
              })
              .map((personnel, index) => (
                <RakisItem raki={personnel} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default ListPersonnel;
