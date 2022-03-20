import React, { Component } from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/CountDown';
import StyledCountDown from '../../styled/StyledCountDown';

class Countdown extends Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 60, widthh: "200px", bgcolor: '' };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
      }

      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }

      resetTimer(){
        this.setState({
            seconds: 60,
          });
      }

      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
      }
    
      startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        const dynamicWidth = this.state.time.s === 0 ? "100" : ((this.state.time.s)/60)*100;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
          widthh: dynamicWidth + "px"
        });
        if(seconds >=0 && seconds < 10){
          this.setState({
            bgcolor: '#dc3545',
          });
        } else if (seconds >=10 && seconds < 25){
          this.setState({
            bgcolor: '#ffc107',
          });
        } else if (seconds >=25 && seconds < 70){
          this.setState({
            bgcolor: '#95c186',
          });
        }
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
          this.props.stopFunction();
        }
      }

  render() {
    const dynamicDegrees = this.state.time.s === 0 ? 100 : ((this.state.time.s)/60)*100;
    return (
      <StyledCountDown degrees={dynamicDegrees} colorr={this.state.bgcolor}>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <div className="countdown">
            <table>
            <tbody>
                <tr>
                    <td className="timeLeftSeconds" style={{backgroundColor : this.state.bgcolor, color: 'white'}}>&nbsp;<FormattedMessage id="timeLeft" />: {this.state.time.s} <FormattedMessage id="seconds" />&nbsp;</td>
                    {/*<td><div className = "countdownindicator" style={{width : this.state.widthh, backgroundColor: this.state.bgcolor}}></div></td>*/}
                    {/*<td><div className="pie no-round"></div></td>*/}
                </tr>
            </tbody>
            </table>
          </div>
        </IntlProvider>
      </StyledCountDown>
    );
  }
}

export default Countdown;