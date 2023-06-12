import React ,{useState,useEffect} from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl,API_KEY } from '../../Constants/Constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies, setmovies] = useState([])

  const [trailerId, setTrailerId] = useState('')


  useEffect(() => {
    axios.get(props.url).then((response)=>{
      console.log(response.data)
      setmovies(response.data.results)
    })
   }, [])
  

   const opts = {
    height: '400',
    width: '100%',
  
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

 const movieTrailer=(id)=>{
  console.log(id)
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        setTrailerId(response.data.results[0])
      }else{
        console.log('Array empty')
      }
    })
}


  return (
    
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
        
        { movies.map((obj)=>
              <img onClick={()=>{movieTrailer(obj.id)}} className={props.isSmall ? "smallposter" : "poster"} alt='poster' src={`${imageUrl+obj.backdrop_path}`} />   //check whether isSmall if is small it show small posters
            )}  
                  
        </div>

          {trailerId && <Youtube videoId={trailerId.key} opts={opts} style={{paddingBottom:10}} />}

    </div>
  )
  }

export default RowPost