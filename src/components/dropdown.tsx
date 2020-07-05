import React, { SyntheticEvent, useState } from "react"
import styled from "@emotion/styled"

let dropdownId = 0;

type DropdownProps = {
    target: JSX.Element
    children: JSX.Element | JSX.Element[]
    closeOnClick?: boolean
}

type DropdownItemProps = {
    onClick?: (evt: SyntheticEvent) => void
    children: JSX.Element | JSX.Element[] | string
}

const Container = styled.div`
    cursor: pointer;
    position: relative;
`

const DropdownDiv = styled.div`
    position: absolute;
    bottom: -60px;
    right: 0;
    opacity: 0;
    box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 5px;
    display: flex;
    font-size: 12pt;
    flex-direction: column;
    width: 80px;
    z-index: -1;
    transition: 0.2s linear;

    &.open {
        opacity: 1;
        z-index: 2;
    }
`

const DropdownItemDiv = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.3);
    padding: 5px;
`

export const Dropdown = (props: DropdownProps) => {
    let [open, setOpen] = useState(false)
    const updateOpen = () => setOpen(!open)
    const createEl = (el: JSX.Element) => {
        let props = el.props;
        let onClick = () => {
            updateOpen()
        }
        

        return React.cloneElement(el, {...props, onClick})
    }
    let targetEl = createEl(props.target)

    return (
        <Container>
            {targetEl}
            <DropdownDiv className={open? "open" : ""}>
            {props.children}
            </DropdownDiv>
        </Container>
    )
}

export const DropdownItem = (props: DropdownItemProps) => {
    return (
        <DropdownItemDiv onClick={props.onClick}>
            {props.children}
        </DropdownItemDiv>
    )
}