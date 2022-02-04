import React from 'react';
import {useState, useEffect} from 'react';
import M from 'materialize-css';
import Politicas from './Politicas';

const Sms = () => {

    const [bloqueado, setBloqueado] = useState(false);
    const [completo, setCompleto] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [sms, setSms] = useState({
        nombre: '',
        apellido: '',
        telefonoEmisor: '',
        textoMensaje: '',
    })

    const handleInputChange = (event) => {
        setSms({
            ...sms,
            [event.target.name] : event.target.value
        });
    }

    useEffect(()=>{
        if( sms.textoMensaje && sms.nombre && sms.apellido && sms.telefonoEmisor){
          setCompleto(true);
        }
    },[sms]);

  


    const desbloquear = () => {
      const desbloq = () => {
        setBloqueado(false);
        window.localStorage.setItem('bloq', false);
      }
      setInterval(desbloq, 300000);
    }


    

    const enviarDatos = (e) => {
        e.preventDefault()
     
      if(!bloqueado){
      console.log('enviado')
      fetch('https://sms-app-by-fungirak.herokuapp.com/sms', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(sms)
      })
        .then((data) => data.json(data))
        .then((data) => console.log(data))

        setEnviado(true);

        setSms({
          nombre: '',
          apellido: '',
          telefonoEmisor: '',
          textoMensaje: '',
        });

        setCompleto(false);
      }

      setBloqueado(true);
      window.localStorage.setItem('bloq', true);
      desbloquear();

    }


    const handleToast = () => {
      if(window.localStorage.getItem('bloq') === false  ){
      if(sms.nombre && sms.apellido && sms.textoMensaje && sms.telefonoEmisor && sms.telefonoDestino) {
        M.toast({html: 'MENSAJE ENVIADO', classes: 'rounded bg-dark  fs-5 fixed-top d-flex justify-content-center mx-auto' ,displayLength: 1500 }) ;
        }
      } else {
        M.toast({html: '¡MENSAJE ENVIADO! AGUARDE 1 MINUTO PARA ENVIAR OTRO MENSAJE.', classes: 'rounded bg-dark  fs-5 fixed-top d-flex justify-content-center mx-auto' ,displayLength: 2500 }) ;
      }
    }
  

  const [visible, setVisible] = useState(false);

  const handlePoliticas = () => {
    setVisible(!visible);
  }


  return <div>
      <>
      <div className="container  col-md-6  mt-4   ">
    <div className="row  justify-content-center">
      <form className="col-md-6 mt-2 mb-5 p-2 rounded bg-white" onSubmit={enviarDatos}>
      
      <div className="row">
          <div className="input-field col s6 ">
            <input id="nombre" type="text"  className="validate bg-light rounded mt-2 fw-bold" maxLength="30"  required onChange={handleInputChange} name="nombre" value={sms.nombre} />
            <label htmlFor="nombre" className="fs-6 ms-2 mb-2 mt-1 ">Nombre *</label>
            <span className="helper-text text-light" data-error="Inválido" data-success="Válido"><p className="right  text-dark">Ingresa tu nombre</p></span>
          </div>
    
   
          <div className="input-field col s6">
            <input id="apellido" type="text"  className="validate bg-light rounded mt-2  fw-bold"  maxLength="30" required onChange={handleInputChange} name="apellido" value={sms.apellido} />
            <label htmlFor="apellido" className="fs-6 ms-2 mb-2 mt-1">Apellido *</label>
            <span className="helper-text text-light " data-error="Inválido" data-success="Válido"><p className="right  text-dark">Ingresa tu apellido</p></span>
          </div>
        </div>


        <div className="row">
          <div className="input-field col s6 ">
            <input id="telefonoDestino" type="text"  className="validate bg-light rounded mt-2  fw-bold"  disabled  />
            <label htmlFor="telefonoDestino" className="fs-6 ms-2 mb-2 mt-1">Teléfono de Fungi Agregado</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6 ">
            <input id="telefonoEmisor" type="number"  className="validate bg-light rounded mt-2  fw-bold" name="telefonoEmisor" min="1000000000" max="99999999999" required onChange={handleInputChange} value={sms.telefonoEmisor} />
            <label htmlFor="telefonoEmisor" className="fs-6 ms-2 mb-2 mt-1">Tu Número de Teléfono (Para notificación)</label>
            <span className="helper-text text-light " data-error="Número Inválido" data-success="Número Válido"><p className="right  text-dark text-dark">Ej: 3420101010</p></span>
          </div>
        </div>

        <div className="row ">
          <div className="input-field col s12 ">
            <textarea id="textoMensaje" style={{height: "100px"}} className="materialize-textarea bg-light rounded mt-2  fw-bold"  required onChange={handleInputChange} maxLength="120" name="textoMensaje" value={sms.textoMensaje} ></textarea>
            <label htmlFor="textoMensaje" className="fs-6 ms-2 mb-2 mt-1">Mensaje de Texto *</label>
            <span className="helper-text text-light " data-error="Inválido" data-success="Válido"><p className="right text-dark">120 caractéres máximo</p></span>
          </div>
        </div>

        <div className="row col s12 text-center">

           
            
          <button className={`btn waves-effect waves-light ${ completo && !bloqueado ? 'bg-primary' : 'disabled' }`} type="submit"  onClick={handleToast} >
            <p className="text-light fw-bold">ENVIAR</p>
          </button>
        </div>
        
      </form>

      
      <button className="text-white text-center bg-transparent border border-none border-0" onClick={handlePoliticas} >Al hacer click en enviar aceptas nuestra política de privacidad</button>
      
      
    
    </div>
   
  </div>

        <Politicas visible={visible} />
      </>
  </div>;
};

export default Sms;
