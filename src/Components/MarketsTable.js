import { makeStyles, TextField } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import NavButton from "../Components/NavButton"
import {  GetMarkets } from '../Services/MarketsServices';
import Pagination from "./Pagination";


const useStyles = makeStyles(() => ({
    marketsTable: {
        display: "flex",
        flexDirection: "column",
        minWidth: "80%",
        fontSize: "1.2rem",
        "& > *" : {
            margin: "15px 0"
        },
        "& img": {
            height: "2.5rem"
        }
    },
    searchContainer: {
        display: "flex",
        justifyContent: "flex-start"
    },
    
    table: {
        borderCollapse: "collapse",
        fontSize: "0.9em",
        minWidth: "400px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        "& thead tr": {
            backgroundColor: "#faa980",
            textAlign: "left",
            borderTopLeftRadius: "100px",
            borderCollapse: "separate",
            "& th:first-of-type": {
                borderTopLeftRadius: "10px"
            },
            "& th:last-of-type": {
                borderTopRightRadius: "10px"
            }
        },
        "& th, td": {
            padding: "12px 15px"
        }
    },

    "@media(max-width: 992px)": {
        dMdNone: {
            display: "none"
        },
        table:{
            minWidth: "0",
        }
    },
}))

export default function MarketsTable(props){
    const [markets, setMarkets] = useState([])
    const [localeMarkets, setLocaleMarkets] = useState([])

    const [orderByMarkets, setOrderByMarkets] = useState("desc")
    const [orderByPrice, setOrderByPrice] = useState(null)
    const [orderByHigh, setOrderByHigh] = useState(null)
    const [orderByLow, setOrderByLow] = useState(null)

    const [page, setPage] = useState(1)

    const classes = useStyles()

    useEffect(() => {
        GetMarkets().then(res => {
            setMarkets(res.data)
            setLocaleMarkets(res.data)
        })
    }, [])
   
    function search(e){
        var newMarkets = []
        markets.map((market) => {
            if(market.name.toLowerCase().includes(e.target.value.toLowerCase())){
                newMarkets.push(market)
            }
            return "";
        })
        setLocaleMarkets(newMarkets)
        setPage(1)
    }

    function orderMarket(){
        setOrderByPrice(null)
        setOrderByHigh(null)
        setOrderByLow(null)
        if(orderByMarkets === "asc" || orderByMarkets === null){
            setOrderByMarkets("desc")
            localeMarkets.sort(sortByMarkets)
        }else{
            setOrderByMarkets("asc")
            localeMarkets.sort(sortByMarkets)
        }       
    }
    function orderPrice(){
        setOrderByMarkets(null)
        setOrderByHigh(null)
        setOrderByLow(null)
        if(orderByPrice === "asc" || orderByPrice === null){
            setOrderByPrice("desc")
            localeMarkets.sort(sortByPrice)
        }else{
            setOrderByPrice("asc")
            localeMarkets.sort(sortByPrice)
        }       
    }
    function orderHigh(){
        setOrderByMarkets(null)
        setOrderByPrice(null)
        setOrderByLow(null)
        if(orderByHigh === "asc" || orderByHigh === null){
            setOrderByHigh("desc")
            localeMarkets.sort(sortByHigh)
        }else{
            setOrderByHigh("asc")
            localeMarkets.sort(sortByHigh)
        }       
    }
    function orderLow(){
        setOrderByMarkets(null)
        setOrderByPrice(null)
        setOrderByHigh(null)
        if(orderByLow === "asc" || orderByLow === null){
            setOrderByLow("desc")
            localeMarkets.sort(sortByLow)
        }else{
            setOrderByLow("asc")
            localeMarkets.sort(sortByLow)
        }       
    }

    function sortByMarkets(a, b){
        if(orderByMarkets === null || orderByMarkets === "asc"){
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
        }else{
            if(a.name < b.name) return 1
            if(a.name > b.name) return -1
        }
    }
    function sortByPrice(a, b){
        if(orderByPrice === "desc"){
            return b.last_price - a.last_price
        }else{
            return a.last_price - b.last_price
        }
    }
    function sortByHigh(a, b){
        if(orderByHigh === "desc"){
            return b.high - a.high
        }else{
            return a.high - b.high
        }
    }
    function sortByLow(a, b){
        if(orderByLow === "desc"){
            return b.low - a.low
        }else{
            return a.low - b.low
        }
    }

    return(
    <div className={classes.marketsTable}>
        <div className={classes.searchContainer}>
            <TextField
                onChange={search}/>
        </div>
        <table className={classes.table}>
            <thead>
                <tr>
                    <th colSpan="2" onClick={orderMarket}><span orderby="market">Mercado {orderByMarkets === null ? "" : orderByMarkets === "asc" ? <ExpandMore/> : <ExpandLess/>}</span></th>
                    <th onClick={orderPrice}><span orderby="price">Precio {orderByPrice === null ? "" : orderByPrice === "asc" ? <ExpandMore/> : <ExpandLess/>}</span></th>
                    <th className={classes.dMdNone} onClick={orderHigh}><span orderby="high">Alto (UTC) {orderByHigh === null ? "" : orderByHigh === "asc" ? <ExpandMore/> : <ExpandLess/>}</span></th>
                    <th className={classes.dMdNone} onClick={orderLow}><span orderby="low">Bajo (UTC) {orderByLow === null ? "" : orderByLow === "asc" ? <ExpandMore/> : <ExpandLess/>}</span></th>
                    <th ></th>
                </tr>
            </thead>
            <tbody>
                {localeMarkets.slice((page-1)*10, (page-1)*10+10).map((market) => {
                    return(
                        <tr key={market.name}>
                            <td><img src={market.icon} alt=""/></td>
                            <td>{market.name}</td>
                            <td>{parseFloat(market.last_price).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</td>
                            <td className={classes.dMdNone}>{parseFloat(market.high).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</td>
                            <td className={classes.dMdNone}>{parseFloat(market.low).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}</td>
                            <td className={classes.dMdNone}><Link to={"/trading/" + market.name}><NavButton value="Opera"/></Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <Pagination datalength={10} data={localeMarkets} setPage={setPage} page={page}/>
    </div>)
}