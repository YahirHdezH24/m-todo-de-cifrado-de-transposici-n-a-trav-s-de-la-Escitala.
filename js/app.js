// funcion una vez que carga el dom 

import { cifrarMensaj , descifrarMensaj} from './encrypt.js';

document.addEventListener('DOMContentLoaded', function() {
    
    const opciones = document.querySelector('#tipo');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const clave = document.querySelector('#clave');
   
    //funcion para cifrar el mensaje

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    })

    formulario.addEventListener('submit', handleSubmit);

    function handleSubmit  (e)  {

        //comprobar si es cifrar o descifrar
        e.preventDefault();

        //comprobar si la clave es numero 

        let pos = Number(clave.value);



        if(opciones.value === 'cifrar') {

            if(clave.value === ''){
                mostrarAlerta('La clave no puede estar vacia', formulario);
                return;
            }
            
            const mensaje = inputMensaje.value;
            console.log(mensaje);
            
            let mensajeEncrypt = cifrarMensaj(pos,inputMensaje.value);
            console.log(mensajeEncrypt);
            
            limpiarHTML();

            if(mensajeEncrypt === 'La longitud del mensaje es mayor que la cantidad de espacios en la matriz.'){
                mostrarAlerta(mensajeEncrypt, formulario);
                return;
            }

            const contenedor = document.querySelector('#resultado');
            const res = document.createElement('h3');
            res.classList.add('text-2xl', 'font-bold', 'uppercase', 'text-center', 'my-10');
            res.innerHTML = mensajeEncrypt.replace(/ /g, '&nbsp;');
            contenedor.appendChild(res);

            limpiarAlerta(formulario);

        } else if (opciones.value === 'descifrar') {
            //descifrar

            let mensajeEncrypt = descifrarMensaj(pos,inputMensaje.value);

            console.log(mensajeEncrypt);
            
            limpiarHTML();

            const contenedor = document.querySelector('#resultado');
            const res = document.createElement('p');
            res.classList.add('text-2xl', 'font-bold', 'uppercase', 'text-center', 'my-10');

            res.innerHTML = mensajeEncrypt;
            contenedor.appendChild(res);

            limpiarAlerta(formulario);
        }
        else{
            mostrarAlerta('Selecciona una opcion', formulario);
        }
    }



    const  mostrarAlerta = (mensaje, referencia) => {
        limpiarAlerta(referencia);
        
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
       
        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    const limpiarAlerta =(referencia) =>{
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }


    const limpiarHTML = () => {
        // Leer el elemento Resultado
        const contenedor = document.querySelector('#resultado');
    
        // limpiar los resultados anteriores
        while(contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    const resetFormulario = () => {
        // reiniciar el objeto
        formulario.reset();
    }

});