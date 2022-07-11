import swAlert from '@sweetalert/with-react';
import { Navigate, useNavigate } from 'react-router-dom'



function Login() {
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email === '' || password === '') {
            swAlert(<h2>Please fill in all fields</h2>);
            return;
        }
        if (!re.test(email)) {
            swAlert(<h2>Invalid email</h2>);
            return;
        }
        if (email !== 'maurogalfonso@gmail.com' || password !== 'react') {
            swAlert(<h2>Invalid email or password</h2>);
            return;
        }
        swAlert(<h2>Login successful</h2>);
        const token = "token";
        localStorage.setItem("token", token)
        navigate("/listado")
    }
    const handleComplete = () => {
        document.getElementById("email").value = "maurogalfonso@gmail.com"
        document.getElementById("password").value = "react"
    }
    const token = localStorage.getItem('token');
    return (
        <>
            {token && <Navigate to="/listado" />}
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo Electronico:</span>
                </label>
                <br />
                <input type="text" name="email" id='email' />
                <br />
                <label>
                    <span>Password</span>
                </label>
                <br />
                <input type="password" name="password" id='password' />
                <br />
                <button type="submit"
                    className="btn btn-success m-4"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    title='Usuario: "maurogalfonso@gmail.com", Contraseña: "react"'>Ingresar</button>
            </form>
                <button type="button"
                    onClick={()=> handleComplete() }
                    className="btn btn-dark m-4"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    title='Usuario: "maurogalfonso@gmail.com", Contraseña: "react"'>Completar Automáticamente</button>
        </>
    )
}

export default Login;