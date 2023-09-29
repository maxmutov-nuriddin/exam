/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import request from "../../server/Server";
import Card from "../../components/card/Card";
import { ENDPOINT } from "../../constants";

const MyPostsPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [title, setCategory] = useState("");
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [my, setMy] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10

  const close = () => {
    setShowForm(false);
    setErrors({});
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const fetchData = async (search) => {
    setIsLoading(true);
    try {
      const response = await request.get(`post/user?page=${currentPage}&limit=${pageTotal}&search=${search}`);
      setData(response.data.data);
      setItemsPerPage(response.data.pagination.total)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, search);
  }, [search, currentPage]);

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) {
      formErrors.category = "Category is required";
    }
    if (!name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!description.trim()) {
      formErrors.description = "Description is required";
    }

    if (!photo) {
      formErrors.photo = "Photo is required";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const edit = async (id) => {
    setShowForm(true);
    setSelected(id);
    let { data } = await request.get(`post/${id}`);
    setIsLoading(false);
    setPhoto(data.photo);
    setName(data.description);
    setCategory(data.title);
    setDescription(data.description);
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await request.delete(`post/${id}`);
      fetchData(currentPage, search);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log(photo);
      if (photo) {
        console.log(photo);
        const formData = {
          title,
          description,
        };

        console.log(formData);
        let categoryData = { ...formData, photo: photo._id };
        console.log(categoryData);
        if (selected === null) {
          await request.post("post", categoryData);
          setIsLoading(false);
        } else {
          await request.put(`post/${selected}`, categoryData);
          setIsLoading(false);
        }
        setShowForm(false);
        setCategory('');
        setName('');
        setDescription('');
        setErrors({});
        fetchData(currentPage, search);
      } else {
        console.error("Upload photo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    setCategory('');
    setName('');
    setDescription('');
    setPhoto(null);
    setErrors({});
  };

  const uploadImage = async (e) => {
    try {
      let form = new FormData();
      form.append("file", e.target.files[0]);

      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPages = Math.ceil(itemsPerPage / pageTotal);
  // console.log(itemsPerPage);

  const total = data
    .filter((total) => {
      const fullName = `${total.name} ${total.description}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    })

  useEffect(() => {
    if (search !== "") {
      if (isLoading) {
        setShowModal(true);
      } else {
        const timeoutId = setTimeout(() => {
          setShowModal(false);
        }, 500);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [search, isLoading]);

  if (search === "") {
    if (isLoading) {
      return <p>Loading...</p>;
    }
  }

  return (
    <section>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
        <div className="my__post-inner">
          <h2>My Post</h2>
          <button onClick={handleAddClick}>Add</button>
        </div>
        <hr />
      </div>
      {total.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
      ) : (
        total.map((el, index) => <Card key={index} data={el} my={my} edit={edit} deleteCategory={deleteCategory} />)
      )}

      {showForm && (
        <div className="category__form-wrapper">
          <form className="category__form" onSubmit={handleFormSubmit}>
            <h3 className="category__form-title">{selected === null ? 'Add Category' : 'Edit Category'}</h3>
            <div className="category__form-group">
              <label className="category__form-label" htmlFor="title">Category</label>
              <input
                className="category__form-input"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.title && <span className="category__form-error">{errors.title}</span>}
            </div>
            <div className="category__form-group">
              <label className="category__form-label" htmlFor="name">Title</label>
              <input
                className="category__form-input"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="category__form-error">{errors.name}</span>}
            </div>
            <div className="category__form-group">
              <label className="category__form-label" htmlFor="description">Description</label>
              <textarea
                className="category__form-textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <span className="category__form-error">{errors.description}</span>}
            </div>
            <div className="category__form-group">
              <label className="category__form-label" htmlFor="photo">Photo</label>
              <input
                className="category__form-input"
                type="file"
                id="photo"
                onChange={uploadImage}
              />
              {errors.photo && <span className="category__form-error">{errors.photo}</span>}
            </div>
            {photo && (
              <div className="category__form-group">
                <img
                  width="100%"
                  height="200"
                  className="category__form-preview"
                  src={`${ENDPOINT}upload/${photo._id}.${photo.name.split(".")[1]}`}
                  alt={photo.name}
                />
              </div>
            )}
            <div className="category__form-buttons">
              <button type="submit" className="category__button category__button--submit">
                Save
              </button>
              <button className="category__button category__button--cancel" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        </div>
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

export default MyPostsPage;