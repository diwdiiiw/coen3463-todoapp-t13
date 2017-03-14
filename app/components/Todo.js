import React, {PropTypes} from 'react';
import '../components/App.css';
import ToDos from '../components/ToDos.js';
import Loading from './loading';
import TodoApi from '../api/TodoApi';
var moment = require('moment-timezone');

const services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];
const libraries = [
    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},
];

class Todo extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
        }
        this.onAddTodo = this.onAddTodo.bind(this);
    }
    onAddTodo(e) {
        e.preventDefault();
        var lastState = this.props.items; //get last state of item
        let toDo = { //create a todo object to be saved
            name: this.refs.todo.value,
            user: this.props.user,
            createDate: moment().tz("Asia/Manila").format('LLL'),
        }
        this.setState({ //update items
            items :[...lastState,Object.assign({},toDo)]
        });
        TodoApi.onAddTodo(toDo).then(res=>{
            //this.props.set(todo);
            console.log(res.data.response);
            if(res.data.success){
                this.props.setStateItem([...lastState,Object.assign({},res.data.response)]);
                this.props.setOriginalItems();
                // alert("Todo added");
                // this.setState({isLoadingItem:false});
                return;
            }
            //this.setState({isLoadingItem:false});
            // toastr.error(res.data.response);
        }).catch(err=>{
            // toastr.error('Ooops! Try again');
            console.log(err);
        }); 
    }
    
    render(){
    return(
        <div className="App-section">
                
                {this.props.isLoading? 
                <Loading text="Please Wait" speed={300}/>
                :
                <div>
                <p>{this.props.name}</p>
                <p>{this.props.email}</p>
                {this.props.onCounting? <Loading text="Loading" speed={300}/>:
                <div>{(this.props.originalitems - this.props.completedCount)=== 1?
                <p>{this.props.originalitems - this.props.completedCount} item left</p>:
                <p>{this.props.originalitems - this.props.completedCount} items left</p>
                } </div>
                }
                <div className="row">
                    <div className="App-section text-center">
                    <button onClick={this.props.todoAll} size="small">All</button>
                    <button onClick={this.props.todoOpen} size="small">Open</button>
                    <button onClick={this.props.todoCompleted} size="small">Completed</button>
                    <button onClick={this.props.DelAllComplete}size="small">Clear Completed</button>
                    <form onSubmit={this.onAddTodo}>
                        <input placeholder="Add a To Do item." ref="todo"/>
                        <button type="submit" size="small">+</button>
                    </form>
                    </div>
                </div>
                <div className="App-section text-center">
                {this.props.onUpdate? <Loading text="Loading" speed={300}/>:
                    <div className="col-xs-3">
                    <ul>
                    {this.props.items.map((item, index)=>

                        <ToDos key={index}
                                item={item}
                                index={index}
                                onComplete={this.props.onComplete}
                                OnDelete={this.props.OnDelete}/>
                    )}
                    </ul>
                    </div>
                    }
                </div>
                <br/>
                <div>
                <button onClick={this.props.onLogOut} value="Logout">Logout</button>
                </div>
                </div>
                }
        </div>
    )
}
}

Todo.PropTypes = {
    onLogOut: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    
}
export default Todo;
