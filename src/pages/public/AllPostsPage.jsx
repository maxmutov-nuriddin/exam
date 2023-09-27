import { useEffect, useState } from "react";
import request from "../../server/Server";

import Card from "../../components/card/Card";

const AllPostsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleInput = (e) => {
    setSearch(e.target.value);
    fetchData(currentPage, e.target.value);
  };

  const fetchData = async (page, search) => {
    try {
      const response = await request.get(`/post?search=${search}&page=${page}`);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData(currentPage, search);
  }, [search, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);



  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section>
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
        <h2>All Post</h2>
        <hr />
      </div>
      {data.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
      ) : (
        currentPageData.map((el, index) => <Card key={index} data={el} />)
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination__button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPostsPage;