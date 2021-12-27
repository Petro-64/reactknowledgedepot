import React, { Component } from 'react';
import StyledPagination from '../../styled/StyledPagination'


class PaginationSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
          numberOfPaginations: '',
        }
      }

  render() {
    const { totalNumberOfItems, itemsPerPage, paginationClick, currentPagination } = this.props;
    let numberOfPaginations = Math.ceil(totalNumberOfItems/itemsPerPage);

    return (
        <StyledPagination>
            <ul className="pagination pagination-sm flex-wrap">
              {Array(numberOfPaginations).fill().map((_, i) =>( 
              <li className={(currentPagination === (i + 1) ? "page-item active" : "page-item")} key={i} onClick={() => paginationClick(i + 1)}>
                <a key={i} className="page-link" href="#">{i + 1}</a> 
              </li>))}
            </ul>
        </StyledPagination>
    );
  }
}

export default PaginationSimple;