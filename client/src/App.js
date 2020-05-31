import React, { useState } from 'react';
import './index.css';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import axios from 'axios';

import Popup from './components/Popup';



function App() {
  const [state, setState]= useState({
    s:"",
    results:[],
    selected:{}
  });
  const apiurl ="http://www.omdbapi.com/?apikey=ed4d963f";
  
  

  const search=(e) => {
    if(e.key === "Enter") {
      // s stands for search in which open movies api query the db
      axios(apiurl + "&s=" + state.s)
      .then(({data})=> {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results:results }
        })
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;

// we gonna get the prev state, coz we dont want to over ride the state
    setState(prevState => {
      // shallow copying the prev state
      // we gonna be changing the value of s from line 15
      return { ...prevState, s: s}
    })

    console.log(state.s);
  }


  const openPopup = id => {
    axios(apiurl + "&i=" +id)
    .then(({data})=> {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  }

  const closePopup = () => {
  
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  return (
    <div className="App">

      <header>
        <h1>Welcome to the movies database</h1>
      </header>
      <main>
       <Search handleInput={handleInput} search={search} />
      
       <Results results={state.results} openPopup={openPopup} />

       {/* if the title is undefined we not gonna show up and vice versa */}
       {/* : this means else */}
       {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false }
      </main>
    </div>
  );
}





export default App;
