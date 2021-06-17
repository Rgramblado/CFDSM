import { useEffect, useState } from "react"
import styled from "styled-components"
import { GetUserData } from "../Services/AuthServices"
import { GetUserHistoricalOperations } from "../Services/OperationsServices"
import Pagination from "../Components/Pagination"

const ProfileSection = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.button `
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
`

const Table = styled.table `
    & ul {
        list-style: none;
        padding-left: 5px;
        text-align: left;
    }
    & img {
        width: 40px;
    }
    & .d-lg-none{
        display: none;
    }
    & td div{
        display: flex;
        align-items: center;
        & *:not(:first-child){
            margin-left: 5px;
        }
    }
    & .details {
        min-width: 100%;
    }
    & .winner{
        color: #0ECB81
    }
    & .looser{
        color: #CF304A
    }
    @media(max-width: 992px){
        & .d-sm-none{
            display: none;
        }
        & .d-lg-none {
            display: block;
        }
        & .d-sm-toggleable {
            display: none;
            height: 0;
            transform: scaleY(0);
            transform-origin: top;
            transition: all ease .3s;
        }
        & .active.d-sm-toggleable{
            display: table-row;
            height: auto;
            transform: scaleY(1);
        }
        & td:not(:last-child) {
            width: 30%;
        }
    }
`
export default function Profile(){
    const [userData, setUserData] = useState({})
    const [historicalOps, setHistoricalOps] = useState([])
    const [actualPage, setActualPage] = useState(1)
    useEffect(() => {
        GetUserData().then((res) => {
            setUserData(res.data)
        })
    
        GetUserHistoricalOperations().then( res => {
            setHistoricalOps(res.data)
        })
    }, [])

    const toggleDetails = (e) => {
        e.target.parentElement.parentElement.nextSibling.classList.toggle("active")
    }

    return (
    <ProfileSection >
        {userData.length === 0 ? "": 
        <div className="user-data">
            <div>
                <h3>Nombre de usuario: {userData.username}</h3> 
            </div>
        </div>}
        {historicalOps.length === 0 ? "" : 
        <Table className="user-ops">
            <thead>
                <tr>
                    <th>Mercado</th>
                    <th className="d-sm-none">Precio de entrada</th>
                    <th className="d-sm-none">Precio de salida</th>
                    <th className="d-sm-none">Tamaño</th>
                    <th className="d-sm-none">Tipo de operación</th>
                    <th>PNL</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {historicalOps.slice((actualPage-1)*10, actualPage*10).map(op => {
                    return (<>
                        <tr>
                            <td>
                                <div>
                                    <img src={op.market.icon}/>
                                    <span>{op.market.name.split("USDT")[0]}/USDT</span>
                                </div>
                            </td>
                            <td className="d-sm-none">
                                <span>{parseFloat(op.entry_price).toLocaleString(undefined,{
                                    maximumFractionDigits: 3,
                                    minimumFractionDigits: 3
                                })}</span>
                            </td>
                            <td className="d-sm-none">
                                <span>{parseFloat(op.exit_price).toLocaleString(undefined,{
                                    maximumFractionDigits: 3,
                                    minimumFractionDigits: 3
                                })}</span>
                            </td>
                            <td className="d-sm-none">
                                <span>{parseFloat(op.weight).toLocaleString(undefined,{
                                    maximumFractionDigits: 6,
                                    minimumFractionDigits: 3
                                }) + " " +op.market.name.split("USDT")[0]}</span>
                            </td>
                            <td className="d-sm-none">
                                <span>{parseFloat(op.exit_price).toLocaleString(undefined,{
                                    maximumFractionDigits: 3,
                                    minimumFractionDigits: 3
                                })}</span>
                            </td>
                            <td className = {op.PNL > 0 ? "winner" : op.PNL < 0 ? "looser" : ""}>
                                <span>{parseFloat(op.PNL).toLocaleString(undefined,{
                                    maximumFractionDigits: 3,
                                    minimumFractionDigits: 3
                                })}</span>
                            </td>
                            <td>
                                <span>{new Intl.DateTimeFormat('es', {
                                    year: 'numeric', 
                                    month: '2-digit', 
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'}).format(new Date(op.created_at))}</span>
                            </td>
                            <td className="d-lg-none">
                                    <Button onClick={toggleDetails}>+</Button>
                            </td>
                        </tr>
                        <tr className="d-lg-none d-sm-toggleable">
                            <td colSpan="4">
                                <ul>
                                    <li>Precio de entrada: {op.entry_price}</li>
                                    <li>Precio de salida: {op.exit_price}</li>
                                    <li>Tamaño: {op.weight}</li>
                                    <li>Tipo de operación: {op.is_long === 1 ? "Long" : "Short"}</li>
                                </ul>
                            </td>
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </Table>
        }
        <Pagination data={historicalOps} rows={10} actualPage={actualPage} setActualPage={setActualPage}/>
    </ProfileSection>)
}