import React from 'react'

const DetalleModal = ({ isOpenModalS, closeModalS, detalleTesis }) => {


    return (
        <div
          className={`fixed inset-0 z-50 flex justify-center ${
            isOpenModalS ? "" : "hidden"
          }`}
        >
          <div
            className="modal-overlay absolute inset-0 -z-20 bg-red-900 opacity-50 "
            onClick={closeModalS}
          ></div>
          <div
            className="modal-container mt-12 w-[50%] h-[65%] rounded-xl shadow-md p-7  bg-white"
          >
            <button
              className="absolute top-0 right-0 p-3"
              onClick={closeModalS}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white bg-red-500 rounded-full hover:bg-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <section className='p-5'>
                <h2 className='text-gray-700 text-3xl font-bold'>Detalle solicitud</h2>
                <section className='mt-8 border shadow-sm rounded-2xl p-4'>
                    <p className='text-md font-semibold'>{detalleTesis}</p>
                </section>
                
            </section>
          </div>
        </div>
      )
}

export default DetalleModal
