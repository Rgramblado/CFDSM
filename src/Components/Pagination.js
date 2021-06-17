import { useState, useEffect } from "react";
import styled from "styled-components";

const PaginationList = styled.ul `
    list-style: none;
    display: flex;
    padding: 0;
    & li {
        margin: 0 5px;
        width: 2rem;
        height: 2rem;
        border-radius: 5px;
        background-color: #faa980;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: green;
        }
        &.actual-page {
            background-color: #ff884c;
        }
        @media(max-width: 500px){
            margin: 0 2px;
            width: 1.75rem;
            height: 1.75rem;
        }
    }
`

export default function Pagination(props){
    const pages = Math.ceil(props.data.length/props.rows)
    const actualPage = props.actualPage
    const setActualPage = props.setActualPage

    function handlePageChange(e){
        setActualPage(parseInt(e.target.innerText))
    }

    if(pages <= 1)
    return ("")

    return (
        <PaginationList>
            <li onClick={() => {setActualPage(1)}}>{"<<"}</li>
            <li onClick={() => {
                if(actualPage>1) setActualPage(actualPage-1)
            }}>{"<"}</li>
            {actualPage != 1 ? <li onClick={handlePageChange}>1</li> : ""}
            {actualPage - 2 > 1 ? "..." : ""}
            {actualPage - 1 > 1 ? <li onClick={handlePageChange}>{actualPage - 1}</li> : ""}
            <li onClick={handlePageChange} className="actual-page">{actualPage}</li>      
            {actualPage + 1 < pages ? <li onClick={handlePageChange}>{actualPage + 1}</li> : ""}

            {actualPage + 2 < pages ? "..." : ""}
            {actualPage != pages ? <li onClick={handlePageChange}>{pages}</li> : ""}
            
            <li onClick={() => {
                if(actualPage<pages) setActualPage(actualPage+1)
            }}>{">"}</li>
            <li onClick={() => {setActualPage(pages)}}>{">>"}</li>
        </PaginationList>
    )
}