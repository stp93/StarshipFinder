import axios from 'axios';
import React, { Component } from 'react';
import './head.css';
import './list.css';

let url = `https://swapi.dev/api/vehicles/`
let back = ''
let next = ''
export class List extends Component {
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
                <div key={i} className="card" >
                    <div className="details">
                        <p className="model">{ship.model}</p>
                        <label>Manufacturer:</label><p> {ship.manufacturer}</p>
                    </div>
                    <div className="specs">
                        <label>Max Atmosphering Speed:</label><p>{ship.max_atmosphering_speed}</p>
                        <label>Number of Crew:</label><p>{ship.crew}</p>
                        <label>Number of Passengers:</label><p>{ship.passengers}</p>
                        <label className="class">Class:</label><p className="class">{ship.vehicle_class}</p>
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

export default List
