import { useEffect, useState } from 'react';

import request from "../../../server/Server";
import { ENDPOINT } from '../../../constants';

import '../../../App.css';

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10


  useEffect(() => {
    getData( search);
  }, [currentPage, search]);

  const handleInput = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  async function getData(search) {
    try {
      let {
        data
      } = await request.get(`category?search=${search}&page=${currentPage}&limit=${pageTotal}`);
      setItemsPerPage(data.pagination.total)
      setData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

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

  const edit = async (id) => {
    setShowForm(true);
    setSelected(id);
    let { data } = await request.get(`category/${id}`);
    setIsLoading(false);
    setPhoto(data.photo);
    setName(data.name);
    setDescription(data.description);
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await request.delete(`category/${id}`);
      getData(currentPage, search);
    }
  };

  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    setName('');
    setDescription('');
    setPhoto(null);
    setErrors({});
  };

  const close = () => {
    setShowForm(false);
    setErrors({});
  };

  const validateForm = () => {
    let formErrors = {};

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (photo) {
        const formData = {
          name,
          description,
        };
        let categoryData = { ...formData, photo: photo._id };
        console.log(categoryData);
        if (selected === null) {
          await request.post("category", categoryData);
          setIsLoading(false);
        } else {
          await request.put(`category/${selected}`, categoryData);
          setIsLoading(false);
        }
        getData();
        setShowForm(false);
        setName('');
        setDescription('');
        setErrors({});
      } else {
        console.error("Upload photo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }


  const totalPages = Math.ceil(itemsPerPage / pageTotal);

  return (
    <section className="category">
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
        <div className="category__header">
          <h2 className="category__title">Category ({itemsPerPage})</h2>
          <button className="category__button category__button--add" onClick={handleAddClick}>
            Add
          </button>
        </div>
        <div className="category__table-wrapper">
          <table className="category__table">
            <thead>
              <tr>
                <th className="category__table-header">Name</th>
                <th className="category__table-header">Description</th>
                <th className="category__table-header">Image</th>
                <th className="category__table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category) => (
                <tr key={category._id} className="category__row">
                  <td className="category__name">{category.name}</td>
                  <td className="category__description">{category.description}</td>
                  <td className="category__image">
                    <img
                      className="category__image-file"
                      height={50}
                      width={50}
                      src={`${ENDPOINT}upload/${category.photo._id}.${category.photo.name.split(".")[1]}`}
                      alt={category.name}
                    />
                  </td>
                  <td className="category__actions">
                    <button
                      className="category__button category__button--edit"
                      onClick={() => edit(category._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="category__button category__button--delete"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <div className="category__form-wrapper">
          <form className="category__form" onSubmit={handleFormSubmit}>
            <h3 className="category__form-title">{selected === null ? 'Add Category' : 'Edit Category'}</h3>
            <div className="category__form-group">
              <label className="category__form-label" htmlFor="name">Name</label>
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

export default CategoriesPage;