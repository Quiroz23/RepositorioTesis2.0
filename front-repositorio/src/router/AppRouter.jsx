import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from 'react-use'
import { Toaster } from "react-hot-toast";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import LayoutDashboard from '../components/LayoutDashboard'
import NewTesis from "../pages/NewTesis";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import PerfilPage from "../pages/PerfilPage";
import { ListTesis } from "../pages/ListTesis";
import PreviewTesis from "../pages/PreviewTesis";
import SolicitudesRealizadas from "../pages/SolicitudesRealizadas";
import ViewPdf from "../pages/ViewPdf";
import AdministrarTesis from "../pages/AdministrarTesis";
import HistorialSolicitadas from "../pages/HistorialSolicitadas";


const AppRouter = () => {

  const [ user, setUser ] = useLocalStorage('user')

  return (
    <BrowserRouter>
        {/* Rutas de la pagina */}
        {/* Ruta del Login */}
        <Routes> 
          <Route path="/" 
              element={<LoginPage />} />
       
            {/* Componente que protege las rutas */}
            <Route element={<ProtectedRoutes canActivate={user}/>}> 
            {/* Inicio rutas protegidas */}
              <Route path="/HomeDashboard/:id" 
              element={
              <LayoutDashboard setUser={setUser}>
                <DashboardPage />
              </LayoutDashboard>
              } />
              <Route
              path="/New-Tesis/:id"
              element={
                <LayoutDashboard>
                  <NewTesis />
                </LayoutDashboard>
              } />
              <Route
              path="/Perfil/:id"
              element={
                <LayoutDashboard>
                  <PerfilPage />
                </LayoutDashboard>
              } />
              <Route
              path= "/ListTesis/:id"
              element={
                <LayoutDashboard>
                  <ListTesis />
                </LayoutDashboard>
              } />
              <Route
                path="/PreviewTesis/:id/:idTesis"
                element={
                <LayoutDashboard>
                  <PreviewTesis />
                </LayoutDashboard>}
              />
              <Route 
              path="/ViewTesis/:id/"
              element={
              <LayoutDashboard>
                <SolicitudesRealizadas />
              </LayoutDashboard>} 

              />
              <Route 
                path="/leer-tesis/:id/:idTesis"
                element={
                  <LayoutDashboard>
                    <ViewPdf />
                  </LayoutDashboard>
                }
              />
              <Route
                path="/AdministrarTesis/:id"
                element={
                  <LayoutDashboard>
                    <AdministrarTesis />
                  </LayoutDashboard>
                }
              />
              <Route
                path="/HistorialSolicitudes/:id"
                element={
                  <LayoutDashboard>
                    <HistorialSolicitadas />
                  </LayoutDashboard>
                }
              />
                
            </Route>
            
            
        </Routes>
        <Toaster />
    </BrowserRouter>
  )
}

export default AppRouter
