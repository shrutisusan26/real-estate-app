import "./listPage.scss";
import { listData } from "../../lib/dummyData.js";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/card";
import Map from "../../components/map/map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
function ListPage() {
  // const data = listData;
  const data = useLoaderData();
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p> Loading.... </p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p> Error Encountered while fetching data</p>}
            >
              {(postResponse) => {
                console.log(postResponse);
                return postResponse.data.map((item) => {
                  return <Card key={item.id} item={item} />;
                });
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Suspense fallback={<p> Loading.... </p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p> Error Encountered while fetching data</p>}
            >
              {(postResponse) => {
                  return <Map items={postResponse.data} />
              }}
            </Await>
          </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
