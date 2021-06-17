import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    "@keyframes buttonEffect": {
        "0%": {
            backgroundSize: "1000% 200%",
            background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.3) 20%, rgba(0,0,0,0.3) 40%)",
            backgroundPosition: "0% 50%"
        },
        "100%": {
            backgroundPosition: "100% 50%"
        }
    },
    btnMenu: {
        fontSize: "1.25rem",
        outline: "none",
        padding: "10px 20px",
        border: "none",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
        color: "#faa980",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)"
        },
        "&:focus": {
            animation: `$buttonEffect 1000ms`
        }
    }
}))


export default function MenuButton(props) {
    const classes = useStyles()
    return (
            <button className = {classes.btnMenu} onMouseOut = {(event) => event.target.blur()} > 
                {props.value}
            </button>
    )
    }