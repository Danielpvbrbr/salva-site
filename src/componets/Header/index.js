import React, { useContext, useState } from 'react';
import './index.css';
import { FiShoppingBag, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiRotateCw } from 'react-icons/fi';

export default function Header({ Link, AuthContext, rota }) {
    const { user, signOut, users, cartSize, runSpots, spots_ } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const largura = window.innerWidth;

    // let filterName = users.filter(person => person.name == user.name);
    // console.log(filterName[0].name)

    return (
        <header id="header">

            <nav id="menu">
                {largura < 600 ?

                    <FiMenu id="menuIcon" onClick={() => setShow(!show)} />
                    :
                    <ul>
                        <li Style={rota === '/' && "background-color: #008648; border-Radius:5px;"}>
                            <Link to="/">
                                <p>Inicio</p>
                            </Link>
                        </li>

                        <li Style={rota === '/shop' && "background-color: #008648; border-Radius:5px;"}>
                            <Link to="/shop">
                                <p>Loja</p>
                            </Link>
                        </li>
                        {
                            user.admin &&
                            <li Style={rota === '/users' && "background-color: #008648; border-Radius:5px;"}>
                                <Link to="/users">
                                    <p>Usuário</p>
                                </Link>
                            </li>
                        }

                    </ul>
                }

            </nav>

            {show &&
                <nav id="menuBurg">

                    <ul>
                        <li >
                            <Link to="/">
                                <p>Inicio</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/shop">
                                <p>Loja</p>
                            </Link>
                        </li>
                        {
                            user.admin &&
                            <li>
                                <Link to="/users">
                                    <p>Usuário</p>
                                </Link>
                            </li>
                        }

                    </ul>

                </nav>
            }


            <section id="areaInfo">
                <section id='areaIcon'>
                    {
                        !user.admin &&
                        <>
                            <Link to="/rescues">
                                <FiShoppingBag className='icon' />
                            </Link>
                            <Link to="/cart">
                                <div id="cartArea">
                                    <FiShoppingCart className='icon' />
                                    <p className="cicle">{cartSize}</p>
                                </div>
                            </Link>
                        </>
                    }

                </section>

                <section id='areaProfile'>
                    {
                        user.admin && <h3 className='name'>R$: {(0.20 * spots_.kg).toFixed(2)}</h3>
                    }

                    <h3 className='name'>{user.name}</h3>
                    {/* <Link to="/account">
                        <FiUser className='icon' />
                    </Link> */}
                      <FiUser className='icon' />
                    <FiRotateCw className='iconPower' onClick={() => window.location.reload()} />
                    <Link to="/">
                        <FiLogOut className='iconPower' onClick={signOut} />
                    </Link>

                </section>
            </section>
        </header>
    )
}