import React, { Component } from 'react';
import StyledPagination from '../../styled/StyledPagination'


class Pagination extends Component {
  render() {
    const { paginationQuantity, paginationNumber, paginationClick } = this.props;
    return (
        <StyledPagination>
            <ul className="pagination pagination-sm flex-wrap">
              <li className="page-item" style={(paginationNumber === 0) ? {opacity: '.2'} : {}} onClick={() => paginationClick(0)} key="-3">
                <button className="page-link" key="-3">&lt;&lt;</button>
              </li>
              <li className="page-item" style={(paginationNumber === 0) ? {opacity: '.2'} : {}} 
              onClick={() => {if (paginationNumber > 0) {paginationClick(paginationNumber-1)} }} key="-2">
                <button className="page-link" key="-2">&lt;</button>
              </li>
              <li className="page-item" style={(paginationNumber > 2) ? {} : {display: "none"}} key="-1">
                <button className="page-link" key="-1">..</button>
              </li>
            {Array(paginationQuantity).fill().map((_, i) =>(<> 
              <li className={(paginationNumber === i ? "page-item active" : "page-item")} onClick={() => paginationClick(i)} 
              key={i} style={(paginationNumber < (i-2) || paginationNumber > (i+2)) ? {display: 'none'} : {}}>
                <button className="page-link" key={i}>{i + 1}</button> 
              </li></>))}
              <li className="page-item" style={(paginationNumber < (paginationQuantity-3)) ? {} : {display: "none"}} key="3000">
                <button className="page-link" key="3000">..</button>
              </li>
              <li className="page-item" style={(paginationNumber === (paginationQuantity - 1)) ? {opacity: '.2'} : {}} key="3001" onClick={() => {if(paginationNumber<(paginationQuantity-1)){paginationClick(paginationNumber+1)} }}>
                <button className="page-link" key="3001">&gt;</button>
              </li>
              <li className="page-item" style={(paginationNumber === (paginationQuantity - 1)) ? {opacity: '.2'} : {}} key="3002" onClick={() => paginationClick(paginationQuantity - 1)}>
                <button className="page-link" key="3002">&gt;&gt;</button>
              </li>
            </ul>
        </StyledPagination>
    );
  }
}

export default Pagination;