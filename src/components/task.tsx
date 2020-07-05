import React from "react"
import { Task } from "../stores/main"
import styled from "@emotion/styled"
import { Dropdown, DropdownItem } from "./dropdown"

type ItemProps = {
    task: Task
    deleteTask: (task: Task) => void
    taskUpdated: (task: Task) => void
}

const Container = styled.div`
    width: 100%;
    display: flex;
`

const Title = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;

    &.completed {
        text-decoration: line-through;
    }
`

const TitleText = styled.span`
    
`

const Options = styled.div`
    width: 65px;
    font-size: 2em;
    cursor: pointer;
    display: flex;
    align-items: center;
`

const OptionsText = styled.span`

`

export const Item = (props: ItemProps) => {
    const updateName = (name: string) => {
        let task = props.task
        task.name = name
        props.taskUpdated(task)
    }

    const completeTask = () => {
        let task = props.task
        task.completed = true
        props.taskUpdated(task)
    }

    return (
        <Container>
            <Title className={props.task.completed ? "completed" : ""}>
                <span contentEditable suppressContentEditableWarning={true} onBlur={(evt) => updateName(evt.currentTarget.innerText)}>
                    {props.task.name}
                </span>
            </Title>
            <Options>
                <Dropdown target={<OptionsText>&#8230;</OptionsText>}>
                    <DropdownItem onClick={() => props.deleteTask(props.task)}>Delete</DropdownItem>
                    <DropdownItem onClick={() => completeTask()}>Complete</DropdownItem>
                </Dropdown>
            </Options>
        </Container>
    )
}