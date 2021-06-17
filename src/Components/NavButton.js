import {makeStyles} from '@material-ui/core/styles'

export default function NavButton(props) {
    const useStyles = makeStyles(theme => ({
        "@keyframes buttonEffect": {
            "0%": {
                backgroundSize: "1000% 200%",
                background: "linear-gradient(90deg, rgb(255, 136, 76) 0%, rgb(255,86,0) 20%, rgb(255, 136, 76) 40%)",
                backgroundPosition: "0% 50%"
            },
            "100%": {
                backgroundPosition: "100% 50%"
            }
        },
        btn: {
            fontSize: "1.25rem",
            outline: "none",
            padding: props.padding ? props.padding : "10px 20px",
            border: "none",
            backgroundColor: "#faa980",
            color: theme.palette.getContrastText("#faa980"),
            borderRadius: "10px",
            "&:hover": {
                backgroundColor: "#ff884c"
            },
            "&:focus": {
                animation: `$buttonEffect 1000ms`
            },
            width: props.width !== null ? props.width : "auto" 
        }
    }))

    const classes = useStyles()

    return (
            <button onClick={props.onClick} className = {classes.btn} onMouseOut = {(event) => event.target.blur()} > 
                {props.value}
            </button>
    )
    }