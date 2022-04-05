import React, { useContext, useState } from "react";
import './index.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import Header from '../../componets/Header';

export default function Home({ AuthContext, Link }) {
    const [show, setShow] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [num, setNum] = useState('');
    const [road, setRoad] = useState('');

    const { user, updateUsers, updateLocation, listUsers, addres_ } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUsers({
            id: user.id,
            name: name,
            phone: phone,
            account: listUsers.account,
            city: city,
            road: road,
            district: district,
            num: num,
        });

        updateLocation({
            id: user.id,
            city: city,
            road: road,
            district: district,
            num: num,
            state: state
        })
        setShow(true);
    };

    const focus = () => {
        setShow(!show);
        setName(listUsers.name);
        setPhone(listUsers.phone);
        setCity(addres_.city);
        setState(addres_.state);
        setDistrict(addres_.district);
        setNum(addres_.num);
        setRoad(addres_.road);
    };

    return (
        <div id="Account">
            <Header AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <section id="containForm">
                    <div id="title">
                        <h3>Informações da conta</h3>
                    </div>
                    {show ?
                        <ul>
                            <li>
                                <h4>Nome:</h4>
                                <p>{listUsers.name}</p>
                            </li>
                            <li>
                                <h4>Tipo de conta:</h4>
                                <p>{listUsers.account ? 'Fisica' : 'Jurídica'}</p>
                            </li>
                            <li>
                                <h4>Telefone:</h4>
                                <p>{listUsers.phone}</p>
                            </li>

                            <li>
                                <h4>Cidade:</h4>
                                <p>{`${addres_.city}  - ${addres_.state}`}</p>
                            </li>

                            <li>
                                <h4>Cidade:</h4>
                                <p>{addres_.state}</p>
                            </li>

                            <li>
                                <h4>Bairro:</h4>
                                <p>{addres_.district}</p>
                            </li>
                            <li>
                                <h4>Endereço:</h4>
                                <p>{addres_.road}</p>
                            </li>
                            <li>
                                <h4>Numero:</h4>
                                <p>{addres_.num}</p>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <h4>Nome:</h4>
                                <input
                                    type="text"
                                    className="input"
                                    maxLength={30}
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </li>
                            <li>
                                <h4>Tipo de conta:</h4>
                                <p>{listUsers.account ? 'Fisica' : 'Jurídica'}</p>
                            </li>
                            <li>
                                <h4>Telefone:</h4>

                                <input
                                    type="text"
                                    className="input"
                                    maxLength={14}
                                    name="phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </li>

                            <li>
                                <h4>Cidade:</h4>
                                <input
                                    type="text"
                                    className="input"
                                    maxLength={14}
                                    name="city"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </li>

                            <li>
                                <h4>Estado:</h4>
                                <input
                                    type="text"
                                    className="input"
                                    maxLength={14}
                                    name="state"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                />
                            </li>

                            <li>
                                <h4>Bairro:</h4>
                                <input
                                    type="text"
                                    className="input"
                                    maxLength={40}
                                    name="district"
                                    value={district}
                                    onChange={e => setDistrict(e.target.value)}
                                />
                            </li>
                            <li>
                                <h4>Endereço:</h4>
                                <input
                                    type="text"
                                    className="input"
                                    maxLength={40}
                                    name="road"
                                    value={road}
                                    onChange={e => setRoad(e.target.value)}
                                />
                            </li>
                            <li>
                                <h4>Numero:</h4>
                                <input
                                    type="number"
                                    className="input"
                                    maxLength={6}
                                    name="num"
                                    value={num}
                                    onChange={e => setNum(e.target.value)}
                                    Style={`width:50px`}
                                />
                            </li>
                        </ul>
                    }

                    <div id="areaButton">
                        <button id="btnEd" onClick={focus} >Editar</button>
                        <button disabled={show} id="btnSa" onClick={handleSubmit}>Salvar</button>
                    </div>

                </section>

            </div>
        </div>
    )


} 