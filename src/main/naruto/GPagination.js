import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './GPagination.scss';

class GPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: {
        totalPages: 30,
        currentPage: this.props.currentPage || 1,
        pages: this.getArray() || [10, 11, 12]
      }
    };
  }

  // handler function  start
  setPage(page) {
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    this.setState({
      ...this.state,
      pager: {
        ...this.state.pager,
        currentPage: page
      }
    });
    this.props.onChangePage(page);
  }

  // getter function

  getArray() {
    let array = [
      ...Array(
        (this.props.currentPage + 3 > 30 ? 30 : this.props.currentPage + 3) -
          this.props.currentPage
      ).keys()
    ].map(i => this.props.currentPage + i);

    if (
      [
        ...Array(
          (this.props.currentPage + 3 > 30 ? 30 : this.props.currentPage + 3) -
            this.props.currentPage
        ).keys()
      ].map(i => this.props.currentPage + i).length <= 2
    ) {
      return [28, 29, 30];
    }
    return array;
  }
  // handler function end
  render() {
    const { pager } = this.state;
    return (
      <div className="main-pagination">
        <Pagination>
          <Pagination.First
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(1)}
          />
          <Pagination.Prev
            disabled={pager.currentPage === 1 ? true : false}
            onClick={() => this.setPage(pager.currentPage - 1)}
          />
          {pager.currentPage > 2 && <Pagination.Ellipsis />}
          {pager.pages.map((page, index) => (
            <Pagination.Item
              key={index}
              active={pager.currentPage === page ? true : false}
              onClick={() => this.setPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          {pager.currentPage < pager.totalPages && <Pagination.Ellipsis />}
          <Pagination.Next
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.currentPage + 1)}
          />
          <Pagination.Last
            disabled={pager.currentPage === pager.totalPages ? true : false}
            onClick={() => this.setPage(pager.totalPages)}
          />
        </Pagination>
      </div>
    );
  }
}

GPagination.propTypes = {
  animation: PropTypes.string,
  className: PropTypes.string
};
/* Exports ================================================================== */

export default GPagination;
