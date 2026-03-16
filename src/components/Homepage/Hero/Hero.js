import { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const heroh1 = useRef();
  const heroh3 = useRef();
  const herop = useRef();
  const heroBtns = useRef();
  const heroImg = useRef();

  useEffect(function () {
    const heroObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisible(true);
      }
    });
    heroObserver.observe(heroh1.current);
    heroObserver.observe(heroh3.current);
    heroObserver.observe(herop.current);
    heroObserver.observe(heroBtns.current);
    heroObserver.observe(heroImg.current);
  }, []);
  return (
    <div className="home-hero">
      <img
      ref={heroImg}
        src="https://i.postimg.cc/mkxt6LyR/new-hale-hero-2.jpg"
        alt=""
        className={`${visible ? "visible" : ""} hero-image`}
      />
      <div className="hero-txt">
        <h1 className={`${visible ? "visible" : ""}`} ref={heroh1}>
          HALE
        </h1>
        <h3 className={`${visible ? "visible" : ""}`} ref={heroh3}>
          Human Rights and Inclusion Network
        </h3>
        <p className={`${visible ? "visible" : ""}`} ref={herop}>
          "Championing Human Rights, Building Inclusive Futures."
        </p>
        <div
          className={`hero-cta-btns ${visible ? "visible" : ""}`}
          ref={heroBtns}>
          <button onClick={() => navigate("/aboutus")}>Read More</button>
          <button onClick={() => navigate("/contact")}>Contact Us</button>
        </div>
      </div>
    </div>
  );
}
