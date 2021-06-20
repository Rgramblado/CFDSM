import { useState } from "react"
import styled from "styled-components"


const AccordionContainer = styled.div `
    text-align: left;
    padding-top: 10px;
    padding-left: 5px;
    & .title-container{
        display: grid;
        grid-template-columns: auto 2.5rem;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        & > *:not(:last-child){
            margin: 0;
            padding-right: 10px;
        }
    }
    & div.hidden{
        height: 0;
        transform: scaleY(0);
        transform-origin: top;
        transition: all ease .3s;
    }
    & div.visible{
        transform-origin: top;
        height: 100%;
        transform: scaleY(1);
        transition: all ease .3s;
    }
`

const PlusButton = styled.button `
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
    outline: none;
    border: none;
    background-color: #faa980;
    &:hover{
        background-color: #ff884c;
    }
`

export default function Accordion(props){
    const [visible, setVisible] = useState(false)
    const toggleAccordion = () => {
        setVisible(!visible)
    }
    return(
        <AccordionContainer>
            <div className="title-container">
                <h3>{props.title}</h3>
                <PlusButton onClick={toggleAccordion}>+</PlusButton>
            </div>
            <div className={visible ? "visible" : "hidden"}>
                {props.description.map(p => {return (<p>{p}</p>)})}
            </div>
            <hr/>
        </AccordionContainer>
    )
}