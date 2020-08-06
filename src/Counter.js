import React, {Component} from "react";


class Counter extends Component{

    constructor(props){
        super(props)

        this.state = {
            counter:props.counter || 0 
        };
    }

    increment =()=>{
        let counterAttuale = this.state.counter
        const counter = counterAttuale +1
        this.setState({
            counter : counter //anche solo counter js 6
        })
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ counter }),
        };
        const _this = this;

        fetch('http://localhost:9000/counter', requestOptions)
            .then(response => response.json())
           
            .then(function(body){
                _this.setState({
                    counter : body.counter
                })
            });        
    };

    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
        };
        fetch('http://localhost:9000/counter', requestOptions)
            .then(response => response.json())
            .then(body =>this.setState({counter: body.counter}));   
    }

    render(){
          return(
            <div className="mt-3">
                 <button className="btn btn-primary" onClick={this.increment}>Numero Click</button>
                 <h3 className="mt-2">Il nostro conteggio: {this.state.counter}</h3>   
            </div>
          );
    }

}

export default Counter;