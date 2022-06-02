
import { useEffect, useState } from 'react';
import axios from 'axios';
import FormPaciente from './FormPaciente';

const Pacientes = () => {

    const [nodoApi, setNodoApi] = useState('');
    const [pacientes, setPacientes] = useState([]);

    const [newId, setNewId] = useState({ value: "", error: false });
    const [newNombre, setNewNombre] = useState({ value: "", error: false });
    const [newApellido, setNewApellido] = useState({ value: "", error: false });
    const [newDni, setNewDni] = useState({ value: "", error: false });
    const [newFechaIngreso, setNewFechaIngreso] = useState({ value: "", error: false });

    const [newCalle, setNewCalle] = useState({ value: "", error: false });
    const [newNumero, setNewNumero] = useState({ value: "", error: false });
    const [newLocalidad, setNewLocalidad] = useState({ value: "", error: false });
    const [newProvincia, setNewProvincia] = useState({ value: "", error: false });

    /*------------------FETCH API SE CONSUME LA API PARA RENDERIZAR LA INFROMACION----------------------- */

    const url = "http://localhost:8080/pacientes";
    const fetchApi = async (nodoApi) => {
        try {
            const response = await axios.get(url + nodoApi);
            //console.log(response.data);
            setPacientes(response.data)//seteamos Data de odontologos
        } catch (e) {
            console.log(e);
        }
    }
    //si hay algun cambio actualiza la informacion.
    useEffect(() => {
        fetchApi(nodoApi);
    }, [pacientes, nodoApi]);

    /*-------FUNCIONES DE FORMULARIO Y VALIDACIONES-------*/

    const handleChange = (event) => {
        if (event.target.placeholder === "Id") {
            setNewId({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Nombre") {
            setNewNombre({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Apellido") {
            setNewApellido({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "DNI") {
            setNewDni({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Fecha") {
            setNewFechaIngreso({ value: event.target.value, error: false });
        }

        if (event.target.placeholder === "Calle") {
            setNewCalle({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Numero") {
            setNewNumero({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Localidad") {
            setNewLocalidad({ value: event.target.value, error: false });
        }
        if (event.target.placeholder === "Provincia") {
            setNewProvincia({ value: event.target.value, error: false });
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newDni.value !== "" || newNombre.value !== "" || newApellido.value !== "") {

            const paciente = {
                nombre: newNombre.value, apellido: newApellido.value, dni: newDni.value, fechaAlta: newFechaIngreso.value,
                domicilio: { calle: newCalle.value, numero: newNumero.value, localidad: newLocalidad.value, provincia: newProvincia.value }
            }

            buscar(paciente); //buscamos a la BD

            setNewId({ value: '', error: false });
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewDni({ value: '', error: false });
            setNewFechaIngreso({ value: '', error: false });

            setNewCalle({ value: '', error: false });
            setNewNumero({ value: '', error: false });
            setNewLocalidad({ value: '', error: false });
            setNewProvincia({ value: '', error: false });
        }
        else {
            setNewNombre({ value: '', error: true });
            setNewApellido({ value: '', error: true });
            setNewDni({ value: '', error: true });
            setNewFechaIngreso({ value: '', error: true });

            setNewCalle({ value: '', error: true });
            setNewNumero({ value: '', error: true });
            setNewLocalidad({ value: '', error: true });
            setNewProvincia({ value: '', error: true });

            setNodoApi('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newNombre.value === "" && newApellido.value === "" && newDni.value === "") {
            setNewNombre({ value: '', error: true });
            setNewApellido({ value: '', error: true });
            setNewDni({ value: '', error: true });
            setNewFechaIngreso({ value: '', error: true });

            setNewCalle({ value: '', error: true });
            setNewNumero({ value: '', error: true });
            setNewLocalidad({ value: '', error: true });
            setNewProvincia({ value: '', error: true });
        }
        else {
            /*enviamos los datos para crear Odontologos */
            //alert('Hello ' + newNombre.value + ', ' + newApellido.value + ', ' + newMatricula.value);            
            const paciente = {
                id: newId.value, nombre: newNombre.value, apellido: newApellido.value, dni: newDni.value, fechaAlta: newFechaIngreso.value,
                domicilio: { calle: newCalle.value, numero: newNumero.value, localidad: newLocalidad.value, provincia: newProvincia.value }
            }


            agregar(paciente); //Agregamos a la BD

            setNewId({ value: '', error: false });
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewDni({ value: '', error: false });
            setNewFechaIngreso({ value: '', error: false });

            setNewCalle({ value: '', error: false });
            setNewNumero({ value: '', error: false });
            setNewLocalidad({ value: '', error: false });
            setNewProvincia({ value: '', error: false });
        }
    }
    /*------------------------------------------------------*/
    /*-------FUNCIONES QUE PODRIAN SER DE PETICIONES BD----------*/

    const agregar = (paciente) => {

        const agregarPacienteApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const { data } = await axios.post("http://localhost:8080/pacientes", paciente);
                console.log(data);//Aca podriamos validar si data

                /*----------Actualizamos nuestro vista---------*/

                const newData = pacientes;
                newData.push(data);
                setPacientes(newData);

            } catch (error) {
                console.log(error);
            }
        };

        agregarPacienteApi();

    }

    const buscar = (paciente) => {

        //Detalles que debo poner en la documentacion de la API
        //Sí el campo esta vacio se aclara un guion bajo que la consulta ignore ese campo
        let vacio = false;
        if (paciente.nombre === '') {
            paciente.nombre = '_';
            vacio = vacio? false : true;
        }
        if (paciente.apellido === '') {
            paciente.apellido = '_';
            vacio = vacio? false : true;
        }
        if (paciente.dni === ''){
            paciente.dni = '_';        
            vacio = vacio? false : true;
        }

        if(!vacio){
            setNodoApi('/' + paciente.nombre + '/' + paciente.apellido + '/' + paciente.dni);
        }else{
            setNodoApi('');
        }
    }

    const editar = (paciente) => {

        setNewId({ value: paciente.id, error: false });
        setNewNombre({ value: paciente.nombre, error: false });
        setNewApellido({ value: paciente.apellido, error: false });
        setNewDni({ value: paciente.dni, error: false });
        setNewFechaIngreso({ value: paciente.fechaAlta, error: false });

        setNewCalle({ value: paciente.domicilio.calle, error: false });
        setNewNumero({ value: paciente.domicilio.numero, error: false });
        setNewLocalidad({ value: paciente.domicilio.localidad, error: false });
        setNewProvincia({ value: paciente.domicilio.provincia, error: false });
    }

    const eliminar = (paciente) => {
        const eliminarPacienteApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const { data } = await axios.delete("http://localhost:8080/pacientes/" + paciente.id);
                console.log(data);//Aca podriamos validar si data

                /*----------Actualizamos nuestro vista---------*/

                const newData = pacientes.filter((p) => p.id !== paciente.id);
                setPacientes(newData);

            } catch (error) {
                console.log(error);
            }
        };

        eliminarPacienteApi();
    }
    /*------------------------------------------------------*/
    return (
        <>
            <h3>Agregar Paciente</h3>
            {/* <FormPaciente
                paciente = {{id:newId.value, nombre:newNombre.value, apellido:newApellido.value, dni:newDni.value, fechaIngreso: newFechaIngreso.value}}
                domicilio = {{calle: newCalle.value, numero: newNumero.value, localidad: newLocalidad.value, provincia:newProvincia.value}}
                handleChange = {()=>handleChange()} handleSearch = {handleSearch} handleSubmit={handleSubmit}
            /> */}
            <div className='container border bg-light d-flex justify-content-center p-3'>
                <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                    <div className="col-12 col-md-1 col-lg-1">
                        <input disabled type="text" className="form-control" placeholder="Id" value={newId.value} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <div className='row'>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Nombre" value={newNombre.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Apellido" value={newApellido.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="DNI" value={newDni.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Fecha" value={newFechaIngreso.value} onChange={handleChange} /> 
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Calle" value={newCalle.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Numero" value={newNumero.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Localidad" value={newLocalidad.value} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Provincia" value={newProvincia.value} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-2 col-lg-2">
                        <div className='row'>
                            <div className='col-6'>
                                <i className="btn btn-lg fa-solid fa-circle-plus" onClick={handleSubmit}></i>
                            </div>
                            <div className='col-6'>
                                <i className="btn btn-lg fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <h3>Pacientes</h3>
            
            <div className='container border bg-light d-flex justify-content-center p-3'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Domicilio</th>
                            <th scope="col">#Turnos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente, i) => {
                            return (
                                <tr>
                                    <th scope="row">{paciente.id}</th>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.apellido}</td>
                                    <td>{paciente.dni}</td>
                                    <td>{paciente.domicilio.calle} {paciente.domicilio.numero}, {paciente.domicilio.localidad}, {paciente.domicilio.provincia}</td>
                                    <td>{paciente.turnos.length}</td>
                                    <td align='right' width={130}>
                                        <i className="btn btn-lg fa-regular fa-pen-to-square" onClick={() => editar(paciente)}></i>
                                        <i className="btn btn-lg fa-solid fa-trash" onClick={() => eliminar(paciente)}></i>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default Pacientes;