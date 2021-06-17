import {useState, useEffect} from 'react'
import { useParams } from "react-router"
import { GetCandlesticks, GetMarket, GetTicker } from "../Services/MarketsServices"
import { GetUserOperations, AddOperation, DeleteOperation } from "../Services/OperationsServices"
import { GetUserData } from "../Services/AuthServices"

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official'

import styled from 'styled-components'
import useInterval from '../useInterval'

import USDT from '../Assets/Img/usdt.png'
import { AccountBalanceWallet, Info } from '@material-ui/icons';

const TradingSection = styled.section`
    display: grid;
    grid-template-areas: 
        "market-details market-ops"
        "user-ops market-ops";
    grid-template-columns: 70% 30%;
    background-color: #14151A;
    min-height: 100vh;
    @media (max-width: 992px) {
        display: flex;
        flex-direction: column;
        > *:not(:first-child) {
            margin-top: 20px;
        }
    }
`

const MarketDetails = styled.div`
    grid-area: market-details;
    display: flex;
    flex-direction: column;
    min-height: 800px;
    max-height: 800px;
    @media(max-width: 992px){
        min-height: auto;
        max-height: 80%;
    }
`

const MarketOps = styled.div `
    grid-area: market-ops;
    display: flex;
    flex-direction: column;
    background-color: #1E1F25;
    color: whitesmoke; 

    @media (max-width: 992px){
        height: 0;
        transform: scaleY(0);
        transition: all ease .3s;
        transform-origin: top;
        &.active {
            height: auto;
            transform: scaleY(1);
            transition: all ease .3s;
        }
    }
`

const Title = styled.div`
    background-color: #1E1F25;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;
    max-width: 100%;
    > h1 {
        color: whitesmoke;
        &.up-market {
            color: #0ECB81
        }
        &.down-market {
            color: #CF304A
        }
    }
    img {
        height: 3rem;
        width: auto;
    }
    > h2 {
        font-size: 0.9rem;
    }
    > h2.up-market {
        color: #0ECB81
    }
    > h2.down-market {
        color: #CF304A
    }
    > h2.equal-market {
        color: whitesmoke
    }
    > *:not(:first-child){
        margin-left: 10px;
    }

    @media(max-width: 640px){
        & h1{
            font-size: 1.5rem;
        }
    }
    
`

const IntervalButtons = styled.div `
    display: flex;
    background-color: #1E1F25;
    align-items: center;
    text-align: center;
    color: whitesmoke;
    > span{
        font-family: arial;
        font-size: 1rem;
        padding: 10px;
    }
    > button {
        margin: 5px;
        padding: 10px;
        background-color: #1E1F25;
        border: none;
        border-radius: 5px;
        color: whitesmoke;
        font-size: 1rem;
        &.active{
            background-color: #5B5E6F;
            border-bottom: 5px solid #FAA980
        }
    }
`

const MakeOpsButton = styled.div`
    display: none;
    @media(max-width: 992px){
        display: flex;
        justify-content: center
    }
    button {
        width: 80%;
        padding: 10px; 
        border: none;
        outline: none;
        border-radius: 10px;   
        color: whitesmoke;
        background-color: #E76828;
        font-size: 1rem;
        font-weigth: bold;
    }
`

const OpTypeButtons = styled.div `
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    > button {
        flex: 1;
        padding: 10px;
        background-color: #1E1F25;
        border: none;
        color: whitesmoke;
        font-size: 1rem;
        &.active{
            background-color: #5B5E6F;
            border-bottom: 5px solid #FAA980
        }
    }    
`

const InfoDiv = styled.div `
    display: flex;
    flex-direction: column;
    color: whitesmoke;
    padding-left: 20px;
    img {
        height: 1rem;
        width: auto;
    }
    > * {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        > *:not(:first-child){
            margin-left: 5px;
        }
    }
    > *:last-child{
        margin-bottom: 10px;
    }
`

const BuySellButtons = styled.div `
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin: 10px 0;
    > button {
        flex: 1;
        padding: 10px;
        margin: 0 5px;
        color: whitesmoke;
        border: none;
        border-radius: 10px;
        outline: none;

        &.buy-button{
            background-color: #0ECB81;
            &:hover{
                background-color: #0DB674;
            }
        }
        &.sell-button{
            background-color: #CF304A;
            &:hover{
                background-color: #D01735;
            }
        }
    }
`

const Input = styled.input`
    padding: 10px 60px;
    background-image: url(${USDT});
    background-color: #1E1F25;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 10px 50%;
    background-clip: padding-box;
    background-origin: padding-box;


    outline: none;
    border: 1px solid #5B5E6F;
    border-radius: 10px;
    margin: 20px;

    color: whitesmoke;
    font-size: 1rem;

    &.d-none{
        display: none
    }
`

const AssetButtons = styled.div`
    margin-top: 10px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
    > button{
        padding: 5px 10px;
        border: 1px solid #faa980;
        outline: none;
        background-color: rgba(0,0,0,0);
        color: whitesmoke;
        font-weight: bold;
        display: flex;
        align-items: center;
        &.active{
            background-color: #faa980;
        }
        > *:first-child {
            margin-right: 5px;
        }
        img{
            height: 1.3rem;
            width: auto;
        }
    }
`

const LeverageButtons = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    button.updown {
        background-color: rgba(0,0,0,0);
        color: whitesmoke;
        border: 1px solid #faa980;
        height: 48px;
        width: 48px;
        font-size: 1rem;
        font-weight: bold;
        &:hover{
            background-color: #faa980;
        }
    }

    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        font-size: 1.3rem;
        height: 46px;
        border: 1px solid #faa980;
        color: whitesmoke;
        min-width: 30%;
        text-align: center;
    }

`

const UserOperations = styled.div`
    color: whitesmoke;
    display: flex;
    flex-direction: column;
    & div {
        display: flex;
        flex-direction: row;
        align-items: center;
        & *:not(:first-child) {
            margin-left: 20px;
        }
        & .align-right{
            margin-left: auto;
        }
    }
    & div.details{
        flex-direction: column;
        align-items: flex-start;
        
        & > div {
            width: 100%;
        }
    }
    & img {
        width: 50px;
    }
    & > div {
        margin-top: 10px;
    }
    & .long, .short {
        font-weight: bold;
        font-size: 1.5rem;
        padding: 10px;
        border-radius: 5px;    
    }
    & .winner{
        min-width: 12rem;
        color: #0ECB81;
    }
    & .looser{
        min-width: 12rem;
        color: #CF304A;
    }
    & .equals {
        min-width: 12rem;
    }
    & .long {
        background-color: #0ECB81;
    }

    & .short {
        background-color: #CF304A;
    }

    & .leverage{
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid #faa980;
    }
    & .d-lg-none{
        display: none;
    }

    & button{
        outline: none;
        border: 1px solid #faa980;
        border-radius: 0;
        padding: 10px;
        background-color: rgba(0,0,0,0);
        color: #faa980;
        transition: all ease .3s;
        height: 2.5rem;
        font-size: 1rem;
        justify-self: flex-end;
        margin-right: 20px;
        &:hover{
            background-color: #faa980;
            color:whitesmoke;
        }
    }

    & .details .op-data{
        display: block;
        height: 0;
        transform-origin: top;
        transform: scaleY(0);
        list-style: none;
        text-align: left;
        margin-left: 0;
        padding: 10px 0; 
        width: 100%;
        transition: all ease .3s;
        & li {
            margin-left: 0;
            margin-top: 5px;
            padding-left: 10px;
        }
    }

    & .details.active .op-data{
        height: auto;
        transform: scaleY(1);
    }

    @media(max-width: 992px){
        & img {
            width: 35px;
        }
        & div {
            & *{
                margin-left: 5px;
            }
        }
        & .d-sm-none {
            display: none;
        }
        & .d-lg-none{
            display: flex;
        }
        & .winner, .looser{
            min-width: 0
        }
    }
    
`


export default function Trading(){
    const { market } = useParams();
    const baseMarket = market.split("USDT")[0]
    const [marketIcon, setMarketIcon] = useState("")

    const [actualPrice, setActualPrice] = useState(0);
    const [priceUp, setPriceUp] = useState(0);
    const [klines, setKlines] = useState([]);
    const [interval, setActualInterval] = useState("15m");

    const [makeOpsActive, setMakeOpsActive] = useState(false);
    const [leverage, setLeverage] = useState(10)
    const [opType, setOpType] = useState("Limit")
    const [useUSDT, setUseUSDT] = useState(true)

    const [limitPrice, setLimitPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [weight, setWeight] = useState("")
    
    const [ticker, setTicker] = useState({})
    const [userOperationsResume, setUserOperationsResume] = useState([])
    const [wallet, setWallet] = useState(0)

    const intervals = { //ms for every step in klines
        "15m": 900000,
        "1h": 3600000,
        "4h": 14400000
    }

    const options = {
        global: {
            timezoneOffset: new Date().getTimezoneOffset()
        },
        scrollbar: {
            enabled: false
        },
        rangeSelector: {
            enabled: false
        },
        chart: {
            backgroundColor: "#191b20",  
        },
        title: {
            text: market,
            style: {
                color: "#fafafa"
            }
        },
        series: [{
            name: market,
            type: "candlestick",
            data: klines
        }],
        plotOptions: {
            candlestick: {
                color: '#cf304a',
                lineColor: '#cf304a',
                upColor: '#0ecb81',
                upLineColor: '#0ecb81'
            }
        },
        yAxis:{
            gridLineWidth: 0.5,
            lineWidth:2,
            crosshair: false,
            title:{
                enabled: false,
            },
            opposite: true
        },
        xAxis: {
            minRange: intervals[interval] * 15,
            maxRange: intervals[interval] * 30,
            range: intervals[interval] * 30
        },
        credits: {
            enabled: false
        }
    }
    useEffect(() => {
        getUserData();
    }, [])
    useEffect(() => {
        GetMarket(market).then(res => {
            setMarketIcon(res.data.icon)
        })
        GetCandlesticks(market, interval).then(res => {
            var data = []
            res.data.reverse()
            res.data.map((dat) => {
                data.push([new Date(dat.open_time).getTime(), parseFloat(dat.open), parseFloat(dat.high), parseFloat(dat.low), parseFloat(dat.close)])
                return null
            })
            setActualPrice(data[data.length - 1][4])
            setKlines(data)
        })}, [interval, market])

    useInterval(() => {
        GetCandlesticks(market, interval).then(res => {
            var dataDict = {}
            var newData = []
            //Cogemos los valores que ya teníamos
            klines.map(kline => {
                dataDict[kline[0]] = [kline[1],kline[2],kline[3],kline[4]]
                return null
            })
            //Actualizamos el último
            dataDict[new Date(res.data[0].open_time).getTime()] = [parseFloat(res.data[0].open), parseFloat(res.data[0].high), parseFloat(res.data[0].low), parseFloat(res.data[0].close)]
            for(var key in dataDict){
                newData.push([parseFloat(key), dataDict[key][0], dataDict[key][1], dataDict[key][2], dataDict[key][3]])
            }
            setActualPrice(lastPrice => {
                if(lastPrice > res.data[0].close){
                    setPriceUp(-1)
                }else if(lastPrice === res.data[0].close){
                    setPriceUp(0)
                }else{
                    setPriceUp(1)
                }
                return res.data[0].close
            })
            setKlines(newData)
        })

        GetTicker().then(res => {
            res.data.map(dat => {
                ticker[dat.market.name] = {
                    last_price: dat.last_price,
                    price_change: dat.price_change
                }
            })
            if(useUSDT){
                setWeight(quantity*leverage/ticker[market].last_price);
            }else{
                setQuantity(weight*ticker[market].last_price/leverage)
            }
        })
    }, 2000)

    const handleLeverage = (value) => {
        if(parseInt(value) + leverage < 1){
            setLeverage(1)
        }else if(parseInt(value) + leverage > 100){
            setLeverage(100)
        }else {
            setLeverage(parseInt(value) + leverage)
        }
    }

    const handleQuantityWeightChange = (e) => {
        e.preventDefault();
        if(!/^[0-9]*\.?[0-9]*$/.test(e.target.value)) return;
        if(useUSDT){
            if(isNaN(parseFloat(e.target.value)) || !ticker.hasOwnProperty(market)){
                setQuantity(0);
                setWeight(0)
            }else{
                setQuantity(e.target.value)
                setWeight(quantity*leverage/ticker[market].last_price);
            }
        }else{
            if(isNaN(parseFloat(e.target.value)) || !ticker.hasOwnProperty(market)){
                setQuantity(0);
                setWeight(0)
            }else{
                setWeight(e.target.value)
                setQuantity(weight*ticker[market].last_price/leverage)
            }
        }
    }

    const handleLimitChange = (e) => {
        e.preventDefault();
        if(!/^[0-9]*\.?[0-9]*$/.test(e.target.value)) return;
        if(isNaN(parseFloat(e.target.value))){
            setLimitPrice("")
        }else{
            setLimitPrice(e.target.value)
        }
        
    }

    const validateOperation = () => {
        if(isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0){
            return false;
        }else{
            return true;
        }
    }

    const executeOperation = (e) => {
        var isLong;
        if(e.target.innerText === "Comprar"){
            isLong = true;
        }else if(e.target.innerText === "Vender"){
            isLong = false;
        }else{
            return false;
        }
        if(!validateOperation()){
            return false;
        }

        AddOperation(market, isLong, leverage, parseFloat(quantity), limitPrice).then( (res) =>
            getUserData()
        ).catch((a,b,c,d) => {
            console.log("error")
        })
        
    }

    const openOperation = (e) => {
        e.target.parentElement.parentElement.parentElement.classList.toggle("active")
    }

    const closeOperation = (id) => {
        DeleteOperation(id).then(res => {
            getUserData()
        }).catch(err => {
            console.log(err)
        })
        
    }

    function getUserData(){
        GetUserOperations().then(resGet => {
            var data = []
            resGet.data.map(dat => {
                data.push([
                    dat.market.icon,
                    dat.market.name, 
                    dat.is_long, 
                    dat.leverage, 
                    dat.margin, 
                    dat.weight, 
                    dat.entry_price, 
                    dat.liquidation_price,
                    dat.id
                ]);
            })
            setUserOperationsResume(data);
        })
        GetUserData().then((res) => setWallet(parseFloat(res.data.wallet)))
    }

    return(
        <TradingSection>
            <MarketDetails>
                <Title>
                    <img src={marketIcon}/>
                    <h1>{baseMarket}/USDT</h1>
                    <h1 className={
                        priceUp === 1 ? "up-market" : 
                        priceUp === 0 ? "" : "down-market"
                    }>
                        {parseFloat(actualPrice).toLocaleString(
                            undefined, {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            }
                        )}
                    </h1>
                    <h2 className={
                        ticker.hasOwnProperty(market) ? (ticker[market].price_change > 0 ? "up-market" :
                                                        ticker[market].price_change === 0 ? "equal-market" : "down-market")
                        
                        : "equal-market"
                    }>{ticker.hasOwnProperty(market) ? parseFloat(ticker[market].price_change).toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                        minimumFractionDigits: 3
                    }) + "%" : "--.--%"}</h2>
                </Title>
                <IntervalButtons>
                    <span>Intervalo</span>
                    <button 
                        className={interval==="15m" ? "active" : ""}
                        onClick={() => setActualInterval("15m")}
                        >15m</button>
                    <button 
                        className={interval==="1h" ? "active" : ""}
                        onClick={() => setActualInterval("1h")}
                        >1h</button>
                    <button 
                        className={interval==="4h" ? "active" : ""}
                        onClick={() => setActualInterval("4h")}
                        >4h</button>
                </IntervalButtons>
                <HighchartsReact
                    containerProps={{ style: { height: "100%", width: "100%" }}}
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}/>
            </MarketDetails>
            <MakeOpsButton>
                <button onClick={() => setMakeOpsActive(!makeOpsActive)}>Realizar operaciones</button>
            </MakeOpsButton>
            <MarketOps className={makeOpsActive ? "active" : ""}>              
                <OpTypeButtons>
                    <button 
                        className={opType === "Limit" ? "active" : ""}
                        onClick={() => setOpType("Limit")}>
                            Limit
                    </button>
                    <button 
                        className={opType === "Market" ? "active" : ""}
                        onClick={() => setOpType("Market")}>
                            Market
                    </button>
                </OpTypeButtons>
                <AssetButtons>
                    <button
                        className = {useUSDT ? "" : "active"}
                        onClick = {() => setUseUSDT(false)}>
                            <img src={marketIcon}/>
                            {baseMarket}
                    </button>
                    <button
                        className = {useUSDT ? "active" : ""}
                        onClick = {() => setUseUSDT(true)}>
                            <img src={USDT}/>
                            USDT
                    </button>
                </AssetButtons>
                <InfoDiv>
                    <div>
                        <AccountBalanceWallet/>
                        <span>{wallet.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                        })} USDT</span>
                    </div>
                </InfoDiv>
                Apalancamiento:
                <LeverageButtons>
                    <button className="updown" onClick={() => handleLeverage(-10)}>-10</button>
                    <button className="updown" onClick={() => handleLeverage(-1)}>-1</button>
                    <h1>x{leverage}</h1>
                    <button className="updown" onClick={() => handleLeverage(1)}>+1</button>
                    <button className="updown" onClick={() => handleLeverage(10)}>+10</button>
                </LeverageButtons>
                <Input
                    className = {opType !== "Limit" ? "d-none" : ""}
                    id="limit-price" 
                    placeholder="Precio límite"
                    value={limitPrice}
                    onChange={handleLimitChange}></Input>
                <Input 
                    id="op-weight" 
                    placeholder="Cantidad"
                    style={!useUSDT ? {backgroundImage: 'url(' + marketIcon + ')'} : {}}
                    onChange={handleQuantityWeightChange}
                    value={useUSDT ? quantity : weight}></Input>
                <InfoDiv>
                    <div>
                        Tamaño: {isNaN(parseFloat(weight)) ? 0 : parseFloat(weight).toLocaleString(undefined, {
                            maximumFractionDigits: 8,
                            minimumFractionDigits: 0
                        })} {baseMarket}
                    </div>
                    <div>
                        Coste: {isNaN(parseFloat(quantity)) ? 0 : parseFloat(quantity).toLocaleString(undefined, {
                            maximumFractionDigits: 8,
                            minimumFractionDigits: 0
                        })} USDT
                    </div>
                    <div>
                        Liquidación (long) : {
                            ticker.hasOwnProperty(market) ? parseFloat(ticker[market].last_price * (1-1/leverage)).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            }) + " USDT": ""
                        }
                    </div>
                    <div>
                        Liquidación (short) : {
                            ticker.hasOwnProperty(market) ? parseFloat(ticker[market].last_price * (1+1/leverage)).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            }) + " USDT": ""
                        }
                    </div>
                </InfoDiv>
                <BuySellButtons>
                    <button onClick={executeOperation} className="buy-button">Comprar</button>
                    <button onClick={executeOperation} className="sell-button">Vender</button>
                </BuySellButtons>
            </MarketOps>
            <UserOperations>
                {userOperationsResume.length === 0 ? "No hay operaciones que mostrar" : ""}
                {userOperationsResume.map(op => {
                    var profit = op[5]*
                    (op[2] === 1 ? 1 : -1)*
                    ((ticker.hasOwnProperty(op[1]) ? ticker[op[1]].last_price : 0) - op[6])
                    return (
                    <div className="details">
                        <div>
                            {op[2] === 1 ? <span className="long">L</span> : <span className="short">S</span>}
                            <img src={op[0]}/>
                            <span>{op[1].split("USDT")}/USDT</span>
                            <div className="leverage d-sm-none">x{op[3]}</div>
                            <span className = {profit > 0 ? "winner" : 
                            profit < 0 ? "looser" : "equals"}>{profit.toLocaleString(undefined, {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 4
                            })} ({(profit*100/op[4]).toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                                minimumFractionDigits: 3
                            })}%)</span>
                            <div className="align-right">
                                <button className="op-button d-sm-none" onClick={ () => closeOperation(op[8])}>Cerrar</button>
                                <button className="op-button open-data-button" onClick={openOperation} >+</button>
                            </div>
                        </div>
                        <ul className="op-data">
                            <li>Tipo de operación: {op[2] === 1 ? "Long" : "Short"}</li>
                            <li>Apalancamiento: x{op[3]}</li>
                            <li>Tamaño: {parseFloat(op[5]).toLocaleString(undefined, {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 2
                            })} {op[1].split("USDT")[0]}</li>
                            <li>Margin: {parseFloat(op[4]).toLocaleString(undefined, {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 2
                            })} USDT</li>
                            <li>Precio de entrada: {parseFloat(op[6]).toLocaleString(undefined, {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 2
                            })} USDT</li>
                            <li>Precio de liquidación: {parseFloat(op[7]).toLocaleString(undefined, {
                                maximumFractionDigits: 4,
                                minimumFractionDigits: 2
                            })} USDT</li>
                            <li>
                                <button className="op-button" onClick={ () => closeOperation(op[8])}>Cerrar</button>
                            </li>
                        </ul>
                    </div>)
                })}
                
            </UserOperations>
        </TradingSection>
    )
}