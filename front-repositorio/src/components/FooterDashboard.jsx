import IconInacapFooter from "../img/logo-inacap-negro.png";
import Acreditacion from "../img/acreditacion.png";

const FooterDashboard = ({userData}) => {
  

  return (
    <div>
      {/* Redes sociales  */}
      <section className="w-full flex bg-red-600 h-11 text-white">
      </section>
      {/* Contenido footer */}
      <div className="grid grid-rows-1 grid-cols-2 justify-between px-32 p-5 w-full h-full">
        <section>
          <img src={IconInacapFooter} className="md:w-[25%]" alt="" />
          <p className="pt-6 text-xs">
            Usted se ha identificado como  (Cerrar sesión) Reiniciar
            tour para usuario en esta página Página Principal Resumen de
            retención de datos
          </p>
        </section>
        <section className="px-10">
          <img src={Acreditacion} alt="" />
        </section>
      </div>
    </div>
  );
};

export default FooterDashboard;
