import React, { SyntheticEvent } from "react"
import styled from "@emotion/styled"

type AddProps = {
    add: (evt: SyntheticEvent) => void
}

const AddButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
    background-color: white;
    position: absolute;
    bottom: 10px;
    right: 20px;
    cursor: pointer;
    color: rgba(0,0,0,0.7);
    transition: 0.3s ease-in;
    outline: none;
    font-size: 2em;

    :hover {
        color: black;
        border-color: rgba(0,0,0,0.5);
        box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1);
    }
`

export const Add = (props: AddProps) => {
    return (
        <AddButton type="button" onClick={props.add}>+</AddButton>
    )
}