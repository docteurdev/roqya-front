import React, { useState } from 'react'
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
    FaceFrownIcon
  } from "@heroicons/react/24/outline";
  import {  BsYoutube } from "react-icons/bs";
  import {FaFacebookSquare, FaGlobe, FaStoreAlt, FaUser} from "react-icons/fa";
  import { IconContext } from "react-icons/lib";
  import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { alterStatShon, disconnectAssitant, disconnectCenter } from "../../redux/connexion";
import image from "../../assets/roqya.jpg";
import '../../App.css';


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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
  
  
function Header() {

    const centreInfo = JSON.parse(localStorage.getItem('centreInfo'));
  const userInfos = JSON.parse(localStorage.getItem('userInfos'));
   
    const [stat, setStat] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
  

  return (
    <div>
            <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-lg"
                      src={centreInfo.logo? centreInfo.logo: image}
                      alt=""
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-center space-x-4">
                      <a className="flex bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                        {/* <UsersIcon className="h-6 w-6" /> */}
                        <IconContext.Provider value={{className:"h-6 w-6 mr-3"}}>
                        <FaStoreAlt/>
                        </IconContext.Provider>
                        <span class="header-link"> Boutique </span>
                      </a>
                      <a
                        onClick={() => dispatch(alterStatShon())}
                        className="flex bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >
                        <ChartPieIcon className="h-6 w-6 mr-3" />
                        <span class="header-link"> Statistiques </span>
                      </a>
                      <a
                        className=" flex  bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >
                        <UserIcon className="h-6 w-6 mr-3" />
                        <label className='show-patient header-link' htmlFor="my-modal" >Nouveau Patient</label>

                      </a>
                      <a
                        className=" flex bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                      >
                        <UserPlusIcon className="h-6 w-6 mr-3" />
                        <label className='show-patient header-link' htmlFor="new-personel" >Nouveau Personel</label>

                      </a>
                      <a
                       href={centreInfo.youtube}
                        className=" flex bg-gray-900 w-15 h-15 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm font-medium cursor-pointer"
                      >
                        <IconContext.Provider value={{ color:'#FF0000', className:"h-4 w-4"}}>
                          <BsYoutube/>
                        </IconContext.Provider>
                      </a>
                      <a
                       href={centreInfo.facebook}
                        className=" flex bg-gray-900 w-15 h-15 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm font-medium cursor-pointer"
                      >
                        <IconContext.Provider value={{ color:'#4267B2', className:"h-4 w-4"}}>

                        <FaFacebookSquare />
                        </IconContext.Provider>
                      </a>
                      <a
                       href={centreInfo.siteWeb}
                        className=" flex bg-gray-900 w-15 h-15 text-white text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm font-medium cursor-pointer"
                      >
                        <IconContext.Provider value={{className:"h-4 w-4"}}>
                        <FaGlobe/>

                        </IconContext.Provider>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          {/* <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8  rounded-full"
                            src={user.imageUrl}
                            alt=""
                          /> */}
                          <IconContext.Provider value={{ color:'#fff', className:"h-4 w-4"}}>

                            <FaUser />
                          </IconContext.Provider>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute text-left right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="text-sm font-semibold"><a>Modifier le centre</a></li>
                            <li
                              onClick={() => {
                                localStorage.removeItem('centreInfo')
                                localStorage.removeItem('userInfos');
                                 dispatch(disconnectCenter(true))
                                navigate('/')

                              }}
                              className="text-sm font-semibold"><a>Déconnecter le centre?</a></li>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1  px-2 pt-2 pb-3 sm:px-3">
                
                  <h6
                    
                  >
                    <label className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium show-patient header-link' htmlFor="new-personel" >Nouveau Personel</label>
                  </h6>
                  <h6
                    
                  >
                    <label className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium show-patient header-link' htmlFor="my-modal" >Nouveau Patient</label>
                  </h6>
                  <h6
                   onClick={() =>{
                    dispatch(disconnectAssitant(true))
                    localStorage.removeItem('userInfos')
                }}
                    >
                      <label className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium '  >Se déconnecter</label>
                    </h6>

               
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                    //   src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {userInfos?.nom}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {userInfos?.contact}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">

                  {/* <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button> */}

                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  )
}

export default Header
