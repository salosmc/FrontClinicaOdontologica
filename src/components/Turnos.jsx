
import { useEffect, useState } from 'react';
import axios from 'axios';

const Turnos = () => {

    const [pacientes, setPacientes] = useState([]);
    const [odontologos, setOdontologos] = useState([]);

    const [nodoApi, setNodoApi] = useState('');
    const [turnos, setTurnos] = useState([]);

    const [newId, setNewId] = useState({ value: "", error: false });
    const [newFecha, setNewFecha] = useState({ value: "", error: false });
    const [newHora, setNewHora] = useState({ value: "", error: false });

    const [newPacienteId, setNewPacienteId] = useState({ value: "", error: false });

    const [newOdontologoId, setNewOdontologoId] = useState({ value: "", error: false });

    /*------------------FETCH API SE CONSUME LA API PARA RENDERIZAR LA INFROMACION----------------------- */
    const url = "http://localhost:8080/turnos";
    const fetchApi = async (nodoApi) => {
        try {
            const response = await axios.get(url + nodoApi);
            //console.log(response.data);
            setTurnos(response.data)//seteamos Data de odontologos
        } catch (e) {
            console.log(e);
        }
    }
    //si hay algun cambio actualiza la informacion.
    useEffect(() => {
        fetchApi(nodoApi);
    }, [turnos, nodoApi]);


    const pacientesApi = async () => {
        try {
            const response = await axios.get("http://localhost:8080/pacientes");
            console.log(response.data);
            setPacientes(response.data)//
        } catch (e) {
            console.log(e);
        }
    }

    const odontolgosApi = async () => {
        try {
            const response = await axios.get("http://localhost:8080/odontologos");
            console.log(response.data);
            setOdontologos(response.data)//
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        pacientesApi();
        odontolgosApi();
    }, [])


    /*-------FUNCIONES DE FORMULARIO Y VALIDACIONES-------*/

    const handleSearch = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newFecha.value !== "" || newHora.value !== "") {

            const turno = {
                fecha: newFecha.value, hora: newHora.value,
            }

            buscar(turno); //buscamos a la BD

            setNewId({ value: '', error: false });
            setNewFecha({ value: '', error: false });
            setNewHora({ value: '', error: false });

        }
        else {
            setNewId({ value: '', error: true });
            setNewFecha({ value: '', error: true });
            setNewHora({ value: '', error: true });

            setNodoApi('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newFecha.value === "" && newHora.value === "") {
            setNewId({ value: '', error: true });
            setNewFecha({ value: '', error: true });
            setNewHora({ value: '', error: true });

            setNewPacienteId({ value: '', error: true });

            setNewOdontologoId({ value: '', error: true });
        }
        else {
            /*enviamos los datos para crear Odontologos */
            //alert( newId.value + ', ' + newFecha.value + ', ' + newHora.value+ ', ' + newPacienteId.value+ ', ' + newOdontologoId.value);            

            const turno = {
                id: newId.value, fecha: newFecha.value, hora: newHora.value,
                paciente: { id: newPacienteId.value },
                odontologo: { id: newOdontologoId.value }
            }

            agregar(turno); //Agregamos a la BD

            setNewId({ value: '', error: false });
            setNewFecha({ value: '', error: false });
            setNewHora({ value: '', error: false });

            setNewPacienteId({ value: '', error: false });

            setNewOdontologoId({ value: '', error: false });
        }
    }
    /*------------------------------------------------------*/
    /*-------FUNCIONES QUE PODRIAN SER DE PETICIONES BD----------*/

    const agregar = (turno) => {

        const agregarTurnoApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const { data } = await axios.post("http://localhost:8080/turnos", turno);
                console.log(data);//Aca podriamos validar si data

                /*----------Actualizamos nuestro vista---------*/

                const newData = turnos;
                newData.push(data);
                setTurnos(newData);

            } catch (error) {
                console.log(error);
            }
        };

        agregarTurnoApi();

    }

    const buscar = (turno) => {

        //Detalles que debo poner en la documentacion de la API
        //Sí el campo esta vacio se aclara un guion bajo que la consulta ignore ese campo
        let vacio = false;
        if (turno.fecha === '') {
            turno.fecha = '_';
            vacio = vacio ? false : true;
        }
        if (turno.hora === '') {
            turno.hora = '_';
            vacio = vacio ? false : true;
        }

        if (!vacio) {
            setNodoApi('/' + turno.fecha + '/' + turno.hora);
        } else {
            setNodoApi('');
        }
    }

    const editar = (turno) => {

        setNewId({ value: turno.id, error: false });
        setNewFecha({ value: turno.fecha, error: false });
        setNewHora({ value: turno.hora, error: false });

        setNewPacienteId({ value: turno.paciente.id, error: false });

        setNewOdontologoId({ value: turno.odontologo.id, error: false });
    }

    const eliminar = (turno) => {
        const eliminarTurnoApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const { data } = await axios.delete("http://localhost:8080/turnos/" + turno.id);
                console.log(data);//Aca podriamos validar si data

                /*----------Actualizamos nuestro vista---------*/

                const newData = turnos.filter((t) => t.id !== turno.id);
                setTurnos(newData);

            } catch (error) {
                console.log(error);
            }
        };

        eliminarTurnoApi();
    }
    /*------------------------------------------------------*/
    return (
        <>
            <h3>Agregar Turno</h3>

            <div className='container border bg-light d-flex justify-content-center p-3'>
                <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                    <div className="col-4 col-md-1 col-lg-1">
                        <input disabled type="text" className="form-control" placeholder="Id" value={newId.value} onChange={(event)=>setNewId({value:event.target.value, error:false})} />
                    </div>

                    <div className="col-4 col-md-2 col-lg-2">
                        <select className="form-select" value={newFecha.value} onChange={(event) => setNewFecha({ value: event.target.value, error: false })}   >
                            <option selected>Fecha</option>
                            <option value={"2022-04-19"}>19/04/22</option>
                            <option value={"2022-05-17"}>17/05/22</option>
                            <option value={"2022-06-05"}>05/06/22</option>
                        </select>
                    </div>
                    <div className="col-4 col-md-1 col-lg-1">
                        <select className="form-select" value={newHora.value} onChange={(event) => setNewHora({ value: event.target.value, error: false })}   >
                            <option selected>Hora</option>
                            <option value={"09:00"}>09:00</option>
                            <option value={"10:00"}>10:00</option>
                            <option value={"11:00"}>11:00</option>
                        </select>
                    </div>
                    <div className="col-6 col-md-3 col-lg-3">
                        <select className="form-select" value={newPacienteId.value} onChange={(event) => setNewPacienteId({ value: event.target.value, error: false })}   >
                            <option selected>Pacientes</option>
                            {pacientes.map((pa) => <option value={pa.id} >{pa.nombre}, {pa.apellido}, {pa.dni}</option>)}
                        </select>
                    </div>
                    <div className="col-6 col-md-3 col-lg-3">
                        <select className="form-select" value={newOdontologoId.value} onChange={(event) => setNewOdontologoId({ value: event.target.value, error: false })}   >
                            <option selected>Odontologo</option>
                            {odontologos.map((od) => <option value={od.id} >{od.nombre}, {od.apellido}, {od.matricula}</option>)}
                        </select>
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

            <h3>Turnos</h3>

            <div className='container border bg-light d-flex justify-content-center p-3'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Odontolgo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map((turno, i) => {
                            return (
                                <tr>
                                    <th scope="row">{turno.id}</th>
                                    <td>{turno.fecha}</td>
                                    <td>{turno.hora}</td>
                                    <td>{turno.paciente.nombre}, {turno.paciente.apellido}, {turno.paciente.dni}</td>
                                    <td>{turno.odontologo.nombre}, {turno.odontologo.apellido}, {turno.odontologo.matricula}</td>
                                    <td align='right' width={130}>
                                        <i className="btn btn-lg fa-regular fa-pen-to-square" onClick={() => editar(turno)}></i>
                                        <i className="btn btn-lg fa-solid fa-trash" onClick={() => eliminar(turno)}></i>
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


export default Turnos;