import styled from 'styled-components'

//const coll = props.bGcolorr;

const StyledFlashMessage = styled.div`
  position: fixed;
  top: 30px;
  right: 420px;
  z-index: 3000;
  .flashMessageBody {
    position: absolute;
    top: ${props => props.ifVisible === 0 ? `-240px` : `-30px`};
    width: 400px;
    background-color: ${props => props.bGcolorr === `success` ? `#d4edda` : `#f8d7da`};
    text-align: center;
    padding: 20px;
    transition: top 1s;
    p {
      margin-bottom: 0;
    }
  }
  @media only screen and (max-width: 600px) {
    left: 0px;
    .flashMessageBody {
      width: 320px;
      background-color: ${props => props.bGcolorr === `success` ? `#d4edda` : `#f8d7da`};
      padding: 10px;
    }
  }
`;

//to hide, put -240px  ///bGcolorr

export default StyledFlashMessage