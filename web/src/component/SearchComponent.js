import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";

function SearchComponent({ history }) {
  const [searchedData, setSearchedData] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [toggleReadMore, setToggleReadMore] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  // let params = useParams();
  let { keyparams } = useParams();
  // console.log(history);
  // console.log(JSON.stringify(params));

  useEffect(() => {
    if (keyparams) {
      setKeyWord(keyparams);
    }

    getTrip(keyWord);
  }, [keyWord, keyparams]);
  const getTrip = async (keyword) => {
    axios.get(`http://localhost:3002/trips?keyword=${keyword}`).then((res) => {
      if (res.data.status.code === 200) {
        setSearchedData(res.data.data);
      }
    });
  };
  const onChangeSearchInput = (e) => {
    const text = e.target.value;
    setKeyWord(text);
    history.push(`/${text}`);
  };
  const searchByTag = (tag) => {
    setKeyWord(tag);
    history.push(`/${tag}`);
  };
  const readMoreFunction = (index, url) => {
    setClickedIndex(index);
    setToggleReadMore(!toggleReadMore);
    if (toggleReadMore === false) {
      window.open(url);
    }
  };

  return (
    <div>
      <div className="header text-primary">เที่ยวไหนดี</div>
      <input
        className="search-input"
        placeholder="search..."
        value={keyWord && `${keyWord}`}
        onChange={onChangeSearchInput}
      />
      {searchedData.map((search, i) => (
        <div className="block-container ">
          <div className="block-container-row row">
            <div className="col-sm-12 col-lg-5 ">
              <img src={search.photos[0]} className="main-pic" />
            </div>
            <div className="col-sm-12 col-lg-7 title">
              <div
                className="title-header text-title text-dark"
                onClick={() => window.open(search.url)}
              >
                {search.title}
              </div>
              <div>
                <p
                  className={
                    toggleReadMore && clickedIndex === i
                      ? "full-description"
                      : "description"
                  }
                  key={i}
                >
                  {search.description}
                </p>
                <div
                  className="description read-more text-primary"
                  onClick={() => readMoreFunction(i, search.url)}
                >
                  {toggleReadMore && clickedIndex === i
                    ? "อ่านน้อยลง"
                    : "อ่านเพิ่มเติม"}
                </div>
              </div>
              <div className="tags">
                <div className="row tags-row">
                  <div className=" col-4 w-100">
                    <div>
                      หมวด <span></span>
                      {search.tags.map((tag) => (
                        <span
                          onClick={() => searchByTag(tag)}
                          className="tag-word"
                        >
                          {tag},{" "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="addition-image">
                <div className="row sub-pic-container">
                  {search.photos.slice(1).map((photo) => (
                    <div className="col-4 ">
                      <img
                        src={photo}
                        width="100%"
                        height="100%"
                        className="sub-pic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withRouter(SearchComponent);
