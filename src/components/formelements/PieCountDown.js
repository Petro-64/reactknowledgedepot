import React, { Component } from 'react';
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../../translations/CountDown';

class PieCountDown extends Component {
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
        const dynamicWidth = this.state.time.s === 0 ? "200" : ((this.state.time.s)/60)*200;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
          widthh: dynamicWidth + "px"
        });
        if(seconds >=0 && seconds < 20){
          this.setState({
            bgcolor: '#dc3545',
          });
        } else if (seconds >=20 && seconds < 40){
          this.setState({
            bgcolor: '#ffc107',
          });
        } else if (seconds >=40 && seconds < 70){
          this.setState({
            bgcolor: '#007bff',
          });
        }
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
          this.props.stopFunction();
        }
      }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className="countdown">
          <table>
          <tbody>
              <tr>
                  <td><p><FormattedMessage id="timeLeft" />: {this.state.time.s} <FormattedMessage id="seconds" /></p></td>
                  <td><div className = "countdownindicator" style={{width : this.state.widthh, backgroundColor: this.state.bgcolor}}></div></td>
                  <td><div>sdfsgdfgsd</div></td>
              </tr>
          </tbody>
          </table>
          
        </div>
      </IntlProvider>
    );
  }
}

export default PieCountDown;