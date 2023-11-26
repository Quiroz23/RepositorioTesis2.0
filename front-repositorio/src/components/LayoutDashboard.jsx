import React from 'react';
import { useState, useEffect } from "react";
import { getUser } from "../api/users.api";
import { useParams } from "react-router-dom";
import SideBard from "./SideBard";
import FooterDashboard from "./FooterDashboard";
import NavbarDashboard from "./NavbarDashboard";
import getOpciones from "./utils/Roles";

const LayoutDashboard = ({ children, setUser }) => {

  const [ asideOpen, setAsideOpen ] = useState(false);
  const [ userData, setUserData ] = useState(null)

  const params = useParams() // - Con este params podemos acceder a datos que allan en la url en este caso el id

  useEffect(() => {
    async function loadUserData() {
      if (params.id) {
        const res = await getUser(params.id)
  
        // - res.data contiene los datos del usuario
        setUserData(res.data)
      }
    }
    loadUserData()
  }, [params.id])

  const rolUsuario = userData?.rol_usuario || ''
  const idUser = params.id
  const opciones = getOpciones( rolUsuario, idUser )
  
  const childrenProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        userData: userData,
        opciones: opciones,
      });
    }
    return child;
  });

  
  return (
    <div>
      <section className="w-screen bg-red-600 h-1"></section>
      {/* Navbar */}

      <NavbarDashboard 
        setUser={setUser}
        userData={userData}
        asideOpen={asideOpen}
        setAsideOpen={setAsideOpen}
        opciones={opciones}

      />
      

      {/* Contenido de la pagina  */}
      <div className="md:flex md:h-screen m-1">
        {/* Aside o menu lateral */}
        <aside
          className={`transition-all duration-500  ${
            asideOpen ? "md:w-1/6 bg-gray-300" : "md:w-0"
          } `}
        >
          <SideBard 
            opciones={opciones}
            />
        </aside>

        {/* Contenido de la pagina */}
        <main
          className={`bg-gray-400 rounded-xl w-screen transition-all duration-500 overflow-scroll  ${
            !asideOpen ? "md:w-6/6" : "md:w-5/6"
          } `}
        >
          {childrenProps}
        
        <footer 
          className="mt-20 w-full bg-white h-[30%]">
         <FooterDashboard />
        </footer>
        
        </main>
        
      </div>
    </div>
  );
};

export default LayoutDashboard;
