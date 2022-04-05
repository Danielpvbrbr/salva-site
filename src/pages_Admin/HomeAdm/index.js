import React, { useContext } from "react";
import './index.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import Header from '../../componets/Header';


export default function HomeAdm({ AuthContext, Link }) {
    const { usersSize, spots_ } = useContext(AuthContext);


    return (
        <div id="HomeAdm">
            <Header rota='/' AuthContext={AuthContext} Link={Link} />

            <div id="body">
                <div id="containGraphic" >
                    <div id="titleGraphic">
                        <h3>Análise Total</h3>
                    </div>
                    <div id="graphic">
                        <section className="progressbar">
                            <p id="textCicleKg">Kg</p>
                            <CircularProgressbar
                                value={spots_.kg / 100}
                                maxValue={1}
                                text={spots_.kg}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '14px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 31, 164, 78, ${spots_.kg / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#32641B',
                                })}
                            />

                        </section>

                        <section className="progressbar">
                            <p id="textCiclePt">Users</p>
                            <CircularProgressbar
                                value={usersSize / 100}
                                maxValue={1}
                                text={usersSize}
                                counterClockwise={false}
                                strokeWidth={19}
                                styles={buildStyles({
                                    rotation: 0.15,
                                    strokeLinecap: 'round',
                                    textSize: '14px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba( 223, 68, 40, ${usersSize / 100})`,
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#DF4428',
                                })}
                            />

                        </section>
                    </div>

                </div>

                {/* <div id="containHistoric" >
                    <div id="titleHitoric">
                        <h3>Análise Geral</h3>
                    </div>
                
                    {recordsDate.map((v, i) =>
                        <ul id="areaList">
                            {v.type === 'rescue' ?
                                <li Style="background-color: #DF4428">
                                    <section id="textList">
                                        <FiChevronDown className="iconList" />
                                        <p>Resgate de pontos</p>
                                    </section>

                                    <section id="numList">
                                        <p>{`-${v.price}pts`}</p>
                                    </section>
                                </li>
                                :
                                <li Style="background-color: #32641B">
                                    <section id="textList">
                                        <FiChevronUp className="iconList" />
                                        <p>Coletado 3,5kg de resíduos</p>
                                    </section>

                                    <section id="numList">
                                        <p>+12.5pts</p>
                                    </section>
                                </li>
                            }
                        </ul>
                    )} 
                </div> */}
            </div>
        </div>
    )


} 