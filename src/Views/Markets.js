import {useState, useEffect} from 'react'
import CoinCard from "../Components/CoinCard";
import { makeStyles } from "@material-ui/core";
import MarketsTable from '../Components/MarketsTable';
import { GetTicker } from '../Services/MarketsServices';

const useStyles = makeStyles(()=> ({
    markets: {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& $cards": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            "& > *":{
                margin: "10px 20px"
            },
            flexWrap: "wrap",
        }
    },
    cards:{}
}))


export default function Markets(){
    const [cards, setCards] = useState([])

    useEffect(() => {
        GetTicker().then(res => {
            var markets = []
            res.data.map(tick => {
                if(['BTCUSDT', 'ETHUSDT', 'BNBUSDT'].indexOf(tick.market.name) >= 0){
                    markets.push(tick)
                }
                return ""
            })
            setCards(markets)
        })

        
    }, [])

    const classes = useStyles()
    return(
    <div className={classes.markets}>
        <div className={classes.cards}>
            {cards.map(card => {
                if('market' in card){
                    return(
                        <CoinCard 
                            img={card.market.icon} 
                            market={card.market.name}
                            price={card.last_price}
                            change={card.price_change}
                            key={card.market.name}
                        />
                    )
                }else{
                    return ""
                }
            })}
        </div>
        <MarketsTable></MarketsTable>
    </div>)
}