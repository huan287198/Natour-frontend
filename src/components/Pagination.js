/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Pagination = ({ toursPerPage, totalTours, paginate }) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalTours/toursPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href='#' className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;