import {useState, useEffect} from 'react'
import useInterval from '../useInterval'
import {GetTicker} from '../Services/MarketsServices'
import {Link} from 'react-router-dom'
import styled from "styled-components"
import CoinCard from '../Components/CoinCard'
import Pagination from '../Components/Pagination'


const MarketsSection = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
        margin-top: 15px;
    }
    & div.flex{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        & > * {
            margin-top: 15px;
            margin-left: 10px;
            margin-right: 10px;
        }
    }
`

const MarketsTable = styled.table `
    background-color: #00000000;
    border-collapse: collapse;
    font-size: 0.9rem;
    min-width: 600px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    & thead {
        background-color: #00000000;
        & tr { 
            background-color: #faa980;
            & :first-child {
                border-top-left-radius: 10px;
            }
            & :last-child {
                border-top-right-radius: 10px;
            }
        }
    }
    & th, td {
        padding: 12px 15px;
        & > div {
            display: flex;
            align-items: center;
            & > * {
                margin-right: 10px;
            }
            @media(max-width: 500px){
                & img {
                    height: 20px;
                }
            }
        }
    }
    @media(max-width: 648px){
        min-width: 0;
        width: 80%;
        & .d-sm-none{
            display: none;
        }
    }

    & a {
        text-decoration: none;
        color: black;
        font-weight: bold;
        &:hover{
            color: #faa980;
        }
    }
`

const Search = styled.div `
    font-size: 1rem;
    & * {
        margin: 10px;
    }
    & input {
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        padding: 0 0 5px 10px;
        font-size: 1rem;
    }
`

export default function Markets(){
    const [mainMarkets, setMainMarkets] = useState([])
    const [markets, setMarkets] = useState([])
    const [searchMarkets, setSearchMarkets] = useState([])
    const [order, setOrder] = useState({prop: "market.name", direction: "asc"})
    const [actualPage, setActualPage] = useState(1)

    const orderBy = (a, b) => {
        var aa, bb;
        if(order.prop === "market.name"){
            aa = a["market"]["name"]
            bb = b["market"]["name"]
        }else{
            aa = isNaN(parseFloat(a[order.prop])) ? a[order.prop] : parseFloat(a[order.prop])
            bb = isNaN(parseFloat(b[order.prop])) ? b[order.prop] : parseFloat(b[order.prop])
        }
        if(order.direction === "asc"){
            return aa > bb ? 1 : -1;
        }
        else{
            return aa > bb ? -1 : 1;
    
        }
    }
    useEffect(() => {
        GetTicker().then((res) => {
            var mainMarkets = []
            res.data.map(dat => {
                if(['BTCUSDT', 'ETHUSDT', 'BNBUSDT'].indexOf(dat.market.name) >= 0){
                    mainMarkets.push(dat)
                }
            })
            setMainMarkets(mainMarkets)
            res.data.sort(orderBy)
            setMarkets(res.data)
            setSearchMarkets(res.data)
        })
    }, [])
    useInterval(() => {
        GetTicker().then((res) => {
            var mainMarkets = []
            res.data.map(dat => {
                if(['BTCUSDT', 'ETHUSDT', 'BNBUSDT'].indexOf(dat.market.name) >= 0){
                    mainMarkets.push(dat)
                }
            })
            setMainMarkets(mainMarkets)
            res.data.sort(orderBy)
            setMarkets(res.data)
        })
    }, 2000)

    function handleOrderChange(orderByParam)  {
        if(orderByParam === order.prop){
            if(order.direction = "asc") order["direction"] = "desc"
            else order["direction"] = "asc"
        }else{
            setOrder({
                prop: orderByParam,
                direction: "asc"
            })
        }
        markets.sort(orderBy)
        searchMarkets.sort(orderBy)
        setActualPage(1)
    }

    function handleSearch(e) {
        var searchMarkets = [];
        markets.map((market) => {
            if(market.market.name.includes(e.target.value)){
                searchMarkets.push(market)
            }
        })
        setSearchMarkets(searchMarkets)
        setActualPage(1)
    }

    return (
    <MarketsSection>
        <div className="flex">
            {mainMarkets.map(card => {
                return (
                    <CoinCard
                        img={card.market.icon}
                        market={card.market.name}
                        price={card.last_price}
                        change={card.price_change}
                        key={card.market.name}/>
                )
            })}
        </div>
        <Search>
            Buscar
            <input onChange={handleSearch}/>
        </Search>
        <MarketsTable>
            <thead>
                <tr>
                    <th onClick={ () => handleOrderChange("market.name")}>Mercados</th>
                    <th onClick={ () => handleOrderChange("last_price")}>Precio</th>
                    <th onClick={ () => handleOrderChange("price_change")}>% Cambio</th>
                    <th className="d-sm-none" onClick={ () => handleOrderChange("high")}>Alto</th>
                    <th className="d-sm-none" onClick={ () => handleOrderChange("low")}>Bajo</th>
                </tr>
            </thead>
            <tbody>
                {searchMarkets.slice(10*(actualPage-1), 10*actualPage).map(market => {
                    return (<tr key={market.market.name}>
                        <td>
                            <div>
                                <img src={market.market.icon}/>
                                <Link to={"/trading/"+market.market.name}>{market.market.name}</Link>
                            </div>
                        </td>
                            
                        <td>{parseFloat(market.last_price).toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        })}</td>
                        <td>{parseFloat(market.price_change).toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        })}</td>
                        <td className="d-sm-none">{parseFloat(market.high).toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        })}</td>
                        <td className="d-sm-none">{parseFloat(market.low).toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        })}</td>
                    </tr>)
                })}
            </tbody>
        </MarketsTable>
        <Pagination data={searchMarkets} rows={10} actualPage={actualPage} setActualPage={setActualPage}/>
    </MarketsSection>)
    
}