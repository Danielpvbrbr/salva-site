import React, { useContext, useState } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { FiShoppingCart, FiX } from 'react-icons/fi';

import Header from '../../componets/Header';
import logo from '../../assets/logo/logo.png';

export default function ShopAdm({ AuthContext, Link, ReactLoading }) {
    const {
        loadPloads,
        myProduct,
        delProduct,
        uploadImage,
        updateProduct
    } = useContext(AuthContext);
    const [key, setKey] = useState(null);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [img, setImg] = useState(null);
    const [disabled, setdisabled] = useState(false);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img));
            setImg(img);

        }
    }

    function upload() {
        if (disabled) {
            if (price >= 1 && title.length >= 2) {

                let data = {
                    key: key,
                    title: title,
                    price: price
                }
                updateProduct(data);
            } else {
                alert('Campos estão vazios!')
            }
        } else {
            if (price >= 1 && title.length >= 2) {

                let data = {
                    title: title,
                    image: img,
                    price: price,
                }
                uploadImage(data);
            } else {
                alert('Alguns campos estão vazios!')
            }
        }
        clearState()
    };

    const onDateChange = (e) => {
        setKey(e.key)
        setPrice(e.price);
        setTitle(e.title);
        setImage(e.image.uri);
        setdisabled(true);
    };
    const clearState = (e) => {
        setKey('')
        setPrice(0);
        setTitle('');
        setImage('');
        setdisabled(false);
    };

    return (
        <div id="ShopAdm">
            <Header rota="/shop" AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containTitle" >

                    <div id="title">
                        <h3>Loja Salva!</h3>

                    </div>
                </div>

                <div id="containProduct" >
                    <div id="product" >

                        {myProduct.length >= 1 ?
                            myProduct.map((v, i) =>

                                <div key={i} onClick={() => onDateChange(v)}>
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
                                        <FiX id="iconClose" onClick={() => delProduct(v.key)} />
                                    </section>
                                </div>
                            )
                            :
                            <div id="containCart">
                                <FiShoppingCart id="iconCart" />
                                <p>Carrinho Vazio!</p>
                            </div>
                        }

                    </div>

                    <div id="Form" >

                        <div id="subForm" >
                            <section id="areaProduct" >
                                <img
                                    src={image || logo}
                                    alt="desodorante"
                                    id="imgProduct"
                                    onClick={() => disabled && alert('Foto do produto não pode ser alterada!')}
                                />
                                <input
                                    type="file"
                                    className="inputFile"
                                    accept=".jpg, .jpeg"
                                    name="myImage"
                                    onChange={e => onImageChange(e)}
                                    disabled={disabled}

                                />
                                <div id="areaTitle">
                                    <h3>{title || 'Titulo do produto'}</h3>
                                </div>

                                <h4>{price} Pts</h4>

                                <section id="areaButton">
                                    <p>Entrega na próxima coletas</p>
                                    <button >Adicionar</button>

                                </section>
                            </section>

                            <section id="inputs">
                                <input
                                    type="text"
                                    className="inputTitle"
                                    placeholder="Digite o titulo do produto!"
                                    maxLength={20}
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    autoFocus
                                />

                                <input
                                    type="number"
                                    className="inputPrice"
                                    placeholder="99"
                                    maxLength={4}
                                    name="phone"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                    autoFocus
                                />
                                <input
                                    type="button"
                                    className="inputButton"
                                    name="clear"
                                    value="Limpar"

                                />
                            </section>
                        </div>

                        <button onClick={upload} id="btnUpload">
                            {!disabled ?
                                loadPloads ?
                                    <ReactLoading
                                        type="bubbles"
                                        color="#FFF"
                                        height={25}
                                        width={50}
                                        className="tes"
                                    /> : 'Cadastrar'

                                :

                                loadPloads ?
                                    <ReactLoading
                                        type="bubbles"
                                        color="#FFF"
                                        height={25}
                                        width={50}
                                        className="tes"
                                    /> : 'Alterar e Salva'
                            }

                        </button>
                    </div>

                </div>
            </div>
        </div>
    )


} 