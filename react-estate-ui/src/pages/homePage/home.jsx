import SearchBar from "../../components/searchbar/searchBar";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <div className="textContainer">
        <div className="wrapper">
          <h1 classname="title">Find Real Estate & Get Your Dream Place </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
            rem molestiae a itaque eos unde cum ad? Quis, commodi, atque
            nesciunt ipsa similique voluptatibus veniam explicabo voluptates
            inventore vel dolore accusamus. Porro fuga voluptates ipsam iste
            dolorum! Officia esse qui ad. Consectetur sequi nulla voluptatibus
            nam assumenda quos recusandae aliquam!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="background" />
      </div>
    </div>
  );
}

export default Home;
