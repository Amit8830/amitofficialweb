import React, { Component } from 'react';

class About extends Component {
  render() {
    if (this.props.data) {
      // var name = this.props.data.name;
      var profilepic = 'images/' + this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img className="profile-pic" src={profilepic} alt="Amit Gupta" />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>

            <p style={{ whiteSpace: 'pre-line' }}>{bio}</p>

            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <a href="https://amitportfolio1.netlify.app/#home">
                    <span> Click Here For My Portfolio </span>
                    <br />
                  </a>
                  <span>
                    {street}
                    <br />
                    {city} {state}, {zip}
                  </span>
                  <br />
                  {/* <a
                    class="PDvGL q8cvFf"
                    href="tel:+91-90227-54949"
                    data-tracking-element-type="3"
                    jslog="56037; track:impression,click"
                    itemprop="telephone"
                    dir="ltr"
                  >
                    Call now
                  {" "}
                  <span>{phone} </span></a> <br /> */}
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href={resumeDownload} className="button">
                    <i className="fa fa-download"></i>Download Resume
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
