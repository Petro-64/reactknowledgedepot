import styled from 'styled-components'

const StyledEditQuestionrRow = styled.tr`
  :hover{
    background-color: red;
  }
  .questionCell {
    position: relative;
    cursor: pointer;
  }

  .questionCell:hover {
    background-color: #d5fdff;
  }

  .pointer{
    cursor: pointer;    
  }
  .questionCell > .popupAnswersHint {
    position: absolute;
    bottom: 100%;
    left: 13px;
    display: none;
    background-color: #5d8ed9;
    padding: 10px;
    z-index: 3000;
    max-width: 400px;
  }

  .questionCell > .popupAnswersHint > div {
    background-color: #ddd;
    padding: 10px;
    margin: 10px;
  }

  .questionCell:hover > .popupAnswersHint {
    display: block;
  }

  .questionCell:hover > .popupAnswersHint > .correctAnswer{
    background-color: #cee7c9;  
  }

  .questionCell:hover > .popupAnswersHint > .uncorrectAnswer{
    background-color: #ffb9b9;  
  }
`;

export default StyledEditQuestionrRow