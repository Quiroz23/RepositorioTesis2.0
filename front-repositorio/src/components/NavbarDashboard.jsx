import { useState } from 'react'
import { Link } from 'react-router-dom'
import iconInacap from "../img/logo_inacap.png";
import SearchModal from "./SearchModal";
import DropdownMenu from "./DropDown";


const NavbarDashboard = ({ userData ,setUser, asideOpen, setAsideOpen, opciones  }) => {

  
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const toogleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 

 

  return (
    <div>
     <nav className="flex justify-between py-2 bg-gray-200 w-screen px-8 h-[58px] shadow-lg">
        {/* Parte Izquierda del navbar */}

        <section className="flex">
          {/* Botton para controlar el aside */}
          <button
            className="bg-gray-400 p-3 rounded-sm hover:bg-gray-500"
            onClick={toogleAside}
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

          </button>
          {/* Imagen de inacap Icono */}

          <section className="mt-2 pl-5">
            <Link to={opciones.home}>
              <img src={iconInacap} alt="" />
            </Link>
          </section>

          {/* Enlaces del navbar */}

          <section className="pt-3 text-gray-800 font-normal text-md ml-5 relative flex">
            <Link
              to={opciones.enlace1[1]}
              className="pr-2 hover:text-lg hover:text-red-600 transition relative z-10"
            >
              {opciones.enlace1[0]} |
            </Link>
            <div>
              <button className="pr-2 hover:font-semibold flex" onClick={openModal}>
                Buscar tesis 
                <svg className='mt-1 ml-1 mr-1' width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg> |
              </button>
              <SearchModal isOpen={isModalOpen} onClose={closeModal} userData={userData}/>
            </div>
            
            <Link to={opciones.enlace2[1]} className="pr-2">
              {opciones.enlace2[0]} |
            </Link>
            <Link to={opciones.enlaceView[1]} className="pr-2 flex">
              {opciones.enlaceView[0]}
               
            </Link>
          </section>

        </section>

        {/* Parte derecha del navbar */}
        <div className="pt-1 flex justify-between">
         
          <section className='mr-5 pt-2'>
            <p className='font-medium'>Permisos de <span className='font-semibold'>{opciones.titulo}</span></p>
          </section>
          {/* Informacion del User */}
          <div className="flex">
           
           {/* Componente para menu de usuario ----------------- */}
            <DropdownMenu 
            opciones={opciones}
            setUser={setUser}
            userData={userData}
            />

          </div>
        </div>
      </nav>

      
    </div>
  )
}

export default NavbarDashboard
