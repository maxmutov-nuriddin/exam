import { useEffect, useState } from 'react';
import request from '../../../server/Server';
import '../../../App.css';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await request.get('user');
      const { data } = response.data;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const edit = async (id) => {
    setShowForm(true);
    setSelected(id);
    try {
      const response = await request.get(`user/${id}`);
      const { data: { data } } = response;
      setName(data?.first_name || '');
      setDescription(data?.last_name || '');
      setUsername(data?.username || '');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      try {
        await request.delete(`user/${id}`);
        getData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    setName('');
    setDescription('');
    setUsername('');
  };

  const close = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formData = {
          first_name: name,
          last_name: description,
          username: username,
        };

        if (selected === null) {
          await request.post('user', formData);
        } else {
          await request.put(`user/${selected}`, formData);
        }
        getData();
        setShowForm(false);
        setName('');
        setDescription('');
        setUsername('');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Reset previous errors
    setNameError('');
    setDescriptionError('');
    setUsernameError('');

    // Validate name field
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }

    // Validate description field
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    }

    // Validate username field
    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    }

    return isValid;
  };

  return (
    <section className="category">
      <div className="container">
        <div className="category__header">
          <h2 className="category__title">User ({data.length})</h2>
          <button className="category__button category__button--add" onClick={handleAddClick}>
            Add
          </button>
        </div>
        <div className="category__table-wrapper">
          <table className="category__table">
            <thead>
              <tr>
                <th className="category__table-header">First name</th>
                <th className="category__table-header">Last name</th>
                <th className="category__table-header">User Name</th>
                <th className="category__table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className="category__row">
                  <td className="category__name">{user.first_name}</td>
                  <td className="category__description">{user.last_name}</td>
                  <td className="category__description">{user.username}</td>
                  <td className="category__actions">
                    <button
                      className="category__button category__button--edit"
                      onClick={() => edit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="category__button category__button--delete"
                      onClick={() => deleteCategory(user._id)}
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
          <form onSubmit={handleFormSubmit} className="category__form">
            <div className="category__form-group">
              <label htmlFor="first_name" className="category__form-label">First Name:</label>
              <input
                className="category__form-input category__form-input--first-name"
                type="text"
                id="first_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <span className="category__form-error">{nameError}</span>}
            </div>
            <div className="category__form-group">
              <label htmlFor="last_name" className="category__form-label">Last Name:</label>
              <input
                className="category__form-input category__form-input--last-name"
                type="text"
                id="last_name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <span className="category__form-error">{descriptionError}</span>}
            </div>
            <div className="category__form-group">
              <label htmlFor="username" className="category__form-label">User Name:</label>
              <input
                className="category__form-input category__form-input--username"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && <span className="category__form-error">{usernameError}</span>}
            </div>
            <div className='box-btn'>
              <button className="category__button category__button--submit" type="submit">
                Submit
              </button>
              <button className="category__button category__button--cancel" onClick={close} type="button">
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default UsersPage;