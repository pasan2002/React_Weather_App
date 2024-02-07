import React from "react"
import axios from "axios"
import { getImageUrl } from "../../utility"

export default function Forecast(){
    const [data, setData] = React.useState({
        temp : 32,
        name : "Colombo",
        humidity : 20,
        visibility: 1000,
        wind : 12,
        image:getImageUrl("cloud.png")
    })
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState("")
    function handleChange(event){
        setName(event.target.value)
    }
    function handleClick(){
        if(name !== ""){
            const api = `your api url`;
    
            axios.get(api)
                .then(res => {
                    let imagePath = ""
                    if(res.data.weather[0].main == "Cloud"){
                        imagePath = getImageUrl("cloud.png")
                    }else if(res.data.weather[0].main == "Clear"){
                        imagePath = getImageUrl("clear.png")
                    }else if(res.data.weather[0].main == "Drizzle"){
                        imagePath =  getImageUrl("drizzle.png")
                    }else if(res.data.weather[0].main == "Rain"){
                        imagePath =  getImageUrl("rain.png")
                    }else if(res.data.weather[0].main == "Mist"){
                        imagePath =  getImageUrl("fog.png")
                    }else if(res.data.weather[0].main == "Snow"){
                        imagePath =  getImageUrl("snow.png")
                    }else{
                        imagePath =  getImageUrl("clear.png")
                    }
                    setData({ ...data, temp: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, visibility: res.data.visibility, wind: res.data.wind.speed, image: imagePath});
                    setError("")
                })
                .catch(err => {
                    if(err.response.status == 404){
                        setError("Enter Valid City Name.")
                    }else{
                        setError("")
                    }
                });

        }
    }
    
    return(
        <div className="container">
            <div className="app">
                <div className="app--search">
                    <input type="text" placeholder="Enter Your Location" onChange={handleChange}/>
                    <button className="app--icon"><img src= {getImageUrl("search.png")} alt="Search icon" onClick={handleClick}/></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
            <div className="app--content">
                <img src={data.image} alt="weather image" className="app--image"/>
                <h1>{Math.round(data.temp)}°C</h1>
                <h2>{data.name}</h2>
                <div className="app--details">
                    <div className="col">
                        <img src= {getImageUrl("humidity.png")} alt="humidity" className="detailICN"/>
                        <div className="info">
                            <p>{Math.round(data.humidity)}%</p>
                            <h3>Humidity</h3>
                        </div>
                    </div>
                    <div className="col">
                        <img src={getImageUrl("witness.png")} alt="visibility" className="detailICN"/>
                        <div className="info">
                            <p>{data.visibility}</p>
                            <h3>Visibility</h3>
                        </div>
                    </div>
                    <div className="col">
                        <img src={getImageUrl("wind.png")} alt="wind" className="detailICN"/>
                        <div className="info">
                            <p>{Math.round(data.wind)}km/h</p>
                            <h3>Wind</h3>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}