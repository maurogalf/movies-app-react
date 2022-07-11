import axios from "axios";
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
        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(<h2>Invalid email or password</h2>);
            return;
        }
        swAlert(<h2>Login successful</h2>);
        axios
            .post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                console.log(res.data)
                const token = res.data.token;
                localStorage.setItem("token", token)
                navigate("/listado")
            })
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
                <input type="text" name="email" />
                <br />
                <label>
                    <span>Password</span>
                </label>
                <br />
                <input type="password" name="password" />
                <br />
                <button type="submit"
                    className="btn btn-success m-4"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    title='Usuario: "challenge@alkemy.org", Contraseña: "react"'>Ingresar</button>
            </form>
        </>
    )
}

export default Login;