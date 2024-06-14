import './listPage.scss'
import { listData } from '../../lib/dummyData.js'
import Filter from '../../components/filter/filter'
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import { useLoaderData } from 'react-router-dom';
function ListPage(){
  // const data = listData;
  const data = useLoaderData();
  return (
    <div className='listPage'>
      <div className="listContainer">
        <div className="wrapper">

          <Filter/>
          {data.map((item) => {
            return <Card key={item.id} item={item}/>
          })}
        </div>
      </div>
      <div className="mapContainer">

        <Map items={data}/>
      </div>

    </div>
  )
}

export default ListPage