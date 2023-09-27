import { useEffect, useState } from "react";
import request from "../../server/Server";

const AccountPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phoneNumber: "",
    address: "",
    email: "",
    birthday: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    if (formData.first_name === '') {
      setError('Please enter your first name.');
      return false;
    }
    if (formData.last_name === '') {
      setError('Please enter your last name.');
      return false;
    }
    if (formData.username === '') {
      setError('Please enter a username.');
      return false;
    }
    if (formData.phoneNumber === '') {
      setError('Please enter a phone.');
      return false;
    }
    if (formData.address === '') {
      setError('Please enter a address.');
      return false;
    }
    if (formData.email === '') {
      setError('Please enter a email.');
      return false;
    }
    if (formData.birthday === '') {
      setError('Please enter a birthday.');
      return false;
    }
    setError('');
    return true;
  };

  const account = async () => {
    try {
      let response = await request.get("auth/me");
      setIsLoading(false);
      const {
        first_name,
        last_name,
        username,
        phoneNumber,
        address,
        email,
        birthday,
      } = response.data;
      setFormData({
        first_name,
        last_name,
        username,
        phoneNumber,
        address,
        email,
        birthday,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const put = async () => {
    try {
      await request.put("auth/details", formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    account();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await put();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <section className="register">
        <h1 className="register__title">Account</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            className="register__input"
            placeholder="Name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="last_name"
            className="register__input"
            placeholder="Surname"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="username"
            className="register__input"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            className="register__input"
            placeholder="Phone"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            className="register__input"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            className="register__input"
            placeholder="Email"
            value={formData.email.split('@')[0]}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="birthday"
            className="register__input"
            placeholder="Birthday"
            value={formData.birthday.split("T")[0]}
            onChange={handleInputChange}
          />

          {error && <p className="register__error">{error}</p>}
          <button type="submit" className="register__button">
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default AccountPage;