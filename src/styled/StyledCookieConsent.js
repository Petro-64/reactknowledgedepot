import styled from 'styled-components'

//const coll = props.bGcolorr;

const StyledCookieConsent = styled.div`
  position: fixed;
  width: 100%;
  bottom: 30px;
  left: 5px;
  z-index: 3000;
  .flashMessageBody {
    position: absolute;
    bottom: ${props => props.ifVisible === 0 ? `-240px` : `-30px`};
    width: calc(100% - 10px);
    background-color: #d4edda;
    text-align: center;
    padding: 15px;
    transition: top 3s;
    transition: bottom 3s;
    p.message {
      margin-bottom: 0;
      display: inline;
      margin-right: 30px;
    }
    a {
      margin-right: 30px;
      cursor: pointer;
    }
  }
`;

//to hide, put -240px  ///bGcolorr

export default StyledCookieConsent