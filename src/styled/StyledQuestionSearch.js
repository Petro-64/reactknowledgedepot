import styled from 'styled-components'

const StyledQuestionSearch = styled.td`
  .search_highlight{
    background-color: #4eff14;
  }

  .cellContent {
      position: relative;
  }

  .cellContent .hiddenTip {
    position: absolute;
    bottom: 100%;
    left: 13px;
    display: none;
    background-color: #5d8ed9;
    padding: 10px;
    z-index: 3000;
    max-width: 400px;
  }

  .hiddenTip .correctAnswer{
    background-color: #cee7c9;  
    padding: 10px;
    margin: 10px;
  }

  .hiddenTip .uncorrectAnswer{
    background-color: #ffb9b9;  
    padding: 10px;
    margin: 10px;
  }

  .cellContent:hover .hiddenTip {
    display: block;
  }
`;

export default StyledQuestionSearch