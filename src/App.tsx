import React from 'react';
import logo from './logo.svg';
import Pagination from './components/pagination/pagination';
import './App.css';
import { ILabels } from './components/pagination/IPaginationProps';

class App extends React.Component {
  totalItems: number = 100;

  onChangePage = (pageNumber: number) => {
    let startIndex = (pageNumber - 1) * 10;
    let endIndex = Math.min(startIndex + 10 - 1, this.totalItems - 1);
    console.log(`startIndex: ${startIndex} endIndex: ${endIndex} pageNumber: ${pageNumber}`);
    // make api call, get the data and set to state
  }

  render() {
    const customLabels: ILabels = {
      first: '<<',
      last: '>>',
      previous: '<',
      next: '>'
    }
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <Pagination totalItems={this.totalItems} onChangePage={this.onChangePage} labels={customLabels} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
