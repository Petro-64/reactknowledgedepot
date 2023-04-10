import React, { Component } from 'react';

class InfiniteScroll extends Component {
    state = {
        show: false
    };

  componentDidMount(){

  }

  onScrollHandler(){
    console.log("on scroll handler");
  }

  render(props) {
 
    return (
        <div onscroll={this.onScrollHandler} data-kkk="gggg" onClick={this.onScrollHandler}>
            {this.props.children}
        </div>
    )
  }
}

export default InfiniteScroll;