import React from 'react';
import logo from './logo.svg';
import Pagination from './components/pagination/pagination';
import './App.css';
import { ILabels } from './components/pagination/IPaginationProps';

interface IState {
  exampleItems: any[];
  pageOfItems: any[];
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    let exampleItems: any[] = [];
    let i = 0;
    while (i < 100) {
      exampleItems.push({ id: (i + 1), name: 'Item ' + (i + 1) });
      i += 1;
    }

    this.state = {
      exampleItems: exampleItems,
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems: any[]) {
    this.setState({ pageOfItems: pageOfItems });
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
            {this.state.pageOfItems.map((item: any) =>
              <div key={item.id}>{item.name}</div>
            )}
            <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} labels={customLabels} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
