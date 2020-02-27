import React from 'react';
import { IProps } from './IPaginationProps';
import './pagination.css';

interface IState {
    pager: any
}

class Pagination extends React.Component<IProps, IState> {

    static defaultProps = {
        initialPage: 1,
        pageSize: 10,
        labels: {
            first: 'First',
            last: 'Last',
            previous: 'Previous',
            next: 'Next'
        },
        maxPages: 5
    }

    constructor(props: IProps) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if (this.props.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (this.props.totalItems !== prevProps.totalItems) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page: number) {
        var { totalItems, pageSize, maxPages } = this.props;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        pager = this.getPager(totalItems, page, pageSize, maxPages);
        // let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        this.setState({ pager: pager });
        this.props.onChangePage(page);
    }

    getPager(totalItems: number, currentPage: number, pageSize: number, maxPages: number) {
        {
            let totalPages = Math.ceil(totalItems / pageSize);
            if (currentPage < 1) { 
                currentPage = 1; 
            } else if (currentPage > totalPages) { 
                currentPage = totalPages; 
            }
          
            let startPage: number, endPage: number;
            if (totalPages <= maxPages) {
              startPage = 1;
              endPage = totalPages;
            } else {
              let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
              let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
              if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages;
              } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
              } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
              }
            }
            let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
            return {
              totalItems: totalItems,
              currentPage: currentPage,
              pageSize: pageSize,
              totalPages: totalPages,
              startPage: startPage,
              endPage: endPage,
              pages: pages
            };
          }
    }

    render() {
        let pager = this.state.pager;
        const { first, previous, next, last } = this.props.labels;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <div className="paginationDiv">
                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled control' : 'control'}>
                        <a onClick={() => this.setPage(1)}>{first}</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled control' : 'control'}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>{previous}</a>
                    </li>
                    {pager.pages.map((page: number, index: number) =>
                        <li key={index} className={pager.currentPage === page ? 'active item' : 'item'}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled control' : 'control'}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>{next}</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled control' : 'control'}>
                        <a onClick={() => this.setPage(pager.totalPages)}>{last}</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Pagination;