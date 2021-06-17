import React, {useState, useEffect} from 'react';
import fullLogo from '../Assets/Img/Logos/full-logo.png'
import {makeStyles} from '@material-ui/core'
import HeaderWallpaper from '../Assets/Img/blockchain-wallpaper.jpg'
import NavButton from '../Components/NavButton';
import {GetTicker} from '../Services/MarketsServices'
import CoinCard from '../Components/CoinCard';
import useInterval from '../useInterval';

const useStyles = makeStyles(() => ({
    dashboardHeader: {
        padding: "30px",
        backgroundSize: "cover",
        backgroundImage: `url(${HeaderWallpaper})`,
        "& h1": {
            color: "#ddd",
            fontSize: "3rem"
        },
        "& img": {
            width: "30%"
        }
    },

    dashboardBody: {
        padding: "15px",
        display: "grid",
        gridTemplateAreas: "'mainCoinCardsContainer wnLsContainer topTickerContainer'",
        gridTemplateColumns: "1fr 1fr 1fr",
        "& *": {
            margin: "10px 0"
        }
    },

    wnLsContainer: {
        gridArea: "wnLsContainer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& button":{
            margin: "0 15px"
        }
    },

    topTickerContainer: {
        gridArea: "topTickerContainer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    marketsTable: {
        borderCollapse: "separate",
        borderSpacing: "0 10px",
        "& td":{
            padding: "5px 10px",
        }
    },

    lsMarket: {
        backgroundColor: "rgb(255, 20, 20)",
        borderRadius: "10px"
    },
    wnMarket: {
        backgroundColor: "rgb(27, 168, 27)",
        borderRadius: "10px"
    },

    mainCoinCardsContainer: {
        gridArea: "mainCoinCardsContainer",
        display: "grid",
        gridTemplateColumns: "290px 290px",
        justifyContent: "space-between",
        "& > *":{
            margin: "20px 20px"
        }
    },
    "@media(max-width: 1740px)": {
        mainCoinCardsContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    },

    "@media(max-width: 992px)": {
        dashboardHeader: {
            "& img":{
                width: "60%"
            }
        },
        dashboardBody: {
            display: "flex",
            flexDirection: "column",
            "& $mainCoinCardsContainer": {
                display: "grid",
                gridTemplateColumns: "290px 290px",
                margin: "auto",
                "& > *":{
                    margin: "20px 20px"
                }
            }
        }
    },

    "@media(max-width: 680px)": {
        mainCoinCardsContainer: {
            display: "flex !important",
            flexDirection: "column",
            alignItems: "center"
        }
    }

    
}))

export default function Dashboard(){
    const [classes] = useState(useStyles())
    const [ticker, setTicker] = useState([{}])
    const [winners, setWinners] = useState(true)
    const [mainTicker, setMainTicker] = useState([{}])
    const [topTicker, setTopTicker] = useState([{}])
    
    useEffect(() => {
        GetTicker().then(res => {
            var newTicker = [...res.data]
            if(winners) {
                newTicker.sort(sortAsc)
                setTopTicker([newTicker[0], newTicker[newTicker.length -1]])
            }else{
                newTicker.sort(sortDesc)
                setTopTicker([newTicker[newTicker.length -1], newTicker[0]])
            }
            setTicker(newTicker)
            setMainTicker(res.data)
        })
    }, [winners])

    useInterval(() => {
        GetTicker().then(res => {
            var newTicker = [...res.data]
            if(winners) {
                newTicker.sort(sortAsc)
                setTopTicker([newTicker[0], newTicker[newTicker.length -1]])
            }else{
                newTicker.sort(sortDesc)
                setTopTicker([newTicker[newTicker.length -1], newTicker[0]])
            }
            setTicker(newTicker)
            setMainTicker(res.data)
        })
    }, 2000)

    function sortAsc(a, b){
        return b.price_change - a.price_change
    }
    function sortDesc(a, b){
        return a.price_change - b.price_change
    }

    return (
        <section className="dashboard">
            <div className={classes.dashboardHeader}>
                <img src={fullLogo} alt="Logo completo"></img>
                <h1>Estudia. Aprende. Invierte.</h1>
            </div>
            <div className={classes.dashboardBody}>
                <div className={classes.mainCoinCardsContainer}>
                    {mainTicker.map(tick => {
                        if('market' in tick && ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'DOGEUSDT'].indexOf(tick.market.name) >= 0){
                            return (
                                <CoinCard 
                                    key={tick.market.name}
                                    img={tick.market.icon} 
                                    market={tick.market.name}
                                    price={tick.last_price}
                                    change={tick.price_change}
                                />
                            )
                        }else{
                            return ""
                        }
                    })}
                </div>
                <div className={classes.wnLsContainer}>
                    <div className={classes.wnLsBtnsContainer}>
                        <NavButton value="Ganadores" onClick={() => setWinners(true)}/>
                        <NavButton value="Perdedores" onClick={() => setWinners(false)}/>
                    </div>
                    <table className={classes.marketsTable}>
                        <thead>
                            <tr>
                                <th>Mercado</th>
                                <th>Precio</th>
                                <th>Cambio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticker.slice(0, 10).map(tick => {
                                if('market' in tick){
                                    return(
                                        <tr className={classes.tableRow} key={tick.market.name}>
                                            <td>{tick.market.name}</td>
                                            <td>{parseFloat(tick.last_price).toLocaleString(undefined, {
                                                maximumFractionDigits: 3,
                                                minimumFractionDigits: 3
                                            })}</td>
                                            <td className={tick.price_change >= 0 ? classes.wnMarket : classes.lsMarket}>
                                                {(tick.price_change > 0 ? "+" : "") + parseFloat(tick.price_change).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 2
                                                }) + "%"}
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return ""
                                }})}
                        </tbody>
                    </table>
                </div>
                <div className={classes.topTickerContainer}>
                {'market' in topTicker[0] ? <>
                    <h1>El mejor</h1>
                    <CoinCard 
                            img={topTicker[0].market.icon} 
                            market={topTicker[0].market.name}
                            price={topTicker[0].last_price}
                            change={topTicker[0].price_change}
                        />
                    <h1>El peor</h1>
                    <CoinCard 
                            img={topTicker[1].market.icon} 
                            market={topTicker[1].market.name}
                            price={topTicker[1].last_price}
                            change={topTicker[1].price_change}
                        /></>
                        : ""}
                </div>
            </div>
        </section>
    )
}