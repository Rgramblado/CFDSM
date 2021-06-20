import {makeStyles} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    coinCard: {
        padding: "5px 10px",
        boxShadow: "3px 3px 10px 4px rgba(0,0,0,0.4)",
        width: "300px",
        height: "170px",
        display: "flex",
        justifyContent: "space-between"
    },
    imgContainer: {
        display: "flex",
        alignItems: "center",
    },
    marketContainer: {
        padding: "0 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        "& h3":{
            margin: "3px"
        },
        "& h2":{
            color: "black"
        }
    },
    upMarket:{
        color: "rgb(27, 168, 27)"
    },
    downMarket: {
        color: "rgb(255, 20, 20)"
    }
}))

export default function CoinCard(props){
    const classes = useStyles()

    
    return(
        <div className={classes.coinCard}>
            <div className={classes.imgContainer}><img src={props.img} alt=""/></div>
            <div className={classes.marketContainer + " " + 
                (parseFloat(props.change) >= 0 ? classes.upMarket : classes.downMarket) }>
                <h2>{props.market}</h2>
                <h3>{parseFloat(props.price).toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                })}</h3>
                <h3>{parseFloat(props.change).toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                    minimumFractionDigits: 3
                })}%</h3>
            </div>
        </div>
    )
}