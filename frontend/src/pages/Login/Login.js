import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./styleLogin.css";

import personLogin from '../../assets/img/personLogin.svg';
import password from '../../assets/img/password.svg';
import person from '../../assets/img/personBig.svg';

const Login = () => {
    const [formData, setFormData] = useState({
        user: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:2004/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.user,
                    password: formData.password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login bem-sucedido:', data);
            } else {
                console.log('Falha no login:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="content">
            <div className="overlap-group">
                <div className="frame">
                    <div className="titulo-login">Faça seu login</div>
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <div className="form-group-input">
                                <img src={personLogin}/>
                                <input
                                    id="user"
                                    name="user"
                                    placeholder="Usuário"
                                    value={formData.user}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group-input">
                                <img src={password}/>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-auxiliar">
                            <div className="remember-div">
                                <label className="remember-label">
                                    <input type="checkbox" className="remember-input"/>
                                    <h1>Lembrar de mim</h1>
                                </label>
                            </div>
                            <div className="forgot-div">
                                <button className="forgot-button">
                                    <div className="forgot-text">Esqueci a senha</div>
                                </button>
                            </div>
                        </div>
                        <div className="envio">
                            <Link to={'/certificados'}>
                                <button type="submit-button">
                                    <div className="submit-text">Login</div>
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="ellipse" />
                <img className="vector" alt="Vector" src={person} />
            </div>
        </div>
    );
};

export default Login
