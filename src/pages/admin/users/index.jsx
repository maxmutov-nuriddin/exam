/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import request from '../../../server/Server';
import '../../../App.css';

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const [namesUser, setNamesUser] = useState('')
  const pageTotal = 10

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await request.get(`user?page=${currentPage}&limit=${pageTotal}&search=${search}`);
      const test = await request.get(`/user?limit=${itemsPerPage}`);
      setTest(test.data.data);
      setItemsPerPage(response.data.pagination.total);
      const { data } = response.data;
      setData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
    getData(currentPage, e.target.value);
    setCurrentPage(1);
  };


  useEffect(() => {
    const usernames = test.map(item => item.username);
    setNamesUser(usernames);
  }, [data]);

  const edit = async (id) => {
    setShowForm(true);
    setSelected(id);
    try {
      const response = await request.get(`user/${id}`);
      setIsLoading(false);
      const { data: { data } } = response;
      setName(data?.first_name || '');
      setDescription(data?.last_name || '');
      setUsername(data?.username || '');
      setPassword(data?.password || '');
    } catch (err) {
      alert(err.message);
    }
  };

  const editUser = async (id) => {
    try {
      const response = await request.get(`user/${id}`);
      const currentUserRole = response.data.data.role;
      const newRole = currentUserRole === 'user' ? 'admin' : 'user';
      await request.put(`user/${id}`, { role: newRole });
      console.log(await request.put(`user/${id}`, { role: newRole }));
      setIsLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      try {
        await request.delete(`user/${id}`);
        setIsLoading(false);
        getData(search, currentPage);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    setName('');
    setDescription('');
    setUsername('');
    setPassword('')
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
          password: password,
        };
        console.log(formData);
        if (selected === null) {
          await request.post('user', formData);
          setIsLoading(false);
        } else {
          await request.put(`user/${selected}`, formData);
          setIsLoading(false);
        }
        getData();
        setShowForm(false);
        setName('');
        setDescription('');
        setUsername('');
        setPassword('')
      } catch (err) {
        if (err.response && err.response.status === 500) {
          if (namesUser.includes(username)) {
            alert('This username is already taken');
          }
        } else {
          alert(err.message);
        }
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    setNameError('');
    setDescriptionError('');
    setUsernameError('');
    setPasswordError('')

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }

    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    }

    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };



  const totalPages = Math.ceil(itemsPerPage / pageTotal);



  const total = test.filter((total) => {
    const fullName = `${total.first_name} ${total.last_name} ${total.username} ${total.role}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  })

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="category">
      <div className="container">
        <input className="search__input" onChange={handleInput} type="text" placeholder="Searching ..." />
        <div className="category__header">
          <h2 className="category__title">User ({itemsPerPage})</h2>
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
              {
                search === '' ? (
                  total.length === 0 ? (
                    <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
                  ) : (data.map((user) => (
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
                        <button
                          className="category__button category__button--edit"
                          onClick={() => editUser(user._id)}
                        >
                          {user.role === 'admin' ? 'ADMIN' : 'User'}
                        </button>
                      </td>
                    </tr>
                  )))
                ) : (isLoading ? (
                  <h2 style={{ textAlign: 'center' }}>Loading...</h2>
                ) : total.length === 0 ? (
                  <h2 style={{ textAlign: 'center' }}>Not Found Card</h2>
                ) : ((total.map((user) => (
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
                      <button
                        className="category__button category__button--edit"
                        onClick={() => editUser(user._id)}
                      >
                        {user.role === 'admin' ? 'ADMIN' : 'User'}
                      </button>
                    </td>
                  </tr>
                )))
                )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <>
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
              <div className="category__form-group">
                <label htmlFor="username" className="category__form-label">Password for user:</label>
                <input
                  className="category__form-input category__form-input--username"
                  type="text"
                  id="username"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <span className="category__form-error">{passwordError}</span>}
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
        </>
      )}
      {
        data.length <= pageTotal & search === '' ? (<div className="category__pagination">
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
        </div>) : null
      }
    </section>
  );
};

export default UsersPage;