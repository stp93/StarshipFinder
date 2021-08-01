import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { Component } from 'react';
import './head.css';
import './list.css';
AOS.init()
let url = `https://swapi.dev/api/planets/`
let back = ''
let next = ''
export class Planets extends Component {
    constructor(props){
        super(props)
    this.state={
        vehicles: [],
        isLoaded: false
    }}
    componentDidMount(){
        axios.get(url)
        .then(res => {
            console.log(res)
            const vehicles = res.data.results
            
            next = res.data.next
            back = res.data.previous
            console.log(url)
            console.log(vehicles)
            
            this.setState({isLoaded:true,vehicles})
        }) 
        
    }
    getVehicles = () => {
        if(next === null){
            return null
        }else{axios.get(next)
            .then(res => {
                console.log(res)
                const vehicles = res.data.results
                
                console.log(next)
                console.log(vehicles)
                this.setState({vehicles})
                next = res.data.next
                back = res.data.previous
            })
        }
    }
    getBack = () => {
        
        if(back === ''){
            return null
        }else{axios.get(back)
            .then(res => {
                console.log(res)
                const vehicles = res.data.results
                //const url = res.data.next
                
                console.log(url)
                console.log(vehicles)
                this.setState({isLoaded: true,
                    vehicles})
                back = res.data.previous
                next = res.data.next
            })
        }
    }
    componentDidUpdate(){
        window.scrollTo(0,0)
    }
    
    render() {
        const {isLoaded} = this.state
        if(!isLoaded){
            return(<div style={{textAlign: 'center', fontSize: '2rem', fontFamily: 'AUR'}}>Loading...</div>)
        }else{
        return (
            <div>
            {this.state.vehicles.map((ship, i) =>   
                <div key={i} className="card"
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true" >
                    <div className="details">
                        <p className="model">{ship.name}</p>
                        <label>Climate:</label><p style={{fontFamily: 'AUR'}}> {ship.climate}</p>
                        <label>Terrain:</label><p style={{fontFamily: 'AUR'}}> {ship.terrain}</p>
                    </div>
                    <div className="specs">
                        <label >Rotation Period:</label><p>{ship.rotation_period}</p>
                        <label >Orbital Period:</label><p>{ship.orbital_period}</p>
                        <label >Diameter:</label><p>{ship.diameter}</p>
                        
                    </div>
                    <button className="specs-button">Expand</button>
                </div>
                )}
                <div className="button-container">
                <button onClick={this.getBack}>Back</button>
                <button onClick={this.getVehicles}>Next</button>
                </div>
            </div> 
        )
    }}
}

export default Planets

