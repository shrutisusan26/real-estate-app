import './list.scss'
import {listData} from '../../lib/dummyData';
import Card from "../../components/card/card"
function List(){
  return (
    <div className='list'>
        
        {listData.map((item) => {
            return <Card key={item.id} item={item} />
        })}
    </div>
  )
}

export default List