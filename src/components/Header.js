import {Link, useNavigate} from 'react-router-dom'
import Buscador from './Buscador';


function Header() {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();

    let handlerLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/")
    }
    return (
        <header>
            <nav className="navbar navbar-dark bg-dark" >
                <ul className='nav'>
                    <li className='nav-item'>
                        <Link className='nav-link active' to= "/">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link active' to= "/listado">Listado</Link>
                    </li>
                    <li className='nav-item'>
                        <form onSubmit={handlerLogOut}>
                            <button type="submit" className='nav-link active' to= "/contacto">Log out</button>                        
                        </form>
                    </li>
                </ul>
            {token && <Buscador/>}
            </nav>
        </header>
    )
}

export default Header;