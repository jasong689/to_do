import { Task } from "../stores/main"
import React from "react"
import styled from "@emotion/styled"
import { Item } from "./task"

type ListProps = {
    tasks: Task[],
    deleteTask: (task: Task) => void
    taskUpdated: (task: Task) => void
    title?: string
}

const TaskContainer = styled.ul`
    list-style: none;
    padding: 0;
`

const TaskItem = styled.li`
    padding: 20px 0 20px 40px;
    position: relative;
    
    :after {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        content: '';
        width: calc(100% - 100px);
        position: absolute;
        left: 50px;
        bottom: 0;
        z-index: 1;
    }
`

const NoTasks = styled.div`
    text-align: center;
    font-style: italic;
`

const ListTitle = styled.h3`
    padding-left: 30px;
    margin-top: 0;
`

export const List = (props: ListProps) => {
    return (
        <TaskContainer>
            {props.title && <ListTitle>{props.title}</ListTitle>}
            {!props.tasks.length && <NoTasks>No more tasks, well done!</NoTasks>}
            {props.tasks.map(t => (
                <TaskItem key={t.id.toString()}>
                    <Item task={t} deleteTask={props.deleteTask} taskUpdated={props.taskUpdated} />
                </TaskItem>
            ))}
        </TaskContainer>
    )
}