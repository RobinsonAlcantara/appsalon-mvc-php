
let paso= 1;
const pasoInicial= 1;
const pasoFinal= 3;

const cita={
    id:'',
    nombre:'',
    fecha:'',
    hora,
    servicios:[]
}
document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();}
);


function iniciarApp(){
    mostrarSeccion();//Muestra la seccion al inicio de la carga
    tabs();//Cambia la sesion cuando se presionen los tabs
    botonesPaginador();//Muestra y oculta los botones del paginador
    paginaAnterior();
    paginaSiguiente();

    consultarAPI();//Consulta la API en backend de PHP
    idCliente();
    nombreCliente();//Añade el nombre del cliente al objeto cita
    seleccionarFecha();//Añade la fecha de la cita en el objeto
    seleccionarHora();//Añade la hora de la cita en el objeto
    mostrarResumen();
}

function mostrarSeccion(){
    //Ocultar la seccion anterior
    const seccionAnterior=document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    //Seleccionar la seccion con el paso
    const pasoSelector=`#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Quita la clase de actual en el tab anterior
    const tabAnterior= document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }

    //Resaltar el tab actual
    const tab= document.querySelector(`[data-paso="${paso}"]`);    
    tab.classList.add('actual');
    
    
    
}
function tabs(){
    const botones= document.querySelectorAll('.tabs button')
    botones.forEach(boton=>{
        boton.addEventListener('click',function(e){
            paso = parseInt(e.target.dataset.paso);
            mostrarSeccion();
            botonesPaginador();           
            
        });
    });
    
}

function botonesPaginador(){
    const paginaAnterior=document.querySelector("#anterior");
    const paginaSiguiente=document.querySelector("#siguiente");

    if(paso===1){
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if(paso===3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    }else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior(){
    const paginaAnterior=document.querySelector('#anterior');
    paginaAnterior.addEventListener('click',function(){
        
        if(paso<=pasoInicial) return;
        paso--;
        botonesPaginador();

    })
}

function paginaSiguiente(){
    const paginaSiguiente=document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click',function(){
        
        if(paso>=pasoFinal) return;
        paso++;
        botonesPaginador();

    })
}

async function consultarAPI(){
    try {
        const url='/api/servicios';
        const resultado= await fetch(url);
        const servicios= await resultado.json();
        mostrarServicios(servicios);

    } catch (error) {
        console.log(error);
    }
}

function mostrarServicios(servicios){
    servicios.forEach( servicio=>{
        //destructure
        const {id, nombre, precio}=servicio;
        
        //Creamos los elementos a mostrar en el DOM
        const nombreServicio=document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent=nombre;
        

        const precioServicio=document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent=`$${precio}`;

        const servicioDiv=document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio=id;
        servicioDiv.onclick= function(){
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);   
    
})
}

function seleccionarServicio(servicio){
    const {id}=servicio;
    const {servicios} = cita;

    //selecciona el div que se le dio click
    const divServicio= document.querySelector(`[data-id-servicio="${id}"]`);    

    //comprobar si un servicio ya fue agregado
    if(servicios.some(agregado=>agregado.id===id)){
        //Eliminar el servicio
        cita.servicios=servicios.filter(agregado=>agregado.id !== id);            
        divServicio.classList.remove("seleccionado");
        

        
    }else{
        //Agregar el servicio
        cita.servicios=[...servicios, servicio];       
        divServicio.classList.add("seleccionado");
        
    } 
    
    console.log(cita);
    
}

function idCliente(){
    cita.id=document.querySelector("#id").value;
}

function nombreCliente(){
    cita.nombre = document.querySelector("#nombre").value;    
}

function seleccionarFecha(){
    const inputFecha= document.querySelector('#fecha');
    inputFecha.addEventListener('input',function(e){
        const dia= new Date(e.target.value).getUTCDay();
        if([0,6].includes(dia)){
            e.target.value='';
            mostrarAlerta('Fines de Semana no Laboramos','error','.formulario');

        }else{
            cita.fecha = e.target.value;

        }
    });
}

function seleccionarHora(){
    const inputHora=document.querySelector('#hora');
    inputHora.addEventListener('input',function(e){
        const horaCita=e.target.value;
        const hora=horaCita.split(":")[0];
        if(hora < 10 || hora > 18){
            e.target.value='';
            mostrarAlerta('horas no validas','error','.formulario');
           
        }else{
            cita.hora=horaCita;
            console.log(cita);
        }41
    });
    
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece=true){
    //Previene que se genere mas de una alerta
    const alertaPrevia=document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    //Scripting para crear la alerta
    const alerta=document.createElement("DIV");
    alerta.textContent=mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    
    //Eliminar la alerta

    if(desaparece===true){
        setTimeout(()=>{
            alerta.remove();
        },3000);
        console.log(alerta);
    }

}

function mostrarResumen(){
    const resumen= document.querySelector(".contenido-resumen");

    //Limpia el contenido del resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    if(Object.values(cita).includes("")|| cita.servicios.length === 0){
        mostrarAlerta('Faltan datos de servicios, fecha u hora','error', '.contenido-resumen',false);

        return;

    }

    //formatear el Div de resumen
    const {nombre, fecha, hora, servicios}=cita;

    //Heading para servicios en resumen
    const headingServicios=document.createElement('H3');
    headingServicios.textContent="Resumen Servicios";
    resumen.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio=>{
        const {id,nombre,precio}=servicio;

        const contenedorServicio=document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio=document.createElement('P');
        textoServicio.textContent=nombre;

        const precioServicio=document.createElement('P');
        precioServicio.innerHTML=`<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);       
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);

    })

    const nombreCliente=document.createElement('P');
    nombreCliente.innerHTML=`<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha en Español
    const fechaObj= new Date(fecha);
    const mes=fechaObj.getMonth();
    const dia=fechaObj.getDate() + 2;
    const year=fechaObj.getFullYear();

    const fechaUTC=new Date( Date.UTC(year,mes,dia));

    const opciones = {weekday:'long', year:'numeric', month:'long', day:'numeric'};
    const fechaFormateada=fechaUTC.toLocaleDateString('es-MX',opciones);

    const fechaCita=document.createElement('P');
    fechaCita.innerHTML=`<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita=document.createElement('P');
    horaCita.innerHTML=`<span>Hora:</span> ${hora} Horas`;

    //Heading para citas en resumen
    const headingCita=document.createElement('H3');
    headingCita.textContent="Resumen Cita";
    resumen.appendChild(headingCita);

    const botonReservar=document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent='Reservar Cita';
    botonReservar.onclick=reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(botonReservar);    

}

async function reservarCita(){
    const{id,nombre,fecha,hora,servicios}=cita;

    const idServicios=servicios.map(servicio=>servicio.id);
    console.log(idServicios);
    
    const datos = new FormData(); //Esto crea la funcion de un submmit en un formdatos( recolecta los datos como si fuera un formulario)

    //añade los campos al formData    
    datos.append('fecha',fecha);
    datos.append('hora',hora);
    datos.append('usuarioId',id);
    datos.append('servicios',idServicios);
    
    try {
        const url='/api/citas';

        const respuesta= await fetch(url,{
            method:'POST',
            body:datos
        })

        const resultado= await respuesta.json();

        console.log(resultado.resultado);

        if(resultado.resultado){
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente",
                button: 'OK'
            }).then(()=>{
                window.location.reload()
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita"            
          });
    }

    //peticion hacia la api 
    
    
    //No se pueden ver los datos de un FormData a menos que se use el spread Operator(...)
    //console.log(...datos);
}
