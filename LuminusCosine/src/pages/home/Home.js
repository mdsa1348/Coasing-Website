import "./home.css";
import MyCarousel from "./carosols/Carousel";
import Mycontents from "./contents/contents";
import Numbers from "./numbersAnim/numbers";
import Initiatives from "./initiatives/initiatives";
import Card from "./FromRightorLeft/card";
import Contact from "./footer/contact";



function Home(){
    return (
      <div className="Homehm">
        <h1 className="center">Home</h1>
        <MyCarousel/>
        <h1 className="center">Contents</h1>
        <Mycontents/>
        <h1 className="center">Number of Contents</h1>
        <Numbers/>
        <h1 className="center">Initiatives</h1>
        <Initiatives/>
        <h1 className="center">Animated Card</h1>
        <Card/>
        <h1 className="center">Contact Us</h1>
        <Contact/>
        
        <h1 className="center">Footer</h1>

      </div>
    );
  };
  
  export default Home;