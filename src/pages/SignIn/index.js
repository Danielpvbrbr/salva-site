import React, { useState, useContext,useEffect } from "react";
import './index.css';
import { FiPhone, FiLock } from 'react-icons/fi';
import imgLogo from '../../assets/logo/logo.png';


export default function SignIn({ Link, AuthContext, ReactLoading, largura }) {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const { signIn, loading } = useContext(AuthContext);
        

    const handleSubmit = (e) => {
        e.preventDefault();
      signIn(phone, pass);

    };
    const focus = () => {
        setPhone(55);
    };


    return (
        <div id="signIn">

            <div id="body">

                <form id="containLogin" onSubmit={handleSubmit}>
                    <section id="containLeft">
                        <img
                            src={imgLogo}
                            id="imgLogo"
                            alt="logo Salva"
                        />
                    </section>

                    <section id="containRight">
                        {largura < 992 &&
                            <section id="areaLogo">
                                <img
                                    src={imgLogo}
                                    id="imgLogo"
                                    alt="logo Salva"
                                />
                            </section>
                        }

                        <div id="containInput">

                            <section id="inputTell">
                                <FiPhone id="iconTell" />
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="+5599999999999"
                                    maxLength={14}
                                    name="phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    required
                                    autoFocus
                                    onClick={focus}
                                />
                            </section>

                            <section id="inputLock">
                                <FiLock id="iconLock" />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Digite sua senha"
                                    maxLength={8}
                                    value={pass}
                                    onChange={e => setPass(e.target.value)}
                                    required
                                />
                            </section>

                        </div>

                        <div id="containButton">

                            <button
                                type="submit"
                                className="btnAccess"
                                disabled={loading}
                            >

                                {loading ?
                                    <ReactLoading type="bubbles" className="tes" color="#FFF" height={25} width={50} /> : 'Acessar'
                                }
                            </button>
                          

                            <Link to="/SignUp">
                                <input
                                    type="button"
                                    className="btnRegister"
                                    value="Cadastrar"
                                />
                            </Link>

                        </div>

                    </section>
                </form>
        
            </div>
        </div>
    )


} 