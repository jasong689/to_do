import React from "react"
import styled from "@emotion/styled"

const LoadingContainer = styled.div`
    width: 70px;
    overflow: hidden;
    height: 3px;
    position: relative;
`

const LoadingLine = styled.div`
    height: 3px;
    background-color: black;
    animation: loading 0.7s ease-in-out infinite;
    animation-direction: alternate;
    position: absolute;
    top: 0;
    left: 0;

    @keyframes loading {
        0% {
            width: 0;
        }

        50% {
            width: 70px;
        }

        100% {
            width: 70px;
            left: 70px;
        }
    }
`

export const Loading = () => (
    <LoadingContainer>
        <LoadingLine />
    </LoadingContainer>
)