import styled from 'styled-components'

const StyledFeedbackButton = styled.div`
button.rotated{
    position: fixed;
    top: 50%;
    right: -50px;
    transform:rotate(-90deg);
}


    div.overlay{    
        display: ${props => props.visib};
        position: fixed;
        z-index: 3000;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        bottom: 0;
        left: 0;



    
        > .winWrapper {
            background-color: white;
            position: absolute;
            top: 200px;
            width: 400px;
            height: 330px;
            left: calc(50% - 200px);
            border-radius: 10px 10px 0 0;
      
            @media (max-width: 768px) {
              > .winWrapper{
                width: 100%;
              }
            }
      
      
            > .modalHeader {
                width: 100%;
                background-color: #00549a;
                height: 40px;
                color: white;
                padding: 10px;
                border-radius: 10px 10px 0 0;
              }
      
            > .modalBody {
              text-align: center;
      
              > .btn-danger {
                width: 80px;
                position: absolute;
                bottom: 30px;
                left: 60px;
              }
      
              > .bodyText {
                margin-top: 10px;
                font-size: 20px;
                color: #444;
                margin-bottom: -30px;
              }
      
              > .btn-success {
                position: absolute;
                bottom: 30px;
                right: 60px;
              }
      
              > textarea {
                margin-top: 20px;
              }
            }
          }
    }


`;
export default StyledFeedbackButton