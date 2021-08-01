import axios from 'axios';
import React, { Component } from 'react';
import './list.css';

let url = `https://swapi.dev/api/starships/`
let back = ''
let next = ''
export class List extends Component {
    constructor(props){
        super(props)
    this.state={
        ships: [],
        isLoaded: false,
        back: '',
        next: ''
    } 
}
    componentDidMount(){
        axios.get(url)
        .then(res => {
            console.log(res)
            const ships = res.data.results
            const url = res.data.next
            console.log(url)
            console.log(ships)
            this.setState({isLoaded: true,
                ships
                })
             next = res.data.next
             
        }) 
    }
    getShips = () => {
        if(next === null){
            return null
        }else{axios.get(next)
            .then(res => {
                console.log(res)
                const ships = res.data.results
                console.log(url)
                console.log(ships)
                this.setState({isLoaded: true,
                    ships,})
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
                const ships = res.data.results
                console.log(url)
                console.log(ships)
                this.setState({isLoaded: true,
                    ships})
                back = res.data.previous
                next = res.data.next
            })
        }
    }
    
    componentDidUpdate(){
        window.scrollTo(0,0)
    };
    
    render() {
        const {isLoaded} = this.state
        if(!isLoaded){
            return(<div style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'AUR'}}>Loading...</div>)
        }else{
        return (
            <div>
            {this.state.ships.map((ship, i) =>   
                <div key={i} className="card" >
                    <div className="details">
                        <p className="model">{ship.model}</p>
                        <label>Manufacturer:</label><p> {ship.manufacturer}</p>
                    </div>
                    <div className="specs">
                        <label>Max Atmosphering Speed:</label><p>{ship.max_atmosphering_speed}</p>
                        <label>Number of Crew:</label><p>{ship.crew}</p>
                        <label>Number of Passengers:</label><p>{ship.passengers}</p>
                        <label htmlFor="ship">Hyperdrive Rating:</label><p>{ship.hyperdrive_rating}</p>
                    </div>
                    {/* <button className="specs-button" onClick={this.expandSpecs}>Expand</button> */}
                </div>
                )}
                <div className="button-container">
                <button onClick={this.getBack}>Back</button>
                <button onClick={this.getShips}>Next</button>
                </div>
            </div> 
        )
    }
}}

export default List

