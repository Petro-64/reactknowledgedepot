import styled from 'styled-components'

const StyledPagination = styled.div`
margin: 20px 0;
 li{
     width: 28px;
 }
 > div{
     width: 30px;
     height: 30px;
     text-align: center;
     padding-top: 4px;
     display: inline-block;
     background-color: #C2CEDF;
     margin: 0 5px 5px 0;
 }

 > div.active {
    background-color: #C2FFFF;
}
`;

export default StyledPagination