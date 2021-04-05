import React, { Component } from 'react';
import StyledPagination from '../../styled/StyledPagination'


class Pagination extends Component {
  render() {
    const { paginationQuantity, paginationNumber, paginationClick } = this.props;
    return (
        <StyledPagination>
            <ul className="pagination pagination-sm flex-wrap">
              <li className="page-item" style={(paginationNumber === 0) ? {opacity: '.2'} : {}} onClick={() => paginationClick(0)}>
                <a className="page-link" href="#" disabled>&lt;&lt;</a>
              </li>
              <li className="page-item" style={(paginationNumber === 0) ? {opacity: '.2'} : {}} onClick={() => {
                
                if (paginationNumber > 0) {paginationClick(paginationNumber-1)}
                
                }}>
                <a className="page-link" href="#">&lt;</a>
              </li>
              <li className="page-item" style={(paginationNumber > 2) ? {} : {display: "none"}}>
                <a className="page-link" href="#">..</a>
              </li>
            {Array(paginationQuantity).fill().map((_, i) =>(<> 
              <li className={(paginationNumber === i ? "page-item active" : "page-item")} onClick={() => paginationClick(i)} key={i} style={(paginationNumber < (i-2) || paginationNumber > (i+2)) ? {display: 'none'} : {}}>
                <a className="page-link" href="#">{i + 1}</a> 
              </li></>))}
              <li className="page-item" style={(paginationNumber < (paginationQuantity-3)) ? {} : {display: "none"}}>
                <a className="page-link" href="#">..</a>
              </li>
              <li className="page-item" style={(paginationNumber === (paginationQuantity - 1)) ? {opacity: '.2'} : {}} onClick={() => {
                if(paginationNumber<(paginationQuantity-1)){paginationClick(paginationNumber+1)}

              }}>
                <a className="page-link">&gt;</a>
              </li>
              <li className="page-item" style={(paginationNumber === (paginationQuantity - 1)) ? {opacity: '.2'} : {}} onClick={() => paginationClick(paginationQuantity - 1)}>
                <a className="page-link">&gt;&gt;</a>
              </li>
            </ul>
        </StyledPagination>
    );
  }
}

export default Pagination;