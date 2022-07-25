import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Getdata } from "../Actions/Actions";


function Home({getdataAction, data }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      getdataAction();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getdataAction();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  console.log("this is filter",data);
  const filteredCoins = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("in the home page-->", data);
  var CurrencyFormat = require("react-currency-format");
  return (
    <div className="new">
      <div className="header">
     
        <div className="container">
          <div className="navbaras">
            <div className="logo">
              {data.slice(0, 5).map((bitcoin) => {
                return (
                  <div className="lmv" key={bitcoin.id}>
                    {bitcoin.price_change_24h < 0 ? (
                      <div className="bitcoinnavbar">
                        <h5>
                          {bitcoin.name}:
                          <div className="coin-percent red">
                            {bitcoin.price_change_24h.toFixed(2)}

                            <i className="fa-solid fa-caret-down"></i>
                          </div>
                        </h5>
                      </div>
                    ) : (
                      <h5>
                        {bitcoin.name}:
                        <div className="coin-percent green">
                          {bitcoin.price_change_24h.toFixed(2)}
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </h5>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="coin-app">
        <div className="coin-search">
          <form action="">
            <input
              type="text"
              className="coin-input"
              placeholder="type the coin name"
              onChange={handleChange}
            />
          </form>
        </div>

        {filteredCoins.map((coin) => {
          return (
            <div className="xop" key={coin.id}>
              <div className="coin-container">
                <div className="coin-row">
                  <Link to={`/xyz/${coin.id}`} className="link" >
                  <div className="coin">
                    <img src={coin.image} alt="crypto" />
                    <h1>{coin.name}</h1>
                  </div>
                    </Link>
                    <p className="coin-symbol"></p>
                  <div className="coin-data">
                    <div className="coin-price">
                      <CurrencyFormat
                        value={coin.current_price}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value) => <div>${value}</div>}
                      />
                    </div>

                    {coin.price_change_percentage_24h < 0 ? (
                      <div className="coin-percent red">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    ) : (
                      <div className="coin-percent green">
                        +{coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    )}
                    <div className="coin-marketcap m-2">
                      <CurrencyFormat
                        value={coin.market_cap}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value) => <div>Mkt Cap: ${value}</div>}
                      />
                    </div>
                  </div>
                  <Link to={`/xyz/${coin.id}`}>
                    <button type="button" className="btn btn-primary">
                      Click For More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.BitReducer.items,
  };
};
const mapDispatchToProps = (dispatch) => {

  return {
    getdataAction: () => dispatch(Getdata()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
