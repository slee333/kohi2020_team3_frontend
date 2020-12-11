import React, { useState } from "react";
import Select from 'react-select';
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Button from "react-bootstrap/Button"; 
import Carousel from "react-bootstrap/Carousel";
import FatText from "../Components/FatText";
import axios from 'axios';

import Model1 from "../Components/DNN.png";
import Model2 from "../Components/asa_adjusted.png";
import Model3 from "../Components/attention.png";
// const pic1 = require("../Components/DNN.png");
// const pic2 = require("../Components/asa_adjusted.png");
// const pic3 = require("../Components/attention.png");


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

const Select_Cat = styled(Select)`
    width: 70%;
`;

const MyCarousel = styled(Carousel)`
    width: 300px;
`
const MyCaption = styled(Carousel.Caption)`
    color: black;
    font-weight: bold;
`

const Title = styled.h1`
    font-size: 48px;
    font-weight: bold;
    width: 100%
`

const MyInput = styled.input`
    border: 0;
    border: ${props => props.theme.boxBorder};
    border-radius: ${props => props.theme.borderRadius};
    background-color: white;
    height: 35px;
    font-size: 12px;
    padding: 0px 15px;
`

const MyButton = styled(Button)`
    width: 100px;
`



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

    const modeOptions = [
        { value: 'death30', label: '30-day in-hospital mortality' },
        { value: 'icu1', label: 'Prolonged ICU Stay' }
    ];

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

    const [softmax, setSoftmax] = useState(0);
    const [output, setOutput] = useState(0);

    const [isloading, setIsloading] = useState(0);

    const model_list = ['DNN', 'ASADNN', 'ATTENTION'];



    const submit = () => {
        setIsloading(1)
        console.log(isloading)
        axios.post('http://localhost:4000/submit', {
            age: age, asa: asa, sex: sex, bmi: (weight / (Math.pow(height / 100, 2))), emop: emop,
            preop_hb: hb, preop_wbc: wbc, preop_plt: plt, preop_glu: glu,
            preop_na: na, preop_k: k, preop_alb: alb, preop_pt: pt, preop_ptt: ptt,
            preop_gpt: gpt, preop_got: got, preop_bun: bun, preop_cr: cr,
            modelname: modelname, mode: mode
        }
        ).then((response) => {
            const data = JSON.parse(response.data[0].replaceAll("'", '"'));
            setOutput(data.output_class);
            setSoftmax(data.output_softmax);
            setIsloading(0);

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
                <Title> Web Calculator </Title>
                <FatText text={'What to predict?'} />
                <Select_Cat
                    options={modeOptions}
                    onChange={e => setMode(e.value)}
                    placeholder={'30-day in-hospital mortality'}
                />

            </Header>
            <Body>

                <Row>
                    <Column>
                        <MyCarousel interval={null} onSelect={e => setModelname(model_list[e])} >
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Model1}
                                    alt="First slide"
                                />
                                <MyCaption>
                                    <h3>Simple DNN</h3>
                                </MyCaption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Model2}
                                    alt="Second slide"
                                />
                                <MyCaption>
                                    <h3>ASA-adjusted DNN</h3>
                                </MyCaption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Model3}
                                    alt="Third slide"
                                />

                                <MyCaption>
                                    <h3>Self-attention Model</h3>
                                </MyCaption>
                            </Carousel.Item>
                        </MyCarousel>
                    </Column>
                    <Column>

                        <MiniRow>
                            <FatText text={'Age'} className='Age' />
                            <MyInput
                                onChange={e => setAge(e.target.value)}
                                placeholder={age}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Sex'} className='Sex' />
                            <Select_Cat
                                options={sexOptions}
                                onChange={e => setSex(e.value)}
                                placeholder={'Male'}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'EM OP'} />
                            <Select_Cat
                                options={emopOptions}
                                onChange={e => setEmop(e.value)}
                                placeholder={'Not emergency'}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Height (m)'} className='Height' />
                            <MyInput
                                onChange={e => setHeight(e.target.value)}
                                placeholder={height}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Weight (kg)'} className='Weight' />
                            <MyInput
                                onChange={e => setWeight(e.target.value)}
                                placeholder={weight}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Hb'} className='Hb' />
                            <MyInput
                                onChange={e => setHb(e.target.value)}
                                placeholder={hb}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'WBC'} className='WBC' />
                            <MyInput
                                onChange={e => setWbc(e.target.value)}
                                placeholder={wbc}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Plt'} className='Plt' />
                            <MyInput
                                onChange={e => setPlt(e.target.value)}
                                placeholder={plt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Glucose'} className='Glc' />
                            <MyInput
                                onChange={e => setGlu(e.target.value)}
                                placeholder={glu}
                                type='number'
                            />
                        </MiniRow>
                    </Column>
                    <Column>
                        <MiniRow>
                            <FatText text={'ASA'} className='ASA' />
                            <Select_Cat
                                options={asaOptions}
                                onChange={e => setAsa(e.value)}
                                placeholder={'1'}
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Na'} className='Na' />
                            <MyInput
                                onChange={e => setNa(e.target.value)}
                                placeholder={na}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'K'} className='K' />
                            <MyInput
                                onChange={e => setK(e.target.value)}
                                placeholder={k}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Albumin'} className='Alb' />
                            <MyInput
                                onChange={e => setAlb(e.target.value)}
                                placeholder={alb}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'PT (INR)'} className='PT' />
                            <MyInput
                                onChange={e => setPt(e.target.value)}
                                placeholder={pt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'aPTT'} className='PTT' />
                            <MyInput
                                onChange={e => setPtt(e.target.value)}
                                placeholder={ptt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'ALT (GPT)'} className='GPT' />
                            <MyInput
                                onChange={e => setGpt(e.target.value)}
                                placeholder={gpt}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'AST (GOT)'} className='GOT' />
                            <MyInput
                                onChange={e => setGot(e.target.value)}
                                placeholder={got}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'BUN'} className='BUN' />
                            <MyInput
                                onChange={e => setBun(e.target.value)}
                                placeholder={bun}
                                type='number'
                            />
                        </MiniRow>
                        <MiniRow>
                            <FatText text={'Creatinine'} className='Cr' />
                            <MyInput
                                onChange={e => setCr(e.target.value)}
                                placeholder={cr}
                                type='number'
                            />
                        </MiniRow>

                    </Column>
                </Row>
                <Row>
                    <Column>
                        <FatText text={'Softmax: ' + String(softmax)} />
                    </Column>
                    <Column>
                        <FatText text={'Output Class: ' + String(output)} />
                    </Column>
                    <Column>
                        <MyButton variant="outline-primary" disabled={isloading} text={'Submit!'} onClick={() => {
                            submit()
                        }}>Submit</MyButton>

                    </Column>
                </Row>

            </Body>

        </Wrapper>
    )

}

export default MainPage