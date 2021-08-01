import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import React, { Component } from 'react';
import './list.css';

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });
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
                <div key={i} className="card" 
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="true" >
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

