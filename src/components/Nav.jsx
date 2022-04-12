import {Link} from 'react-router-dom';
const Nav =()=>{
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand"  to={"/"}>Home</Link>
        <button className="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#navbarNav" 
        aria-controls="navbarNav" aria-expanded="false" 
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/odontologos"}>Odontologos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/pacientes"}>Pacientes</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Nav;