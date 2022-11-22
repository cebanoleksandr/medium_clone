export const range = (start, end) => {
    return [...Array(end).keys()].map(el => el + start);
}

export const limit = 10;

// let [currentPage, setCurrentPage] = useState(1);

// export const getPaginator = () => {
//     const offset = currentPage * limit - limit;

//     return {currentPage, offset, setCurrentPage}
// }
