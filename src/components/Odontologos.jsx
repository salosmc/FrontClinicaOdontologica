
import { useEffect, useState } from 'react';

const Odontologos = () => {

    const [refresh, setRefresh] = useState(false);

    const [nodoApi, setNodoApi] = useState('');

    const [odontologos, setData] = useState([]);

    const [newId, setNewId] = useState({ value: "", error: false });
    const [newNombre, setNewNombre] = useState({ value: "", error: false });
    const [newApellido, setNewApellido] = useState({ value: "", error: false });
    const [newMatricula, setNewMatricula] = useState({ value: "", error: false });
    
    /*------------------FETCH API SE CONSUME LA API PARA RENDERIZAR LA INFROMACION----------------------- */

    const url = "http://localhost:8080/odontologos";

    const fetchApi = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
        myHeaders.append("Cookie", "JSESSIONID=FF62B9515471E7860A975E31326ABA21");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log(url+nodoApi)
        fetch(url + nodoApi, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setData(result);
            })
            .catch(error => console.log('error', error));

    }
    //si hay algun cambio actualiza la informacion.

    useEffect(() => {
        fetchApi();
    }, [nodoApi, refresh]);

    const accionRefresh = () =>{
        if(refresh){
            setRefresh(false);
        }else{
            setRefresh(true);
        }
    }
 
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
        if (event.target.placeholder === "Matrícula" || event.target.placeholder === "Matricula") {
            setNewMatricula({ value: event.target.value, error: false });
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newMatricula.value !== "" || newNombre.value !== "" || newApellido.value !== "") {

            const odontologo = { nombre: newNombre.value, apellido: newApellido.value, matricula: newMatricula.value }

            buscar(odontologo); //buscamos a la BD

            setNewId({ value: '', error: false });
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewMatricula({ value: '', error: false });
        }
        else {
            setNewMatricula({ value: '', error: true });
            setNewApellido({ value: '', error: true });
            setNewNombre({ value: '', error: true });

            setNodoApi('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newNombre.value === "" && newApellido.value === "" && newMatricula.value === "") {
            setNewNombre({ error: true });
            setNewApellido({ error: true });
            setNewMatricula({ error: true });
        }
        else {
            /*enviamos los datos para crear Odontologos */
            //alert('Hello ' + newNombre.value + ', ' + newApellido.value + ', ' + newMatricula.value);            
            const newOdontologo = {
                id: newId.value,
                nombre: newNombre.value,
                apellido: newApellido.value,
                matricula: newMatricula.value
            }

            agregar(newOdontologo); //Agregamos a la BD

            setNewId({ value: '', error: false })
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewMatricula({ value: '', error: false });
        }
    }
    /*------------------------------------------------------*/
    /*-------FUNCIONES QUE PODRIAN SER DE PETICIONES BD----------*/

    const agregar = (odontologo) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("jwt"));
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=FF62B9515471E7860A975E31326ABA21");

        var raw = JSON.stringify({
            "id": odontologo.id,
            "nombre": odontologo.nombre,
            "apellido": odontologo.apellido,
            "matricula": odontologo.matricula
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/odontologos", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                
                const newData = odontologos;
                newData.push(result);
                console.log(newData);
                setData(newData);
                
                accionRefresh();
            })
            .catch(error => console.log('error', error));

        /*
        let newData = odontologos;
        let isExists = false;
        for (let i = 0; i < odontologos.length; i++) {
            if (odontologos[i].id === odontologo.id) {
                newData[i] = odontologo;
                isExists = true;
                break;
            }
        }
        if (!isExists) {
            contador++;
            odontologo.id = contador;
            newData.push(odontologo);
        }
        setData(newData);
        */

    }

    const buscar = (odontologo) => {

        //Detalles que debo poner en la documentacion de la API
        //Sí el campo esta vacio se aclara un guion bajo que la consulta ignore ese campo
        let vacio = false;
        if (odontologo.nombre === '') {
            odontologo.nombre = '_';
            vacio = vacio ? false : true;
        }
        if (odontologo.apellido === '') {
            odontologo.apellido = '_';
            vacio = vacio ? false : true;
        }
        if (odontologo.matricula === '') {
            odontologo.matricula = '_';
            vacio = vacio ? false : true;
        }

        if (!vacio) {
            setNodoApi('/' + odontologo.nombre + '/' + odontologo.apellido + '/' + odontologo.matricula);
        } else {
            setNodoApi('');
        }

    }

    const editar = (odontologo) => {
        /*
        const inputs = document.querySelectorAll("#editInput" + i);
        console.log(inputs[0].value);
        inputs[1].toggleAttribute("disabled");
        inputs[2].toggleAttribute("disabled");
        inputs[3].toggleAttribute("disabled");
        //inputs.map((input)=>{return input.toggleAttribute("disabled")});
        */
        setNewId({ value: odontologo.id, error: false });
        setNewNombre({ value: odontologo.nombre, error: false });
        setNewApellido({ value: odontologo.apellido, error: false });
        setNewMatricula({ value: odontologo.matricula, error: false });
    }

    const eliminar = (odontologo) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  "Bearer " + sessionStorage.getItem("jwt") );
        myHeaders.append("Cookie", "JSESSIONID=FF62B9515471E7860A975E31326ABA21");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/odontologos/"+odontologo.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                const newData = odontologos.filter((o) => o.id !== odontologo.id);
                setData(newData);
                accionRefresh();
            })
            .catch(error => console.log('error', error));
    }
    /*------------------------------------------------------*/
    return (
        <>
            <h3>Agregar Odontologos</h3>
            <div className='container border bg-light d-flex justify-content-center p-3'>
                <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                    <div className="col-12 col-md-1 col-lg-1">
                        <input disabled type="text" className="form-control" placeholder="Id" value={newId.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3 col-lg-3">
                        <input type="text" className="form-control" placeholder="Nombre" value={newNombre.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3 col-lg-3" >
                        <input type="text" className="form-control" placeholder="Apellido" value={newApellido.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3 col-lg-3">
                        <input type="text" className="form-control" placeholder="Matricula" value={newMatricula.value} onChange={handleChange} />
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

            <h3>Odontolgos</h3>

            <div className='container border bg-light d-flex justify-content-center p-3'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Matricula</th>
                            <th scope="col">#Turnos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {odontologos.map((odontologo, i) => {
                            return (
                                <tr>
                                    <th scope="row">{odontologo.id}</th>
                                    <td>{odontologo.nombre}</td>
                                    <td>{odontologo.apellido}</td>
                                    <td>{odontologo.matricula}</td>
                                    {/*<td>{odontologo.turnos.length}</td>*/}
                                    <td align='right' width={130}>
                                        <i className="btn btn-lg fa-regular fa-pen-to-square" onClick={() => editar(odontologo)}></i>
                                        <i className="btn btn-lg fa-solid fa-trash" onClick={() => eliminar(odontologo)}></i>
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

export default Odontologos;
