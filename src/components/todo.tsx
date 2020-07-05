import { MainStoreFactory, Stores, Objects, Task } from "../stores/main"
import { List } from "./list"
import styled from "@emotion/styled"
import React, { useState, useEffect } from "react"
import { Add } from "./add"
import { Loading } from "./loading"

type ToDoProps = {

}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 5px 5px 20px 2px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
    text-align: center;
    padding: 20px 0;
    margin-bottom: 10px;
`

const ListContainer = styled.div`
    overflow-y: auto;
    flex-grow: 1;
`

const LoadingContainer = styled.div`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    display: flex;
`

export const ToDo = (props: ToDoProps) => {
    const store = MainStoreFactory.getMainStore(Stores.Main)
    let [tasks, setTasks] = useState<Task[]>([])
    let [loading, setLoading] = useState(true)

    const addNew = () => {
        const newTask: Task = { name: "New Task", description: "New Task", due: new Date(), completed: false, id: 0 }

        store.set<Task>(Objects.Tasks, newTask).then(id => {
            newTask.id = id
            setTasks(tasks.concat(newTask))
        })
    }
    const deleteTask = (task: Task) => {
        console.log(task)
        store.delete(Objects.Tasks, task.id).then(() => {
            let index = tasks.indexOf(task)
            if (index > -1) {
                tasks.splice(index, 1)
                setTasks(tasks)
            }
        })
    }

    const taskUpdated = (task: Task) => {
        let index = tasks.indexOf(task)

        if (index > -1) {
            tasks.splice(index, 1, task)
            store.set(Objects.Tasks, task).then(() => setTasks(tasks))
        }
    }

    useEffect(() => {
        const minLoadingTime = 1000
        const now = new Date()

        store.getAll<Task>(Objects.Tasks).then(tasks => {
            setTasks(tasks)

            const elapsedTime = new Date().getTime() - now.getTime()

            setTimeout(() => setLoading(false), elapsedTime >= minLoadingTime ? 0 : (minLoadingTime - elapsedTime))
        })
    })

    return (
        <Container>
            <Title>Tasks</Title>
            { loading ? 
            <LoadingContainer><Loading /></LoadingContainer> :
            <ListContainer>
                <List title="In Progress" tasks={tasks.filter(t => !t.completed)} deleteTask={deleteTask} taskUpdated={taskUpdated} />
                <List title="Completed" tasks={tasks.filter(t => t.completed)} deleteTask={deleteTask} taskUpdated={taskUpdated} />
            </ListContainer>}
            <Add add={addNew} />
        </Container>
    )
}