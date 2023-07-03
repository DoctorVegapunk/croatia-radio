
import stations from '../../../lib/updateRadio'
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'
import getStations from '../../../lib/updateRadio'
const api = new RadioBrowserApi('My Radio App')

const getGenres = async() =>{
    
    const genres:any = []
    
    await stations().then(stations=>{
        
        stations.forEach((station:any)=>{
            station.genres.forEach(genre=>{
                if(!genres.includes(genre) ){
                    genres.push(genre)
                }
            })
        })
    })
    return genres
}


export function load(){
    return{
        genres:getGenres().then(genres=>genres),
    }
}

