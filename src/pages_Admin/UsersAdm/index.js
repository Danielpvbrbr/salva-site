import React, { useContext, useState } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { FiUsers, FiX } from 'react-icons/fi';
import Switch from 'react-input-switch';


import Header from '../../componets/Header';

export default function UsersAdm({ AuthContext, Link, ReactLoading }) {
    const {
        users,
        spots,
        addres,
        deleteAllUsers,
        funcLocation,
        updateUsers,
        updateSpots,
        updateLocation,
        loading
    } = useContext(AuthContext);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(0);
    const [account, setAccount] = useState(0);
    const [admin, setAdmin] = useState(0);
    const [points, setPoints] = useState(0);
    const [kilos, setKilos] = useState(0);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [district, setDistrict] = useState('');
    const [num, setNum] = useState(0);
    const [road, setRoad] = useState('');
    const [state, setState] = useState('');
    const [disabled, setdisabled] = useState(true);
    const [pt, setPt] = useState(0);
    const [kg, setKg] = useState(0);

    const onDateChange = (e) => {
        funcLocation(e.id)
        setPt(e.pt);
        setKg(e.kg);
        setName(e.name);
        setPhone(e.phone);
        setStatus(e.status ? 0 : 1);
        setAccount(e.account ? 1 : 0);
        setAdmin(e.admin ? 1 : 0);
        setCity(addres.city);
        setCountry(addres.country);
        setDistrict(addres.district);
        setNum(addres.num);
        setRoad(addres.road);
        setState(addres.state);
        setdisabled(false);
        setId(e.id);
        setPoints(0)
        setKilos(0)
    };

    const handleSubmit = () => {
        updateUsers({
            id: id,
            name: name,
            account: account ? true : false,
            status: !status ? true : false,
            admin: admin ? true : false,
            phone: phone,
        });

        updateLocation({
            id: id,
            city: city,
            road: road,
            district: district,
            num: num,
            state: state
        })

        if (Math.sign(points || kilos) === 1) {
            updateSpots({
                id: id,
                pt: parseInt(points) + parseInt(pt),
                kg: parseInt(kilos) + parseInt(kg)
            })

        } else if (Math.sign(points || kilos) === -1) {
            updateSpots({
                id: id,
                pt: parseInt(pt) - Math.abs(points),
                kg: parseInt(kg) - Math.abs(kilos)
            })
        }

        clearState()
    }

    const clearState = () => {
        setName('');
        setPhone('');
        setStatus(0);
        setAccount(0);
        setAdmin(0);
        setCity('');
        setCountry();
        setDistrict('');
        setNum(0);
        setRoad('');
        setState('');
        setId('');
        setdisabled(true);
    };

    return (
        <div id="UserAdm">
            <Header rota="/users" AuthContext={AuthContext} Link={Link} />
            <div id="body">
                <div id="containTitle" >
                    <div id="title">
                        <h3>Lista de Usuários!</h3>
                    </div>
                </div>

                <div id="containProduct" >
                    <div id="product" >
                        {users.length >= 1 ?
                            users.map((v, i) =>
                                <div key={i} onClick={() => onDateChange(v)}>
                                    <section id="areaInfo">
                                        <h3>{v.name}</h3>
                                    </section>

                                    <section id="areClose">
                                        <FiX id="iconClose" onClick={() => deleteAllUsers(v.id)} />
                                    </section>

                                </div>
                            )
                            :
                            <div id="containErr">
                                <FiUsers id="iconCart" />
                                <p>Nenhum usuário carregado!</p>
                            </div>
                        }

                    </div>

                    <div id="Form" >

                        <section id="inputs">

                            <section className="inputArea">

                                <label>Nome:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Nome completo do usuário!"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                    disabled={disabled}
                                />


                                <label>Telefone:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Numero de telefone do usuario!"
                                    name="phone"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    disabled={disabled}
                                />
                            </section>
                            <div className="areaInputRadio">
                                <label>Usuário</label>
                                <Switch value={admin ? 1 : 0} onChange={setAdmin} />
                                <label>Admin</label>
                            </div>
                            <div className="areaInputRadio">
                                <label >Fisica</label>
                                <Switch value={account ? 1 : 0} onChange={setAccount} />
                                <label >Juridico</label>
                            </div>

                            <div className="areaInputRadio">
                                <label>Ativa</label>
                                <Switch value={status ? 1 : 0} onChange={setStatus} />
                                <label>Inativo</label>
                            </div>
                            <section className="inputArea">
                                <label>Cidade:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Cidade!"
                                    name="city"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    disabled={disabled}
                                />

                                <label>Pais:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Pais!"
                                    name="country"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    disabled={disabled}
                                />
                                <label>Bairro:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Bairro!"
                                    name="district"
                                    value={district}
                                    onChange={e => setDistrict(e.target.value)}
                                    disabled={disabled}
                                />

                                <label>Numero:</label>
                                <input
                                    type="text"
                                    className="inputSmaller"
                                    name="num"
                                    value={num}
                                    onChange={e => setNum(e.target.value)}
                                    disabled={disabled}
                                />

                                <label>Endereço:</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Endereço!"
                                    name="road"
                                    value={road}
                                    onChange={e => setRoad(e.target.value)}
                                    disabled={disabled}
                                />
                                <label>Estado:</label>
                                <input
                                    type="text"
                                    className="inputSmaller"
                                    maxLength={2}
                                    name="state"
                                    value={state}
                                    onChange={e => setState(e.target.value)}
                                    disabled={disabled}
                                />

                                <div className="areaInputSmaller">
                                    <label>Pts({pt}):</label>
                                    <input
                                        type="number"
                                        className="inputSmaller"
                                        maxLength={5}
                                        name="points"
                                        value={points}
                                        onChange={e => setPoints(e.target.value)}
                                        disabled={disabled}
                                    />
                                    <label>Kg({kg}):</label>
                                    <input
                                        type="number"
                                        className="inputSmaller"
                                        maxLength={5}
                                        name="kilos"
                                        value={kilos}
                                        onChange={e => setKilos(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </section>
                            <button onClick={handleSubmit} disabled={disabled} id="btnUpload">
                                {loading ?
                                    <ReactLoading type="bubbles" color="#FFF" height={25} width={50} className="tes" /> : 'Salvar'
                                }
                            </button>

                        </section>

                    </div>

                </div>
            </div>
        </div>
    )


} 
