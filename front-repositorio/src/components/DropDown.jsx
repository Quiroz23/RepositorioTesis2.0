import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"


function DropdownMenu({ userData, opciones }) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const {nombre_usuario } = userData || {}


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/')
  }

  return (
    <div className="relative inline-block text-center">
      <button
        id="dropdownDefaultButton"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
        onClick={toggleDropdown}
      >
        <svg fill="#000000" width="20px" height="20px" className='mr-1' viewBox="-8 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
        </svg>
      {nombre_usuario}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path 
          stroke="currentColor" 
          d="m1 1 4 4 4-4"
          />
        </svg>

        

      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-600"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <Link 
                to={opciones.enlacePerfil[1]} 
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Perfil
              </Link>
            </li>
            <li className='flex justify-center'>
            <button 
              onClick={handleLogout} 
              className="flex items-center px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover-text-white"
              >
              Cerrar sesión
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" ></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889"
                    stroke="#f7f7f8"
                  ></path>
                </g>
              </svg>
            </button>

            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
