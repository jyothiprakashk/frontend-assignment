import React, { useEffect, useState } from "react";
import "./App.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjects();
  }, []);

  // const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / 5);

  // Determine the pages to display in the pagination
  const getPageNumbers = () => {
    let pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Adjust the range of pages if we're at the beginning or end
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Handle the page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next and previous page changes
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = getPageNumbers();

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  // // const totalPages = Math.ceil(projects.length / recordsPerPage);

  // // const handleNext = () => {
  // //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // // };

  // // const handlePrev = () => {
  // //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // // };

  // const handleFirst = () => {
  //   setCurrentPage(1);
  // };

  // const handleLast = () => {
  //   setCurrentPage(totalPages);
  // };

  // // Calculate total number of pages
  // const totalPages = Math.ceil(projects.length / 5);

  // // Handle the page change
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // // Handle next and previous page change
  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <div className="app-container">
      <div
        className="header animated-title"
        role="banner"
        aria-label="SaaS Labs Header"
      >
        SaaS Labs
      </div>
      <div
        className="table-container"
        role="region"
        aria-labelledby="projects-table"
      >
        <table className="modern-table" id="projects-table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Percentage Funded</th>
              <th scope="col">Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project, index) => (
              <tr key={index}>
                <td>{indexOfFirstRecord + index + 1}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>${project["amt.pledged"].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="pagination" role="navigation" aria-label="Pagination">
        <button
          className="pagination-btn arrow"
          onClick={handleFirst}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          First
        </button>
        <button
          className="pagination-btn"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Prev Page"
        >
          &laquo; Prev
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          Next &raquo;
        </button>
        <button
          className="pagination-btn"
          onClick={handleLast}
          disabled={currentPage === totalPages}
          aria-label="Last Page"
        >
          Last
        </button>
      </div> */}

      <div className="pagination">
        <button
          className="page-arrow"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button className="page-number" onClick={() => handlePageChange(1)}>
              1
            </button>
            {pageNumbers[0] > 2 && <span className="ellipsis">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${currentPage === number ? "active" : ""} page-number`}
            onClick={() => handlePageChange(number)}
          >
            <span>{number}</span>
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="ellipsis">...</span>
            )}
            <button
              className="page-number"
              onClick={() => handlePageChange(totalPages)}
            >
              <span>{totalPages}</span>
            </button>
          </>
        )}

        <button
          className="page-arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
