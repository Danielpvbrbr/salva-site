import React, { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import api from '../services/api';
export const AuthContext = createContext({});
// eslint-disable-next-line import/first
import firebase from '../services/firebaseConnection';
const socket = io.connect("http://localhost:4000");

// eslint-disable-next-line import/first
import { format } from 'date-fns';


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [close, setClose] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [closeMap, setCloseMap] = useState(false);
    const [closeConfig, setCloseConfig] = useState(false);
    const [spots, setSpots] = useState([]);
    const [myCart, setMyCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);
    const [myProduct, setMyProduct] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [addres, setAddres] = useState([]);
    const [addres_, setAddres_] = useState([]);
    const [showUser, setShowUser] = useState(false);
    const [spots_, setSpots_] = useState([]);
    const [showEditUser, setShowEditUser] = useState(false);
    const [key_, setKey_] = useState(null);
    const [loadPloads, setLoadPloads] = useState(false);
    const [imagePerfil, setImagePerfil] = useState([]);
    const [search, setSearch] = useState(null);
    const [groupPicker, setGroupPicker] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [recordsDate, setRecordsDate] = useState([]);
    const [dateNow, setDateNow] = useState(new Date());
    const [showLoading, setShowLoading] = useState(false);
    const [usersSize, setUsersSize] = useState(0);
    const [modalRescues, setModalRescues] = useState(false);
    const [myRescues, setMyRescues] = useState([]);
    const [myRescues_, setMyRescues_] = useState([]);
    const [limited, setLimited] = useState();
    const [show, setShow] = useState(false);

    // socket.on('connect', ()=>{

    // })
    // socket.on('rows', (rows)=>console.log(rows))

    useEffect(() => {
        async function loadingStorage() {
            const storageUser = await localStorage.getItem('Auth_user');
            const storageAddres = await localStorage.getItem('addres');
            const storageSpots = await localStorage.getItem('spots');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setCloseMap(JSON.parse(storageAddres));
                setSpots_(JSON.parse(storageSpots));
            }
        }
        loadingStorage()
    }, []);



    useEffect(() => {
        socket.on('authAll', (data) => {
            setUsers(data);
            setUsersSize(data.length)
        });
    }, [user, usersSize]);

    useEffect(() => {
        async function run() {
            if (users) {
                let filter = users.filter(person => person.id === user.id);
                filter.forEach(element => {
                    setListUsers(element)

                });

                // socket.on('locationAll', (data) => {
                //     let filter = data.filter(person => person.id === user.id);
                //     filter.forEach(element => {
                //        
                //         console.log(element)
                //     });
                // });

                await api.get('/location')
                    .then(res => {
                        let filter = res.data.filter(person => person.id === user.id);
                        filter.forEach(person => {
                            setAddres_(person)
                            setCloseMap(!!person)
                        });
                    })

                socket.on('rescuesAll', (data) => {
                    let filter = data.filter(person => person.id_user === user.id);
                    setMyRescues(filter)
                });
            };
        }
        run()
    }, [user, users]);


    //Cadastrar usuario
    async function signUp(resData) {
        // setLoading(true);
        const phonePerson = '+' + resData.phone;
        await api.post('/signUp', {
            phone: phonePerson,
            password: resData.password,
            name: resData.name,
            account: resData.account,
            status: true,
            admin: false,
            date: new Date(),
            pt: 0,
            kg: 0
        }).then(res => {
            console.log(res)
            if (res.status === 201) {
                if (window.confirm('Telefone cadastrado, Tente outro ou Clicar em botão OK para acessa-la')) {
                    res.data.forEach(person => {
                        setUser(person);
                        storageUser({
                            account: person.account ? true : false,
                            admin: person.admin ? true : false,
                            date: person.date,
                            id: person.id,
                            name: person.name,
                            phone: person.phone,
                            status: person.status ? true : false,
                            pt: person.pt,
                            kg: person.kg
                        });
                        window.location.replace('/');
                    })
                }
            } else {
              
                res.data.forEach(person => {
                    console.log(person)
                    setUser(person);
                    storageUser({
                        account: person.account ? true : false,
                        admin: person.admin ? true : false,
                        date: new Date(),
                        id: person.id,
                        name: person.name,
                        phone: person.phone,
                        status: person.status ? true : false,
                        pt: person.pt,
                        kg: person.kg
                    });

                    window.location.replace('/');
                });

            }
        })
    };

    async function signIn(phone, password) {
        const phonePerson = '+' + phone;
        await api.post('/signIn', {
            phone: phonePerson,
            password: password,
        }).then(res => {
            res.data.forEach(person => {
                setUser(person);
                storageUser({
                    account: person.account ? true : false,
                    admin: person.admin ? true : false,
                    date: person.date,
                    id: person.id,
                    name: person.name,
                    phone: person.phone,
                    status: person.status ? true : false,
                    pt: person.pt,
                    kg: person.kg
                });
            });
            runSpots()
        }).catch(err => {
            alert('Usuário ou senha incorrentos!')
        });
    };

    async function runSpots() {
        await api.get('/spots')
            .then(res => {
                let soma = 0;
                res.data.forEach(person => {
                    let kg = parseInt(person.kg)
                    soma += kg
                });
                localStorage.setItem('spots', JSON.stringify({ kg: soma }));
            })
    };

    function storageUser(data) {
        localStorage.setItem('Auth_user', JSON.stringify(data));
    };

    async function addAddres(data) {
        // setLoading(true);
        await api.post('/location', {
            id: user && user.id,
            name: user && user.name,
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: data.latitudeDelta,
            longitudeDelta: data.longitudeDelta,
            city: data.city,
            country: data.country,
            district: data.district,
            num: data.num,
            road: data.road,
            state: data.state
        }).then(res => {
            // console.log(res)
            setCloseMap(true);
            window.location.reload();
        })

        // setAddres(oldArray => [...oldArray, data])
        // alert('Endereço cadastrado com sucesso!')
        // setLoading(false);
        // setCloseMap(false);
        // localStorage.setItem('addres', false);

    };

    async function funcLocation(id) {
        await api.get('/location')
            .then(res => {
                const locat = res.data.filter(person => person.id == id);
                locat.forEach(value => {
                    setAddres(value);
                });
            })
    };

    async function Rescues(data) {
        await api.post('/rescues', {
            id: data.id,
            id_user: data.id_user,
            image: data.image,
            name: data.name,
            title: data.title,
            price: data.price,
            qtd: data.qtd,
            delivered: data.delivered,
            order: data.order,
            date: data.date
        }).then(res => {
            // window.location.reload();
        })
    };

    async function deletRescues(data) {
        setShowLoading(true);
        await firebase
            .firestore()
            .collection('Rescues')
            .doc(data)
            .delete()
            .then((res) => {
                setShowLoading(false);
            });
    }

    async function cart(data) {
        await api.post('/cart', {
            id_cart: data.id_cart,
            image: data.image.uri,
            title: data.title,
            price: data.price,
            qtd: data.qtd
        }).then(res => {
            window.location.reload();
        })
        // setLoading(false);
    };

    useEffect(() => {
        socket.on('cartAll', (data) => {
            if (user) {
                const cartGet = data.filter(person => person.id_cart == user.id);
                setCartSize(cartGet.length)
                setMyCart([]);
                cartGet.forEach(value => {
                    setMyCart(oldArray => [...oldArray, value]);
                });
            }
        });
    }, [user]);

    async function deleteCart(data) {
        await api.delete(`/deleteCart/${data}`)
            .then((response) => {
                window.location.reload();
            })
    };

    async function deleteCartAll(data) {
        await api.delete(`/deleteCartAll/${data}`)
            .then((response) => {
                // alert('Alterado com sucesso!');
                window.location.reload();
                // setShowLoading(false);
                // setCartSize(0);
                // setClose(false);
            })
    };

    async function deleteAllUsers(id) {
        await api.delete(`/deleteAll/${id}`)
            .then((response) => {
                alert('Alterado com sucesso!');
                window.location.reload();
            })
    };

    async function records(data) {
        await api.post('/records', {
            id_user: data.id_user,
            type: data.type,
            price: data.price,
            date: dateNow
        }).then(res => {
            // window.location.reload();
        })
    };

    // useEffect(() => {
    //     async function get() {
    //         await firebase.firestore()
    //             .collection('Records')
    //             .doc(user.uid)
    //             .collection('records')
    //             .where('date', '==', format(dateNow, 'dd-MM-yyyy'))
    //             .onSnapshot(querySnapshot => {
    //                 setRecordsDate([]);
    //                 querySnapshot.forEach(documentSnapshot => {
    //                     let data = {
    //                         key: documentSnapshot.id,
    //                         price: documentSnapshot.data().price,
    //                         title: documentSnapshot.data().title,
    //                         type: documentSnapshot.data().type,
    //                     };
    //                     setRecordsDate(oldArray => [...oldArray, data]);
    //                 });
    //             });
    //     };
    //     get();
    // }, [dateNow, user]);


    useEffect(() => {
        async function getProduct() {
            await firebase.firestore()
                .collection('Product')
                // .limit(6)
                .get()
                .then(querySnapshot => {
                    setMyProduct([]);
                    querySnapshot.forEach(documentSnapshot => {
                        let data = {
                            key: documentSnapshot.id,
                            price: documentSnapshot.data().price,
                            freight: documentSnapshot.data().freight,
                            title: documentSnapshot.data().title,
                            image: documentSnapshot.data().image,
                        };
                        setMyProduct(oldArray => [...oldArray, data]);
                    });
                });
        };
        getProduct();
    }, [usersSize]);

    async function delProduct(data) {
        await firebase
            .firestore()
            .collection('Product')
            .doc(data)
            .delete()
            .then((res) => {
                alert('Produto Deletado com sucesso!')
            });
    };

    async function updateProduct(data) {
        setLoadPloads(true);
        await firebase
            .firestore()
            .collection('Product')
            .doc(data.key)
            .update({
                title: data.title,
                price: data.price,
            }).then((res) => {
                setLoadPloads(false);
                alert("Alteração realizado com sucesso!");
            })
    };

    async function updateUsers(data) {
        await api.post('/auth', {
            id: data.id,
            name: data.name,
            phone: data.phone,
            account: data.account,
            status: data.status,
            admin: data.admin
        }).then(res => {
            alert('Atualizado com sucesso!')
        })
    };

    async function updateLocation(data) {
        await api.post('/location', {
            id: data.id,
            city: data.city,
            road: data.road,
            district: data.district,
            num: data.num,
            state: data.state
        }).then(res => {
            alert('Atualizado com sucesso!')
            setLoading(false);
        })

    };

    async function updateSpots(data) {
        await api.post('/spots', {
            id: data.id,
            pt: data.pt,
            kg: data.kg
        }).then(async res => {
            setLoading(false);
            let filter = await users.filter(person => person.id == data.id);
            await filter.forEach(element => {
                storageUser({
                    account: element.account ? true : false,
                    admin: element.admin ? true : false,
                    date: element.date,
                    id: element.id,
                    name: element.name,
                    phone: element.phone,
                    status: element.status ? true : false,
                    pt: data.pt,
                    kg: element.kg
                })
            });
        })

    };

    async function updateRescues(data) {
        setShowLoading(true);
        await firebase
            .firestore()
            .collection('Rescues')
            .doc(data.key)
            .update({
                order: true,
            }).then(() => {
                setShowLoading(false);
            });
    };

    async function uploadImage(data) {
        setLoadPloads(true);
        const ref = firebase
            .storage()
            .ref('product/')
            .child(data.title)
        ref.put(data.image,
            {
                contentType: 'image/jpeg'
            }
        ).then(async () => {

            const urlGet = await firebase
                .storage()
                .ref()
                .child(`product/${data.title}`);
            urlGet.getDownloadURL().then(async (url) => {
                await firebase
                    .firestore()
                    .collection('Product')
                    .doc()
                    .set({
                        title: data.title,
                        price: data.price,
                        image: {
                            uri: url,
                        },
                        freight: 'Entregar na próxima coleta'
                    }).then((res) => {
                        alert("Produto Cadastrado!");
                        setLoadPloads(false);
                    })
            })
        })

    };

    async function signOut() {
        // await firebase.auth().signOut();
        await localStorage.clear();
        setUser(null);
        window.location.reload();

    };
    // signOut() 


    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            newName,
            newPass,
            loading,
            phoneNumber,
            newAccount,
            err,
            close,
            modalShow,
            closeMap,
            closeConfig,
            spots,
            myCart,
            myProduct,
            cartSize,
            listUsers,
            users,
            addres,
            addres_,
            showUser,
            spots_,
            showEditUser,
            key_,
            loadPloads,
            imagePerfil,
            search,
            groupPicker,
            selectedGroup,
            recordsDate,
            dateNow,
            showLoading,
            usersSize,
            modalRescues,
            myRescues,
            limited,
            myRescues_,
            show,
            signIn,
            signUp,
            setPhoneNumber,
            signOut,
            setNewName,
            setNewPass,
            setNewAccount,
            setErr,
            setModalShow,
            setClose,
            setCloseMap,
            addAddres,
            setCloseConfig,
            setSpots,
            cart,
            setMyCart,
            deleteCart,
            deleteCartAll,
            updateUsers,
            updateLocation,
            updateSpots,
            setShowUser,
            setKey_,
            setShowEditUser,
            uploadImage,
            delProduct,
            setImagePerfil,
            setSearch,
            setGroupPicker,
            setSelectedGroup,
            records,
            setDateNow,
            Rescues,
            setModalRescues,
            setLimited,
            updateRescues,
            updateProduct,
            deletRescues,
            setShow,
            funcLocation,
            deleteAllUsers,
        }}>
            {children}

        </AuthContext.Provider>
    );
}
