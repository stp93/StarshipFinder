import React, { Component } from 'react';
import Typed from 'typed.js';
import './head.css';


export class Head extends Component {
    
componentDidMount(){
    
    const options = {
        strings: ['<h1 style="font-family: AUR">STARSHIPS</h1>',
        '<h1 style="font-family: Roboto">STARSHIPS</h1>'],
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
            <div>
            <div className="text">
                <span style={{whiteSpace: 'pre'}} ref={(el)=>{this.el = el}}/>
                
            </div>
           
            </div>
        )
    }
}

export default Head




