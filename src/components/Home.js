import React, { Component } from 'react';
import Typed from 'typed.js';
import './home.css';

export class Home extends Component {
    componentDidMount(){
        const options = {
            strings: ['<h1 style="font-family: Roboto">SHIP FINDER</h1>',
            '<h1 style="font-family: AUR">SHIP FINDER</h1>'],
            loop: true,
            startDelay: 500,
            backDelay: 2000,
            loopCount: 1,
            typeSpeed: 100,
            backSpeed: 100,
            smartBackspace: false,
            stringsElement: 0,
            cursorChar: ''
            
        }
        this.typed = new Typed(this.el, options)
    }
    componentWillUnmount(){
        this.typed.destroy();
    }
    

    render() {
        return (
            <div className="home"> 

            <div className="text-container">
                {/* <Search/> */}
                <div className="text">
                    <span style={{whiteSpace: 'pre'}} ref={(el)=>{this.el = el}}/>
                </div>
            </div>  
            
            </div>
        )
    }
}

export default Home
