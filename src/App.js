
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress});
  }
  render() {
    const apiKey = process.env.REACT_APP_NEWS_APP_FIRSTAPI
    return (
      <>
      <Router>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
          <Route exact path="/" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="home"  country="in" category="general"/>}/>
          <Route exact path="/business" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="business"  country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="entertainment"  country="in" category="entertainment"/>}/>
          <Route exact path="/general" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="general"  country="in" category="general"/>}/>
          <Route exact path="/health" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="health"  country="in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="science"  country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="sports"  country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress = {this.setProgress} pageSize={9} apiKey={apiKey} key="technology"  country="in" category="technology"/>}/>

        </Routes>

      </Router>
      
      </>
    )
  }
}

