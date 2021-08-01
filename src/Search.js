import axios from 'axios';
import React, { useEffect, useState } from 'react';


const term = document.getElementById('homeSearch')
const results = axios.get(`https://swapi.dev/api/vehicle/?search=${term}`)
.then(res => {
console.log(res)
const ships = res.data.results
console.log(ships)
this.setState({ships})
return ships
    
}) 

function Search() {
    
    const [searchTerm, setSearchTerm] = useState("")
const [searchResults,setSearchResults] = useState([])
    const handleChange = e =>{
        setSearchTerm(e.target.value)
    }
    
useEffect(() => {
    const result = ships.filter(resp =>
        resp.toLowerCase().inclues(searchTerm.toLowerCase))
    setSearchResults(result)
}, [searchTerm])
    return (
        <div>
            <div className="input-container">
            <input type="text" id="homeSearch" value={searchTerm} onChange={handleChange}/>
            </div>
            <div className="search-results">
                <ul>
                    {searchResults.map(item => (
                        <li>{item.data.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Search
