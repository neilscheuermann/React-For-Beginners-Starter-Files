import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  }

  componentDidMount() {
    const { storeId } = this.props.match.params
    // First reinstate our localStorage
    const localStorageRef = localStorage.getItem(storeId)

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = fish => {
    // 1. Take a copy of the existing state.
    const fishes = { ...this.state.fishes }
    // 2. Add to or modify copied state.
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new fishes object to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. Get a copy of existing state.
    const order = { ...this.state.order }
    // 2. Either add to order or update number in order.
    order[key] = order[key] + 1 || 1
    // 3. Call setState to update our state object.
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                key={fish}
                index={fish}
                details={this.state.fishes[fish]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order order={this.state.order} fishes={this.state.fishes} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    )
  }
}

export default App
