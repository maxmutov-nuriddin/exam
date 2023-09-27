import { useEffect, useState } from "react";
import request from "../../server/Server";

import Card from "../../components/card/Card";

const AllPostsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10

  const handleInput = (e) => {
    setSearch(e.target.value);
    fetchData(currentPage, e.target.value);
  };

  const fetchData = async (search) => {
    try {
      const response = await request.get(`/post?search=${search}&page=${currentPage}&limit=${pageTotal}`);
      setData(response.data.data);
      setItemsPerPage(data.pagination.total)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData(currentPage, search);
  }, [search, currentPage]);


  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(itemsPerPage / pageTotal);


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
        data.map((el, index) => <Card key={index} data={el} />)
      )}
      {
        pageTotal > itemsPerPage ? null : (
          <div className="category__pagination">
            <button
              className="category__pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="category__pagination-current">{currentPage}</span>
            <button
              className="category__pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )
      }
    </section>
  );
};

export default AllPostsPage;