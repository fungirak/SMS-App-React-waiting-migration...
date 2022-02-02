import React from 'react';
import {useState, useEffect} from 'react';
import M from 'materialize-css';

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
      fetch('http://localhost:4001/sms', {
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
      if(sms.nombre && sms.apellido && sms.textoMensaje && sms.telefonoEmisor) {
        M.toast({html: 'MENSAJE ENVIADO', classes: 'rounded bg-dark  fs-5 fixed-top d-flex justify-content-center mx-auto' ,displayLength: 1500 }) ;
        }
      } else {
        M.toast({html: 'AGUARDE 5 MINUTOS PARA ENVIAR OTRO MENSAJE, <br> ANDA CORTO DE MONEY FUNGI. GRACIAS!', classes: 'rounded bg-dark  fs-5 fixed-top d-flex justify-content-center mx-auto' ,displayLength: 2500 }) ;
      }
    }
  

  return <div>
      <>
      <div className="container  col-md-6  mt-4   ">
    <div className="row  justify-content-center">
      <form className="col-md-6 mt-2 mb-5 p-2 rounded   grey darken-4" onSubmit={enviarDatos}>
      
      <div className="row">
          <div className="input-field col s6 ">
            <input id="nombre" type="text"  className="validate bg-light rounded mt-2 fw-bold" maxLength="30"  required onChange={handleInputChange} name="nombre" value={sms.nombre} />
            <label htmlFor="nombre" className="fs-6 ms-2 mb-2 mt-1">Nombre *</label>
            <span className="helper-text text-light" data-error="Inválido" data-success="Válido"><p className="right">Ingresa tu nombre</p></span>
          </div>
    
   
          <div className="input-field col s6">
            <input id="apellido" type="text"  className="validate bg-light rounded mt-2  fw-bold"  maxLength="30" required onChange={handleInputChange} name="apellido" value={sms.apellido} />
            <label htmlFor="apellido" className="fs-6 ms-2 mb-2 mt-1">Apellido *</label>
            <span className="helper-text text-light " data-error="Inválido" data-success="Válido"><p className="right">Ingresa tu apellido</p></span>
          </div>
        </div>


        <div className="row">
          <div className="input-field col s6 ">
            <input id="telefonoDestino" type="text"  className="validate bg-light rounded mt-2  fw-bold"  disabled  />
            <label htmlFor="telefonoDestino" className="fs-6 ms-2 mb-2 mt-1">Teléfono de Fungi Agregado</label>
            <span className="helper-text text-light " data-error="Número Inválido" data-success="Número Válido"><p className="right">Ej: 3420101010</p></span>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6 ">
            <input id="telefonoEmisor" type="number"  className="validate bg-light rounded mt-2  fw-bold" name="telefonoEmisor" min="1000000000" max="99999999999" required onChange={handleInputChange} value={sms.telefonoEmisor} />
            <label htmlFor="telefonoEmisor" className="fs-6 ms-2 mb-2 mt-1">Tu Número de Teléfono (Para notificación)</label>
            <span className="helper-text text-light " data-error="Número Inválido" data-success="Número Válido"><p className="right">Ej: 3420101010</p></span>
          </div>
        </div>

        <div className="row ">
          <div className="input-field col s12 ">
            <textarea id="textoMensaje" style={{height: "100px"}} className="materialize-textarea bg-light rounded mt-2  fw-bold" maxLength="250" required onChange={handleInputChange} name="textoMensaje" value={sms.textoMensaje}></textarea>
            <label htmlFor="textoMensaje" className="fs-6 ms-2 mb-2 mt-1">Mensaje de Texto *</label>
            <span className="helper-text text-light " data-error="Inválido" data-success="Válido"><p className="right">250 carácteres máximo</p></span>
          </div>
        </div>

        <div className="row col s12 text-center">

            
                <p className="text-sm text-center text-light"><a href="/Politicas">Al hacer click en enviar estas aceptando nuestra política de privacidad.</a></p>
            
          <button className={`btn waves-effect waves-light ${ completo && !bloqueado ? 'bg-primary' : 'disabled' }`} type="submit"  onClick={handleToast} >
            <p className="text-light fw-bold">ENVIAR</p>
          </button>
        </div>
        
      </form>
    
    </div>
   
  </div>

        
      </>
  </div>;
};

export default Sms;
