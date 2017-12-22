import React, { Component } from 'react';
import ListView from './components/ListView';
import Paginate from './components/Paginate';
import logo from './logo.svg';
import './App.css';

class App extends Component {
constructor(props) {
super(props);
this.state=({tasks:[
    ],
    filterTasks:[],
    page:1
});
this.makePagination= this.makePagination.bind(this);
this.getTaskData= this.getTaskData.bind(this);
}
makePagination(pageNum,countPage)   {
//var filterTasks = [];
// console.log(pageNum);
// let g = pageNum === 0?pageNum:pageNum-1;
//  this.state.tasks.forEach (
//      function (item,i)    {
//          if (i>=pageNum*countPage-g&&filterTasks.length<countPage)
//              filterTasks.push(item);
//                           });
this.setState({page:pageNum});
this.getTaskData(pageNum);
                                    }
getTaskData(page) {
    var context = this;
    fetch(`https://uxcandy.com/~shapoval/test-task-backend/?developer=Misha&page=${page+1}`).
    then(function(response)
        {
            if (response.status!==200) {
                return;
            }
            response.json().then(function(data)
                {
                    context.setState({tasks:data.message.tasks,length:data.message.total_task_count});
                    //context.makePagination(0,3);
                }
            );
        }
    )
        .catch(function(err){console.log(err)});
}
componentDidMount() {
this.getTaskData();
}
// componentDidUpdate() {
// this.getTaskData();
// }
  render() {
    return (
      <div className="App">
        <ListView tasks= {this.state.tasks} getTasks={this.getTaskData}/>
        <Paginate length={this.state.length} countPage={3} paginationContext={this.makePagination}/>

      </div>
            );
            }
}

export default App;
