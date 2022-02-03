import React from 'react';
import logoFunguito from '../img/logoFunguito.svg';

const Navegacion = () => {
  return (
    <div className="col-12">
      <div className="row">
        <nav className="navbar justify-content-around align-content-center  black ">
            <div className="col-6 d-flex  align-content-center">
              <a href="https://www.fungirak.com" >
                <img src={logoFunguito} alt="..." className="m-2 logo-sm p-1 bg-light rounded ms-5" />
              </a>

              <div className="d-flex align-items-center  justify-content-center ">
                <h6 className="text-center bg-danger fw-bold  border border-2 border-light rounded p-1">SMS APP</h6>
              </div>

            </div>

            <div className="col-4  text-center">
              <h6 className="fw-bold ms-5">FROM 🍄</h6>
            </div>

           

        </nav>
      </div>
    </div>
      
  );
};

export default Navegacion;
