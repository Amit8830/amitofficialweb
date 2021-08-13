import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (this.props.data) {
      var networks = this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }

    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="social-links">{networks}</ul>

            <ul className="copyright">
            <li> Copyright &copy; 2021</li>
              <li>All Rights Reserved</li>
              <li> Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>

            <ul className="copyright">
              {/* <li>&copy; Copyright 2021</li> */}
              <li>
                <a
                  title="Styleshout"
                  href="https://amitportfolio1.netlify.app/"
                >
              Designed By Amit Gupta ♥️
                </a>
              </li>
            </ul>
          </div>
          <div id="go-top">
            <a className="smoothscroll" title="Back to Top" href="#home">
              <i className="icon-up-open"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
