import React from "react";
import { NavLink } from "react-router-dom";
import { range } from "../../utils";

const PaginationItem = ({page, currentPage, url, setCurrentPage}) => {
    const liClasses = [
        'page-item',
        currentPage === page ? 'active' : '',
    ]

    let address = `${url}?page=${page}`;

    return (
        <li className={liClasses.join(' ')} onClick={() => setCurrentPage(page)}>
            <NavLink to={address} className='page-link active'>
                {page}
            </NavLink>
        </li>
    )
}

const Pagination = ({total, limit, url, currentPage, setCurrentPage}) => {
    const pagesCount = Math.ceil(total / limit);
    const pages = range(1, pagesCount);

    return (
        <ul className="pagination">
            {pages.map((page) => (
                <PaginationItem 
                    page={page}
                    currentPage={currentPage}
                    url={url}
                    setCurrentPage={setCurrentPage}
                    key={page}
                />
            ))}
        </ul>
    )
}

export default Pagination;
