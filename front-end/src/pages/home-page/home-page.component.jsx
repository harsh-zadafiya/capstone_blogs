import React from "react";
import Button from "../../components/button/button.component";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";

import path from "../../constants/paths";
import bannerVideo from "../../assets/bannerVideo1.mp4";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="left-section">
        <div className="content-overlay">
          <h1>With Us Blogging is that Simple!!</h1>
          <p>
            Welcome to C4U Blog, your go-to platform for insightful and engaging
            content! We are passionate about delivering high-quality articles
            that cover a wide range of topics, from technology and science to
            lifestyle and culture.
          </p>
          <p>
            At C4U Blog, we believe in the power of words to inspire, inform,
            and connect people. Whether you're a seasoned writer or a budding
            blogger, our platform provides you with the opportunity to share
            your thoughts and ideas with a global audience.
          </p>
          <p>
            Join our growing community of writers and readers as we embark on a
            journey of exploration and discovery. Explore our diverse collection
            of articles, participate in thought-provoking discussions, and
            unleash your creativity.
          </p>
          <p>
            At C4U Blog, the possibilities are endless. Start your blogging
            journey today and become a part of our vibrant community!
          </p>
          <Link to={path.SELL_CAR}>
            <Button>Start Blogging</Button>
          </Link>
        </div>
        <div className="video-frame">
          <video autoPlay loop muted>
            <source src={bannerVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="subscription-info">
        <div className="subscription-content">
          <h2>Subscription Plans</h2>
          <p>
            Unlock exclusive benefits and support our platform by joining our
            premium membership.
          </p>
          <p>With our subscription plans, you'll enjoy:</p>
          <ul>
            <li>Access to all articles without any limitations</li>
            <li>Early access to new articles and features</li>
            <li>Priority customer support</li>
          </ul>
          <p>Choose a subscription plan that suits your needs:</p>
          <ul>
            <li>Monthly Subscription: $9.99/month</li>
            <li>Yearly Subscription: $99.99/year (Save 20%)</li>
          </ul>
          <p>
            Join our premium community today and elevate your reading
            experience!
          </p>
          <Button>Subscribe Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
