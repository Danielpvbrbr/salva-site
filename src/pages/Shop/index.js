import React, { useContext, useState } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';

import Header from '../../componets/Header';

export default function Shop({ AuthContext, Link }) {
    const { spots, myProduct, cart,user } = useContext(AuthContext);

    const handleSubmit = (data) => {

        cart({
            id_cart: user.id,
            image: data.image,
            title: data.title,
            price: parseInt(data.price),
            qtd: 1
        })
    };

    return (
        <div id="Shop">
            <Header AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containTitle" >

                    <div id="title">
                        <h3>Loja Salva</h3>

                    </div>

                    <div id="spots">
                        <p>Saldo: {user.pt}Pts</p>
                    </div>

                </div>

                <div id="containProduct" >
                    <section id="containListProduct">
                        {
                            myProduct.map((v, i) =>

                                <div key={i}>
                                    <section id="areaImg" >
                                        <img
                                            src={v.image.uri}
                                            alt={v.title}
                                            id="imgProduct"
                                        />
                                    </section>

                                    <section id="areaInfo">
                                        <h3>{v.title}</h3>
                                    </section>

                                    <section id="areaPrice">
                                        <h3>{v.price}Pts</h3>
                                        <p>Entrega na próxima coletas</p>
                                    </section>

                                    <section id="areaButton">
                                        <button onClick={()=>handleSubmit({
                                            key: v.key,
                                            image: v.image,
                                            title: v.title,
                                            price: v.price,
                                        })}>Adicionar</button>
                                    </section>
                                </div>
                            )
                        }
                    </section>
                </div>
            </div>
        </div>
    )


} 