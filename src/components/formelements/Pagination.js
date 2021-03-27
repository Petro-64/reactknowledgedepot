import React, { Component } from 'react';
import StyledPagination from '../../styled/StyledPagination'


class Pagination extends Component {
  render() {
    const { paginationQuantity, paginationNumber, paginationClick } = this.props;
    return (
        <StyledPagination>

          {/*   */}
          <ul class="pagination pagination-sm flex-wrap">
          {Array(paginationQuantity).fill().map((_, i) =>( 
          <li className={(paginationNumber === i ? "page-item active" : "page-item")} onClick={() => paginationClick(i)} key={i}>
           <a className="page-link" href="#">{i + 1}</a> 
            </li>))}
          </ul>
        </StyledPagination>
    );
  }
}

export default Pagination;