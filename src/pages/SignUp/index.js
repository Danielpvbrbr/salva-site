import React, { useState, useEffect, useContext } from "react";
import './index.css';
import { FiUnlock, FiUser, FiArrowLeft, FiPhone, FiLock } from 'react-icons/fi';
import imgLogo from '../../assets/logo/logo.png';
// import Switch from "react-switch";
import Switch from 'react-input-switch';

export default function SignUp({ Link, AuthContext }) {
    const { signUp } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [ifpass, setIfPass] = useState('');
    const [name, setName] = useState('');
    const [account, setAccount] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = () => {
        signUp({
            name: name,
            phone: phone,
            password: pass,
            account: account ? true : false,
        })
    };

    useEffect(() => {
        if (name.length > 3 && phone.length > 3 && ifpass.length > 3 && pass === ifpass) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, pass, phone, ifpass]);

    const focus = () => {
        setPhone(55);
    };

    return (
        <div id="signUp">
            <header id="header">
                <nav id="containBack">
                    <Link to="/">
                        <FiArrowLeft id="iconBack" />
                    </Link>
                    <h1 className="title">Login</h1>
                </nav>
            </header>

            <body id="body">
                <form id="containLogin" >
                    <section id="containLeft">
                        <img
                            src={imgLogo}
                            id="imgLogo"
                            alt="logo Salva"
                        />
                    </section>

                    <section id="containRight">

                        <div id="containInput">

                            <FiUser id="iconTell" />
                            <input
                                type="text"
                                className="input"
                                placeholder="Digite seu nome completo"
                                maxLength={50}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />

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
                                autofocus={true}
                                onClick={focus}
                            />

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

                            <FiUnlock id="iconLock" />
                            <input
                                type="password"
                                className="input"
                                placeholder="Confirme sua senha"
                                maxLength={8}
                                value={ifpass}
                                onChange={e => setIfPass(e.target.value)}
                                required
                            />

                            <div id="switch">
                                <p>Física</p>
                                <Switch value={account} onChange={setAccount} />
                                <p className="textSwitchJ">Juridica</p>
                            </div>
                        </div>

                        <div id="containButton">
                            <input
                                type="button"
                                className="btnRegister"
                                Style={disabled && 'background-color: #D1D1D1;'}
                                value="Cadastrar"
                                disabled={disabled}
                                onClick={handleSubmit}
                            />
                        </div>

                    </section>
                </form>
            </body>
        </div>
    )


} 