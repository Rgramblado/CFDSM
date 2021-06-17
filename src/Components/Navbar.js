import {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import { Avatar, ClickAwayListener, makeStyles } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import Logo from "../Assets/Img/Logos/logo.png"
import MenuButton from "./MenuButton";
import {UserContext} from "../Contexts/UserContext"

const leftItems = [
    {
        linkTo: "/",
        value:  "Inicio"
    },
    {
        linkTo: "/markets",
        value: "Mercados"
    },
    {
        linkTo: "/trading/BTCUSDT",
        value: "Trading"
    },
    {
        linkTo: "/learn",
        value: "Learn"
    }
]

const useStyles = makeStyles(theme => ({
    "@keyframes leftMenuContainer" : {
        "0%": {backgroundColor: "rgba(0,0,0,0)"},
        "100%": {backgroundColor: "rgba(0,0,0,0.3)"},
    },
    "@keyframes leftMenuContainerOut" : {
        from: {backgroundColor: "rgba(0,0,0,0.3)"},
        to: {backgroundColor: "rgba(0,0,0,0)"},
    },
    "@keyframes leftMenuList" : {
        from: {marginLeft: "-250px"},
        to: {marginLeft: "0"},
    },
    "@keyframes leftMenuListOut" : {
        from: {marginLeft: "0"},
        to: {marginLeft: "-250px"},
    },

    navbar: {
        display: "grid",
        gridTemplateColumns: "150px auto 150px",
        background: "linear-gradient(90deg, #000000, #333333, #111111)",
        zIndex: 9999,
        height: "100px"
    },

    logo: {
        padding: "15px",
        display: "flex",
        alignItems: "center",
        "& img": {
            maxHeight: "80px"
        }
    },

    toggleMenu: {
        display: "none"
    },

    leftMenuList: {
        display: "flex",
        alignItems: "center",
        listStyle: "none"
    },

    leftMenuLogo: {
        display: "none",
        "& img": {
            height: "80px"
        }
    },

    leftMenu: {
        display: "flex",
        alignItems: "center"
    },
    
    rightMenu: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "20px",
        marginRight: "10px"
    },

    rightMenuDropdown: {
        padding: "10px",
        borderRadius: "15px",
        position: "absolute",
        transformOrigin: "top center",
        right: "20px",
        top: "80px",
        display: "none",
        transform: "scaleY(0)",
        backgroundColor: "#333",
        "&$showing": {
            display: "flex",
            flexDirection: "column",
            transform: "scaleY(0)",
            transition: "all ease .2s"
        },
        "&$visible": {
            display: "flex",
            flexDirection: "column",
            transform: "scaleY(1)",
            transition: "all ease .2s"
        },
        "&$hidding": {
            display: "flex",
            flexDirection: "column",
            transform: "scaleY(0)",
            transition: "all ease .2s"
        }
    },

    visible: {},
    showing: {},
    hidding: {},

    "@media(max-width: 992px)": {
        navbar: {
            display: "grid",
            gridTemplateColumns: "100px auto 100px",
            background: "linear-gradient(90deg, #000000, #333333, #111111)",
            height: "80px"
        },

        leftMenu: {
            display: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            
            "&$visible": {
                display: "block",
                "& $leftMenuList":{
                    marginLeft: 0
                }
            },
            "&$showing": {
                animation: `$leftMenuContainer .6s ease`,
                display: "block",
                "& $leftMenuList":{
                    animation: `$leftMenuList .6s ease`,
                }
            },
            "&$hidding": {
                display: "block",
                animation: `$leftMenuContainerOut .6s ease`,
                "& $leftMenuList": {
                    animation: `$leftMenuListOut .6s ease`
                }
            }
        },
        visible: {},
        showing: {},
        hidding: {},
        leftMenuList: {
            position: "absolute",
            zIndex: 9999,
            top: 0,
            left: 0,
            bottom: 0,
            flexDirection: "column",
            backgroundColor: "#000000",
            width: "250px",
            paddingTop: "80px",
            paddingLeft: "0",
            margin: "0 0 0 -250px",
            "& a": {
                margin: "10px 0"
            }
        },

        leftMenuLogo: {
            display: "block"
        },

        toggleMenu: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#faa980"
        },

        logo: {
            padding: "10px",
            justifyContent: "center",
            "& img": {
                maxHeight: "60px"
            }
        },

        rightMenuDropdown: {
            right: "5px",
            top: "65px"
        }
    },

    
}))


export default function Navbar(){
    const [leftMenuOpen, setLeftMenuOpen] = useState(false)
    const [leftMenuShowing, setLeftMenuShowing] = useState(false)
    const [leftMenuHidding, setLeftMenuHidding] = useState(false)
    const [rightMenuOpen, setRightMenuOpen] = useState(false)
    const [rightMenuShowing, setRightMenuShowing] = useState(false)
    const [rightMenuHidding, setRightMenuHidding] = useState(false)
    const userContext = useContext(UserContext)

    const logout = function() {
        userContext.setData(null, null)
        localStorage.clear()
    }

    const closeLeftMenu = function() {
        if(leftMenuOpen){
            setLeftMenuOpen(false)
            setLeftMenuHidding(true)
            setTimeout(() => {
                setLeftMenuHidding(false)
            }, 500)
        }
    }
    
    const openLeftMenu = function() {
        setLeftMenuShowing(true)
        setTimeout(() => {
            setLeftMenuShowing(false)
            setLeftMenuOpen(true)
        }, 500)
    }
    
    const toggleRightMenu = () => {
        if(rightMenuOpen){
            closeRightMenu()
        }else{
            openRightMenu()
        }
    }

    const closeRightMenu = function() {
        setRightMenuHidding(true)
        setRightMenuOpen(false)
        setTimeout(() => {
            setRightMenuHidding(false)
        }, 500)
    }
    
    const openRightMenu = function() {
        setRightMenuShowing(true)
        setTimeout(() => {
            setRightMenuShowing(false)
            setRightMenuOpen(true)  
        }, 10)
    }

    const classes = useStyles()
    return (
    <nav className={classes.navbar}>
        <div className={classes.toggleMenu} onClick={openLeftMenu}>
            <MenuIcon style={{color: "#faa980"}}/>
        </div>
        <div className={classes.logo}>
            <img src={Logo} alt="Logo"></img>
        </div>
        <div className={classes.leftMenu + 
            (leftMenuOpen ? " " + classes.visible: "") + 
            (leftMenuShowing ? " " + classes.showing: "") + 
            (leftMenuHidding ? " " + classes.hidding: "")}>
            <ClickAwayListener onClickAway={closeLeftMenu}>
                <ul className={classes.leftMenuList}>
                    <Link to="/" className={classes.leftMenuLogo} onClick={closeLeftMenu}>
                        <img src={Logo} alt="Logo"/>
                    </Link>
                    {leftItems.map(item => {
                        return (
                        <Link to={item.linkTo} onClick={closeLeftMenu} key={item.linkTo}>
                            <li key={item}>
                                <MenuButton value={item.value}/>
                            </li>
                        </Link>
                        )
                    })}
                </ul>
            </ClickAwayListener>
        </div>
        <div className={classes.rightMenu}>
            <UserContext.Consumer>{
                (user) => {
                    if(user.username && user.token){
                        return (
                            <ClickAwayListener onClickAway={closeRightMenu}>
                                <div>
                                    <Avatar onClick={toggleRightMenu}/>
                                    <div className={classes.rightMenuDropdown + 
                                        (rightMenuOpen ? " " + classes.visible : "")+
                                        (rightMenuShowing ? " " + classes.showing : "")+
                                        (rightMenuHidding ? " " + classes.hidding : "")}>
                                        <Link to="/profile" onClick={closeRightMenu}>
                                            <MenuButton value="Mi perfil"/>
                                        </Link>
                                        <Link to="/" onClick={() => {logout(); closeRightMenu()}}>
                                            <MenuButton value="Logout"/>
                                        </Link>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        )
                    }else{
                        return(
                        <Link to="/login">
                            <MenuButton value="Login"/>
                        </Link>)
                    }
                }
            }
                
            </UserContext.Consumer>
        </div>
    </nav>
    )
}