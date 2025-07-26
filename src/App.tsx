import React from 'react';
import './App.scss';
import { Clock } from './Components/Clock';
import { AppStates } from './types/types';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class App extends React.Component {
  state: AppStates = {
    clockName: 'Clock-0',
    nameChangeTimer: 0,
    hasClock: true,
  };

  // This code starts a timer
  componentDidMount(): void {
    const nameChangeTimer = window.setInterval(() => {
      const newName = getRandomName();

      this.setState({ clockName: newName });
    }, 3300);

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
    });

    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });

    this.setState({ nameChangeTimer });
  }

  componentWillUnmount(): void {
    window.clearInterval(this.state.nameChangeTimer);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}
