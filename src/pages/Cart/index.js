import React, { useContext, useState } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { FiShoppingCart, FiX } from 'react-icons/fi';

import Header from '../../componets/Header';

export default function Cart({ AuthContext, Link }) {
    const {
        user,
        myCart,
        deleteCart,
        deleteCartAll,
        records,
        updateSpots,
        Rescues
    } = useContext(AuthContext);


    function sum() {
        var sum = 0;
        for (let el in myCart) {
            if (myCart.hasOwnProperty(el)) {
                sum += parseFloat(myCart[el].price);
            }
        }
        return (sum);
    };

    function confirm() {
        let ifSum = Math.sign(user.pt - sum());

        if (ifSum === -1) {
            alert('Pontos insuficientes');
        } else {
            alert('Resgate realizado com sucesso!');
            for (let i in myCart) {
                Rescues({
                    id: myCart[i].id,
                    id_user: user.id,
                    price: myCart[i].price,
                    name: user.name,
                    title: myCart[i].title,
                    image: myCart[i].image,
                    delivered: false,
                    order: false,
                    date: new Date()
                });
            };
            deleteCartAll(user.id);

            records({
                id_user: user.id,
                price: sum(),
                type: 'rescue',
            });

            updateSpots({
                id: user.id,
                kg: user.kg,
                pt: user.pt - sum(),
            });

        };
    };

    return (
        <div id="Cart">
            <Header AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containTitle" >

                    <div id="title">
                        <h3>Carrinho de trocas</h3>

                    </div>

                    <div id="spots">
                        <p Style="color:#000">Saldo:</p>
                        <p>{user.pt}Pts</p>
                    </div>

                </div>

                <div id="containProduct" >
                    <section id="containListProduct">
                        {myCart.length >= 1 ?
                            myCart.map((v, i) =>

                                <div key={i}>
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
                                        <h3>{v.price}Pts</h3>
                                        <FiX id="iconClose" onClick={() => deleteCart(v.id)} />
                                    </section>

                                </div>
                            )
                            :
                            <div id="containCart">
                                <FiShoppingCart id="iconCart" />
                                <p>Carrinho Vazio!</p>
                            </div>

                        }
                    </section>
                    <section id="containLeftInfo">
                        <h3>Confirme seu resgate</h3>

                        <section id="info">
                            <div id="listInfo">
                                <h3>Pontos disponivel</h3>
                                <h3>Total de Produtos</h3>
                                <h3>Pontos após o resgate</h3>
                            </div>

                            <div id="infoNum">
                                <h3>{user.pt}</h3>
                                <h3 Style="color:#FF0000">{- sum()}</h3>
                                <h3>{user.pt - sum()}</h3>
                            </div>
                        </section>

                        <section id="infoButton">
                            <button
                                disabled={sum() <= 0}
                                onClick={confirm}
                            >
                                Finalizar
                            </button>
                        </section>

                    </section>
                </div>
            </div>
        </div>
    )


} 