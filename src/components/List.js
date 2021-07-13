import axios from 'axios';
import React, { Component } from 'react';
import './list.css';

let url = `https://swapi.dev/api/starships/`
export class List extends Component {
    
    state={
        ships: [],
    }
    componentDidMount(){
        axios.get(url)
        .then(res => {
            console.log(res)
            const ships = res.data.results
            url = res.data.next
            console.log(url)
            console.log(ships)
            this.setState({ships})
        }) 
    }
    getShips = () => {
        if(url === null){
            return null
        }else{axios.get(url)
            .then(res => {
                console.log(res)
                const ships = res.data.results
                url = res.data.next
                console.log(url)
                console.log(ships)
                this.setState({ships})
            })
        }
    }

    componentDidUpdate(){
        window.scrollTo(0,0)
    }
    
    render() {
        return (
            <>
            {this.state.ships.map((ship, i) =>   
                <div key={i} className="ships-card" >
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
                </div>
                )}
                <button onClick={this.getShips}>Next Page</button>
            </> 
        )
    }
}

export default List

