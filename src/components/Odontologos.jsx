
import React, { useState } from 'react';


/*-----SIMULAMOS LA BD-----*/
let data = [{ id: "1", nombre: "Alejando", apellido: "Perez", matricula: "123" },
{ id: "2", nombre: "Carolina", apellido: "Rebeca", matricula: "456" },
{ id: "3", nombre: "Raton", apellido: "Perez", matricula: "789" }];

var contador = data.length;
/*-----SIMULAMOS LA BD-----*/

const Odontologos = () => {

    const [odontologos, setData] = useState(data);

    const [newId, setNewId] = useState({ value: "", error: false });
    const [newNombre, setNewNombre] = useState({ value: "", error: false });
    const [newApellido, setNewApellido] = useState({ value: "", error: false });
    const [newMatricula, setNewMatricula] = useState({ value: "", error: false });

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

            agregar(newOdontologo);
            setNewId({ value: '', error: false })
            setNewNombre({ value: '', error: false });
            setNewApellido({ value: '', error: false });
            setNewMatricula({ value: '', error: false });
        }
    }
    /*------------------------------------------------------*/
    /*-------FUNCIONES QUE PODRIAN SER DE PETICIONES BD----------*/
    const agregar = (odontologo) => {
        console.log(odontologo);

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
    }

    const editar = (i) => {
        /*
        const inputs = document.querySelectorAll("#editInput" + i);
        console.log(inputs[0].value);
        inputs[1].toggleAttribute("disabled");
        inputs[2].toggleAttribute("disabled");
        inputs[3].toggleAttribute("disabled");
        //inputs.map((input)=>{return input.toggleAttribute("disabled")});
        */
        setNewId({ value: odontologos[i].id, error: false });
        setNewNombre({ value: odontologos[i].nombre, error: false });
        setNewApellido({ value: odontologos[i].apellido, error: false });
        setNewMatricula({ value: odontologos[i].matricula, error: false });
    }

    const eliminar = (id) => {
        console.log("tocaste en eliminar")
        const newData = odontologos.filter((odontologo) => odontologo.id !== id);
        setData(newData);
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
                            <div className='col-md-12'><i className="fa-regular fa-plus" onClick={handleSubmit}></i></div>
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
                                        <div className='col-6'><i className="fa-regular fa-pen-to-square" onClick={() => editar(i)} ></i></div>
                                        <div className='col-6'><i className="fa-solid fa-trash" onClick={() => eliminar(odontologo.id)}></i></div>
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