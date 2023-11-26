// import {useState , useEffect} from 'react'
import FormularioLogin from '../components/FormularioLogin'
import LoginInacapLogo from '../img/InacapLogoLogin.png'
import LoginImage from '../img/ImagenInacapLogin.jpg'


const LoginPage = () => {
  return (
    <div className="flex justify-between w-full h-full min-h-screen">

        <div className="bg-gray-700 w-4/5 ">
            <img src={LoginImage} alt="aaaaaa" className='w-full h-full bg-cover' />
        </div>

        <div className="bg-white w-[28%] grid grid-rows-4">
            <div className='my-[110px] ml-12'>
                <img src={LoginInacapLogo} alt="" />
            </div>
            <section className="row-span-2 p-3">
                <FormularioLogin />
                
            </section>

            <div>

            </div>
            
        </div>

      
    </div>
  )
}

export default LoginPage
