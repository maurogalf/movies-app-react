import swAlert from '@sweetalert/with-react';
import { useNavigate  } from 'react-router-dom';





function Buscador () {
    const navigate = useNavigate();
    const submitHandler = (e) =>{
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if(keyword.length === 0) {
            swAlert(<h5>Debes ingresar una palabra clave.</h5>)
        } else if(keyword.length <= 3) {
                swAlert(<h5>Debes escribir mas de 4 caracteres.</h5>)
        } else {
            e.currentTarget.keyword.value = '';
            navigate(`/resultados?keyword=${keyword}`)
        }
        
    }
    return (
        <form onSubmit={submitHandler} className="d-flex align-items-center">
                <input placeholder="Buscador" type="text" className="mx-2" name="keyword" />
                <button className="btn btn-success mx-2" type="submit">Ingresar</button>
        </form>
    )
}

export default Buscador