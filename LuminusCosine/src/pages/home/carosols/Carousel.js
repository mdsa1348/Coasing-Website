import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image1 from './Images/img1.png';
import Image2 from './Images/img2.png';
import Image3 from './Images/img3.png';
import './MyCarousel.css'; // Import CSS file for styling

function MyCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false); // State to track hover

  const slides = [
    {
      imgSrc: Image1,
      caption: { title: 'First slide label', content: 'Nulla vitae elit libero, a pharetra augue mollis interdum.' }
    },
    {
      imgSrc: Image2,
      caption: { title: 'Second slide label', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
    },
    {
      imgSrc: Image3,
      caption: { title: 'Third slide label', content: 'Praesent commodo cursus magna, vel scelerisque nisl.' }
    }
  ];

  // Function to handle automatic slide change
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!hovered) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, [hovered, slides.length]);

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  // Function to handle circle click
  const handleCircleClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-container"
        onMouseEnter={() => setHovered(true)} // Set hovered state to true on mouse enter
        onMouseLeave={() => setHovered(false)} // Set hovered state to false on mouse leave
      >
        <button className="prev-btn" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="carousel-slides">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
              <img
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              <div className="carousel-caption">
                <h3>{slide.caption.title}</h3>
                <p>{slide.caption.content}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="next-btn" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleCircleClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCarousel;
