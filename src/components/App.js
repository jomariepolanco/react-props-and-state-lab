import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateType = (info) => {
    this.setState({filters: {type: info}})
  }

  getAllPets = () => {
    let endpoint = '/api/pets'
    if (this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}` 
    }
      
      fetch(endpoint)
      .then(r => r.json())
      .then(data => this.setState({pets: data}))
  }

  onAdoptPet = (id) => {
    let newArray = [...this.state.pets]
    let petObj = newArray.find(pet => pet.id === id)
    petObj.isAdopted = true 
    this.setState({pets: newArray})
  }

  render() {
    // console.log(this.state.pets, "in app")
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.updateType} onFindPetsClick={this.getAllPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
