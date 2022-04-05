import React, { useContext, useState } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { FiShoppingBag, FiX } from 'react-icons/fi';

import Header from '../../componets/Header';

export default function Rescues({ AuthContext, Link }) {
    const {
        user,
        spots,
        myCart,
        myRescues
    } = useContext(AuthContext);
    const [recuesValue, setRecuesValue] = useState([]);

    // function handleSubmit(data) {
    //     data.title,
    //         data.image.uri,
    //         data.order
    // }

    return (
        <div id="Rescues">
            <Header AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containTitle" >

                    <div id="title">
                        <h3>Meus Produtos</h3>
                    </div>

                    <div id="spots">
                        <p Style="color:#000">Saldo:</p>
                        <p>{user.pt}Pts</p>
                    </div>
                </div>

                <div id="containProduct" >
                    <section id="containListProduct">
                        {myRescues.length > 0 ?
                            myRescues.map((v, i) =>

                                <div key={i} onClick={() => setRecuesValue({
                                    title: v.title,
                                    image: v.image,
                                    order: v.order
                                })}>
                                    <section id="areaImg" >
                                        <img
                                            src={v.image}
                                            alt={v.title}
                                            id="imgProduct"
                                        />
                                    </section>

                                    <section id="areaInfo">
                                        <h3>{v.title}</h3>
                                    </section>

                                    <section id="areaPrice">
                                        <h3 Style={`color:${v.order ? '#31B404' : '#FF0000'}`}>{v.order ? 'Aprovado' : 'Pendente'}</h3>
                                        {/* <FiX id="iconClose" onClick={() => deleteCart(v.key)} /> */}
                                    </section>

                                </div>
                            )
                            :
                            <div id="containCart">
                                <FiShoppingBag id="iconCart" />
                                <p>Nenhum produto!</p>
                            </div>
                        }
                    </section>
                   
                </div>
            </div>
        </div>
    )


} 