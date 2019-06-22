import styled from 'styled-components'

export default styled.button`
    background-color: ${props => (props.submit ? "#b3d9ff" : "#00254d")};	
    width: 100%;
    height: 35px;
    border: none;
    color:  ${props => (props.submit ? "#00254d" : "white")};	
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 6px;
    cursor: pointer;
`