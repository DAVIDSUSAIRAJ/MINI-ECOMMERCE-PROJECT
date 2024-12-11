import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Email = ({ setIsExistingUser, popup, setPopup,hunderApiKey}) => {
  const [email, setEmail] = useState("");
  const handleClose = () => setPopup(false);

  const verifyEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunderApiKey}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const warningMsg = () => {
    toast.warning("Your email is not valid, please enter a valid email address!", {
      autoClose: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      warningMsg();
      return;
    }
    const result = await verifyEmail(email);
    if (result.data.status === "invalid") {
      warningMsg();
    } else {
      localStorage.setItem("email", email);
      toast.success("You can place an order.", { autoClose: 3000 });
    }
  };

  const handleClickConfirm = async() => {
    try {
      let user = await axios.get(
          process.env.REACT_APP_API_URLP + "/users/davidsusairaj1996@gmail.com"
      );
      console.log(user)
      // setProducts(productsCard.data);
  } catch (error) {
      console.error("Error fetching products:", error);
  }

    setIsExistingUser(true);
    handleClose();
  };

  return (
    <>
      {popup && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0, 0, 0, 0.5)",
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  If you want to place an order, can you provide your email
                  address?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <label htmlFor="emailInput" className="form-label">
                    Enter your email address
                  </label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="e.g., example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="mb-0">
                    If already registered, just click&nbsp;
                    <strong>Confirm</strong>.
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleClickConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Email;
