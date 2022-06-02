

const FormPaciente = (paciente, domicilio, handleChange, handleSearch, handleSubmit ) =>{
    return(
        <div className='container border bg-light d-flex justify-content-center p-3'>
                <form className="row row-cols-lg-auto d-flex justify-content-around align-items-center w-100" >
                    <div className="col-12 col-md-1 col-lg-1">
                        <input disabled type="text" className="form-control" placeholder="Id" value={paciente.id} onChange={handleChange} />
                    </div>
                    <div className='col-12 col-md-8 col-lg-8'>
                        <div className='row'>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Nombre" value={paciente.nombre} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Apellido" value={paciente.apellido} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="DNI" value={paciente.dni} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Fecha" value={paciente.fechaIngreso} onChange={handleChange} /> 
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Calle" value={domicilio.calle} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Numero" value={domicilio.numero} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Localidad" value={domicilio.localidad} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3">
                                <input type="text" className="form-control" placeholder="Provincia" value={domicilio.provincia} onChange={handleChange} />
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
    )
}


export default FormPaciente;