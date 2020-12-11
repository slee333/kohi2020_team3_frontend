import React, { useState, Component } from "react";
import Select from 'react-select';
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Button from "../Components/Button";
import FatText from "../Components/FatText";
import axios from 'axios';

// Wrapper: Place everything at center
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  margin: 0 auto;
  width: 80%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 40px;
`;

const Body = styled.div`
    align-items: center;
    width: 80%;
`;
const Column = styled.div`
`;

const MiniRow = styled.div`
    margin: 0 auto;
    margin-bottom: 10px;
    text-algin: left;
    display: flex;
`;

const Select_cat = styled(Select)`
    width: 60%;
`;

const MainPage = () => {

    const sexOptions = [
        { value: 0, label: 'Male' },
        { value: 1, label: 'Female' }
    ];

    const emopOptions = [
        { value: 0, label: 'Not emergency' },
        { value: 1, label: 'Emergency' }
    ]

    const asaOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ]

    const [age, setAge] = useState(40);
    const [asa, setAsa] = useState(1);
    const [sex, setSex] = useState(0);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(55);
    const [emop, setEmop] = useState(0);
    const [hb, setHb] = useState(15);
    const [wbc, setWbc] = useState(8);
    const [plt, setPlt] = useState(300);
    const [glu, setGlu] = useState(85);
    const [na, setNa] = useState(140);
    const [k, setK] = useState(4);
    const [alb, setAlb] = useState(4.5);
    const [pt, setPt] = useState(1);
    const [ptt, setPtt] = useState(30);
    const [gpt, setGpt] = useState(20);
    const [got, setGot] = useState(20);
    const [bun, setBun] = useState(14);
    const [cr, setCr] = useState(1);
    const [modelname, setModelname] = useState('DNN');
    const [mode, setMode] = useState('death30');

    const submit = () => {
        axios.post('http://localhost:4000/submit', {
            age: age, asa: asa, sex: sex, bmi: (weight / (Math.pow(height / 100, 2))), emop: emop,
            preop_hb: hb, preop_wbc: wbc, preop_plt: plt, preop_glu: glu,
            preop_na: na, preop_k: k, preop_alb: alb, preop_pt: pt, preop_ptt: ptt,
            preop_gpt: gpt, preop_got: got, preop_bun: bun, preop_cr: cr,
            modelname: modelname, mode: mode
        }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <Wrapper>
            <Helmet>
                <title>Web Calculator | Some Score</title>
            </Helmet>
            <Header>
                <div> Web Calculator </div>
                <div> 30D mortality </div>
                <div> Prolonged ICU stay </div>
            </Header>
            <Body>
                <Row>
                    <div>Simple DNN</div>
                    <div>ASA-adjusted</div>
                    <div>Self-Attention</div>
                </Row>
                <Row>
                    <Column>
                        <FatText text="Model Pic goes here" />
                    </Column>
                    <Column>

                        <MiniRow>
                            <FatText text={'Age'} className='Age' />
                            <input
                                onChange={e => setAge(e.target.value)}
                                placeholder={age}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Sex'} className='Sex' />
                            <Select_cat
                                options={sexOptions}
                                onChange={e => setSex(e.value)}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Height (m)'} className='Height' />
                            <input
                                onChange={e => setHeight(e.target.value)}
                                placeholder={height}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Weight (kg)'} className='Weight' />
                            <input
                                onChange={e => setWeight(e.target.value)}
                                placeholder={weight}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Hb'} className='Hb' />
                            <input
                                onChange={e => setHb(e.target.value)}
                                placeholder={hb}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'WBC'} className='WBC' />
                            <input
                                onChange={e => setWbc(e.target.value)}
                                placeholder={wbc}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Plt'} className='Plt' />
                            <input
                                onChange={e => setPlt(e.target.value)}
                                placeholder={plt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Glucose'} className='Glc' />
                            <input
                                onChange={e => setGlu(e.target.value)}
                                placeholder={glu}
                                type='number'
                            />
                        </MiniRow>
                    </Column>
                    <Column>
                        <MiniRow>
                            <FatText text={'ASA'} className='ASA' />
                            <Select_cat
                                options={asaOptions}
                                onChange={e => setAsa(e.value)}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'EM OP'} />
                            <Select_cat
                                options={emopOptions}
                                onChange={e => setEmop(e.value)}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Na'} className='Na' />
                            <input
                                onChange={e => setNa(e.target.value)}
                                placeholder={na}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'K'} className='K' />
                            <input
                                onChange={e => setK(e.target.value)}
                                placeholder={k}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Albumin'} className='Alb' />
                            <input
                                onChange={e => setAlb(e.target.value)}
                                placeholder={alb}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'PT (INR)'} className='PT' />
                            <input
                                onChange={e => setPt(e.target.value)}
                                placeholder={pt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'aPTT'} className='PTT' />
                            <input
                                onChange={e => setPtt(e.target.value)}
                                placeholder={ptt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'ALT (GPT)'} className='GPT' />
                            <input
                                onChange={e => setGpt(e.target.value)}
                                placeholder={gpt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'AST (GOT)'} className='GOT' />
                            <input
                                onChange={e => setGot(e.target.value)}
                                placeholder={got}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'BUN'} className='BUN' />
                            <input
                                onChange={e => setBun(e.target.value)}
                                placeholder={bun}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Creatinine'} className='Cr' />
                            <input
                                onChange={e => setCr(e.target.value)}
                                placeholder={cr}
                                type='number'
                            />
                        </MiniRow>

                    </Column>
                </Row>
                <Row>
                    <Button text={'Submit'} onClick={() => submit()}></Button>
                </Row>

            </Body>
        </Wrapper>
    )

}

export default MainPage