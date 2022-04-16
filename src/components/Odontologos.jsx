
import { useEffect, useState } from 'react';
import axios from 'axios';


const Odontologos = () => {

    const [nodoApi, setNodoApi] = useState('');
    
    const [odontologos, setData] = useState([]);

    const [newId, setNewId] = useState({ value: "", error: false });
    const [newNombre, setNewNombre] = useState({ value: "", error: false });
    const [newApellido, setNewApellido] = useState({ value: "", error: false });
    const [newMatricula, setNewMatricula] = useState({ value: "", error: false });

    /*------------------FETCH API SE CONSUME LA API PARA RENDERIZAR LA INFROMACION----------------------- */

    const url = "http://localhost:8080/odontologos";
    const fetchApi = async (nodoApi) => {
        try{
            const response = await axios.get(url+nodoApi);
            //console.log(response.data);
            setData(response.data)//seteamos Data de odontologos
        }catch(e){
            console.log(e);
        }
    }
    //si hay algun cambio actualiza la informacion.
    useEffect(()=>{
        fetchApi(nodoApi);
    },[odontologos]);

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
        if (event.target.placeholder === "Matrícula") {
            setNewMatricula({ value: event.target.value, error: false });
        }
    }

    const handleSearch = (event) => {
        event.preventDefault();
        /*Validamos los datos */
        if (newMatricula.value !== "" || newNombre.value !== "" || newApellido.value !== "") {
            
            const odontologo = {nombre: newNombre.value, apellido: newApellido.value, matricula:newMatricula.value}

            buscar(odontologo); //buscamos a la BD
            
            setNewId({ value: '', error: false });
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewMatricula({ value: '', error: false });
        }
        else {
            setNewMatricula({ value:'', error: true });
            setNewApellido({ value:'',error: true});
            setNewNombre({value:'', error:true});

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

        const agregarOdontologoApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const {data} = await axios.post("http://localhost:8080/odontologos", odontologo);
                console.log(data);//Aca podriamos validar si data
                
                /*----------Actualizamos nuestro vista---------*/
                
                const newData = odontologos;
                newData.push(data);
                setData(newData);

            } catch (error) {
                console.log(error);
            }
        };
        
        agregarOdontologoApi();
    
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
        if(odontologo.nombre === '') odontologo.nombre = '_';
        if(odontologo.apellido === '') odontologo.apellido = '_';
        if(odontologo.matricula === '') odontologo.matricula = '_';
        
        const buscarOdontologoXApi = async () => {
            try {
                    const {data} = await axios.get("http://localhost:8080/odontologos/"+odontologo.nombre+"/"+odontologo.apellido+"/"+odontologo.matricula);
                    console.log(data);//Aca podriamos validar si data
                    
                if(data[0]){
                    setNodoApi('/'+odontologo.nombre+'/'+odontologo.apellido+'/'+odontologo.matricula);
                }else{
                    setNodoApi('');
                }
                
            } catch (error) {
                console.log(error);
            }
        };
        
        buscarOdontologoXApi();
        
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
        const eliminarOdontologoApi = async () => {
            try {
                /*------Peticion a la API---------*/
                const {data} = await axios.delete("http://localhost:8080/odontologos/"+odontologo.id);
                console.log(data);//Aca podriamos validar si data
                
                /*----------Actualizamos nuestro vista---------*/
                
                const newData = odontologos.filter((o) => o.id !== odontologo.id);
                setData(newData);
                
            } catch (error) {
                console.log(error);
            }
        };
    
        eliminarOdontologoApi(odontologo);

        /*
        console.log("tocaste en eliminar")
        const newData = odontologos.filter((odontologo) => odontologo.id !== id);
        setData(newData);
        */
    }
    /*------------------------------------------------------*/
    return (
        <>
            <h3>Agregar Odontologos</h3>
            <div className='container border bg-light d-flex justify-content-center p-3'>
                <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                    <div className="col-12 col-md-1">
                        <input disabled type="text" className="form-control" placeholder="Id" value={newId.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3">
                        <input type="text" className="form-control" placeholder="Nombre" value={newNombre.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3">
                        <input type="text" className="form-control" placeholder="Apellido" value={newApellido.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-3">
                        <input type="text" className="form-control" placeholder="Matricula" value={newMatricula.value} onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-2">
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

            <ol Style={"margin-left: -30px"}>
                
            {odontologos.map((odontologo, i) => {
                    return (
                        <div className='container border bg-light d-flex justify-content-center p-3'>
                            <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                                <div className="col-12 col-md-1">
                                    <input id={"editInput" + i} disabled type="text" className="form-control" placeholder="Id" value={odontologo.id} />
                                </div>
                                <div className="col-12 col-md-3">
                                    <input id={"editInput" + i} disabled type="text" className="form-control" placeholder="Nombre" value={odontologo.nombre} />
                                </div>
                                <div className="col-12 col-md-3">
                                    <input id={"editInput" + i} disabled type="text" className="form-control" placeholder="Apellido" value={odontologo.apellido} />
                                </div>
                                <div className="col-12 col-md-3">
                                    <input id={"editInput" + i} disabled type="text" className="form-control" placeholder="Matricula" value={odontologo.matricula} />
                                </div>
                                <div className="col-12 col-md-2">
                                    <div className='row'>
                                        <div className='col-6'>
                                            <i className="btn btn-lg fa-regular fa-pen-to-square" onClick={() => editar(odontologo)}></i>
                                        </div>
                                        <div className='col-6'>
                                            <i className="btn btn-lg fa-solid fa-trash" onClick={() => eliminar(odontologo)}></i>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                })}
            </ol>
        </>
    )
}


export default Odontologos;