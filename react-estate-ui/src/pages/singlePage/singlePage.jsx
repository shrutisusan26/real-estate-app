import "./singlePage.scss";
import Slider from "../../components/slider/slider.jsx";
import Map from "../../components/map/map.jsx";
import { userData } from "../../lib/dummyData";
import { useLoaderData } from "react-router-dom";
function SinglePage() {
  const post = useLoaderData();
  console.log(post);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.img} alt="" />
                <span>{post.user.name}</span>
              </div>
            </div>
            <div className="bottom">{post.postDetail.desc}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General </p>
          <div className="listVertical">
            <div className="item">
              <img src="/utility.png" />
              <div className="itemText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p> Ownder is responsible</p>
                ) : (
                  <p> Renter is responsible</p>
                )}
              </div>
            </div>
            <div className="item">
              <img src="/pet.png" />
              <div className="itemText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p> Pets Allowed</p>
                ) : (
                  <p> Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="item">
              <img src="/fee.png" />
              <div className="itemText">
                <span>Income Policy</span>
                
                <p> {post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Room Sizes </p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span> {post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span> {post.bedroom } bed</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span> {post.bathroom } bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Places </p>

          <div className="listHorizontal">
            <div className="item">
              <img src="/school.png" />
              <div className="itemText">
                <span>School</span>
                <p>{post.postDetail.school }m away</p>
              </div>
            </div>
            <div className="item">
              <img src="/bus.png" />
              <div className="itemText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus }m away</p>
              </div>
            </div>
            <div className="item">
              <img src="/fee.png" />
              <div className="itemText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant }m away </p>
              </div>
            </div>
          </div>

          <p className="title">Location </p>

          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              {" "}
              <img src="/chat.png" alt="" /> Send a message
            </button>
            <button>
              {" "}
              <img src="/save.png" alt="" /> Save the place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
