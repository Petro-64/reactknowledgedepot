import styled from 'styled-components'

const Styledtesting = styled.div`
    .answerBlock {
        background-color: #C2CEDF;
        padding: 15px;
        border: none;
        margin: 10px 0;
        cursor: pointer;
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
    }
    
    .qusetionBlock{
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
    }
    table.testingDetails{
        width: 100%;
    }
    table.testingDetails td:first-child{
        width: 100px;
    }
    table.testingDetails td:nth-child(2){
        width: 130px;
    }
    .floatRight{
        float: right;
    }
`;

export default Styledtesting