import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SeachBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`?keyword=${searchKeyword}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  }
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setSearchKeyword(e.target.value)}
          onBlur={handleSearchClick}
          onKeyDown={handleKeyPress}
        />
        <div className="input-group-append">
          <button onClick={handleSearchClick} id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};
export default SeachBar;
