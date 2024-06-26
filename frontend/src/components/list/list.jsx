import './list.scss'
import Card from "../card/card"
function List({posts}){
  return (
    <div className='list'>
        
        {posts.map((item) => {
            return <Card key={item.id} item={item} />
        })}
    </div>
  )
}

export default List