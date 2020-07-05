import React from "react"
import ReactDom from "react-dom"
import styled from "@emotion/styled"
import { ToDo } from "./components/todo"
import css from "./css/todo.css"

const ToDoDiv = styled.div`
    width: 50%;
    max-width: 500px;
    height: 70vh;
    background: transparent;
    font-family: 'Roboto', sans-serif;
    color: rgba(0,0,0,0.8);
`

const Main = () => <ToDoDiv><ToDo /></ToDoDiv>

ReactDom.render(<Main />, document.getElementById("to_do"))