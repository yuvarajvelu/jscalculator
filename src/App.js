import React from 'react';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked : "",
            result : "0",
            currentno : "",
            operation : ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClr = this.handleClr.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
    }
    handleClick(event) {
        if((this.state.clicked==="")||(this.state.operation!=="")) {
            this.setState({
                result : "",
                operation : ""
            })
        }
        let clickedStr = this.state.currentno;
        let clickedVal = event.target.innerText;
        if(this.state.clicked.indexOf("=")>-1) {
            this.setState(state=>({
                clicked: clickedVal,
                result: clickedVal,
                currentno: ""
            }))
        } else if((clickedStr==="0")&&(clickedVal==="0")) {
            this.setState(state=>({
                clicked: "0",
                result:"0",
                currentno:"0"
            }))
        } else if((clickedStr.indexOf(".")>-1) && (clickedVal===".")) {
            this.setState(state=>({
                clicked: state.clicked,
                result: state.result,
                currentno: state.currentno
            }))
        } else {
            this.setState(state=>({
                clicked: state.clicked + clickedVal,
                result: state.result + clickedVal,
                currentno: state.currentno + clickedVal
            }))
            
        }
    }
    handleOperation(event) {
        
        let clickedStr = this.state.operation;
        let clickedVal = event.target.innerText;
        if(this.state.clicked.indexOf("=")>-1) {
            this.setState(state=>({
                clicked: state.result,
                result: clickedVal,
                operation: clickedVal
            }))
        } 
        if((this.state.result==="0") || (this.state.currentno!=="")) {
            this.setState({
                result : "",
                currentno : ""
            })
        } 
        if(clickedStr==="") {
            this.setState(state=>({
                clicked: state.clicked + clickedVal,
                result: state.result + clickedVal,
                operation: state.operation + clickedVal
            }))
        } else if((clickedVal==="-")&&(clickedStr!=="-")) {
            this.setState(state=>({
                clicked: state.clicked + clickedVal,
                result: state.result + clickedVal,
                operation: state.operation + clickedVal
            }))
        } else if (clickedStr.length===2) {
            this.setState(state=>({
                clicked: state.clicked.slice(0,state.clicked.length-2) + clickedVal,
                result: clickedVal,
                operation: clickedVal
            }))
        } else {
            console.log(clickedStr)
            this.setState(state=>({
                clicked: state.clicked.slice(0,state.clicked.length-1) + clickedVal,
                result: clickedVal,
                operation: clickedVal
            }))
        }
    }
    handleClr() {
        this.setState({
            clicked : "",
            result : "0",
            currentno : "",
            operation : ""
        })
    }
    handleEqual() {
        let str = this.state.clicked;
        let l = str.length;
        let reg = /[-+*/]/;
        let reg2 = /[+*/]/;
        let nwStr = "";
        if(reg.test(str[l-1])) {
            nwStr = str.slice(0,l-1);
        } else if(reg2.test(str[0])){
            nwStr = str.slice(1,l);
          }  else {
            nwStr = str.slice();
        }
        if(typeof(parseInt(nwStr))==='number') {
        
            this.setState({
                result : nwStr,
                clicked : nwStr
            })
        }
        let s = nwStr.split(/[-|+|*|/]/)

        let x = nwStr.split(/\d/)
        let n = [];
        for(let i =0 ;i< x.length;i++) {
        if(x[i]!==''&&x[i]!==".") {
        n.push(x[i])
        }
        }
        if(nwStr[0]==="-") {
        s.shift();
        s[0] = -s[0]
        n.shift()
        }
        for(let i = 0;i< nwStr.length;i++) {
        if(nwStr[i]==="*"||nwStr[i]==="+"||nwStr[i]==="/") {
        if(nwStr[i+1]==="-"){
        let w = n.indexOf(nwStr[i]+"-")
        n[w] = nwStr[i]
        let r = s.indexOf("");
        s.splice(r,1);
        s[r] = -s[r]
        }
        }
        }  
        let round =((result)=>{
            if(result<0) {
                return -Math.abs(result);
            } else {
                return Math.abs(result);
            }
        })
        let res;
        do {
        let a = n.indexOf("*")  
        if(a!==-1) {
        res = (parseFloat(s[a]) * parseFloat(s[a+1])).toFixed(5);
        let result = round(res);
        s.splice(a,2,result);
        n.splice(a,1)
        } 
        a = n.indexOf("/")
        if(a!==-1) {
        res = (parseFloat(s[a]) / parseFloat(s[a+1])).toFixed(5);
        let result = round(res);
        s.splice(a,2,result);
        n.splice(a,1);

        } 
        a = n.indexOf("-")
        if(a!==-1) {
        res = (parseFloat(s[a]) - parseFloat(s[a+1])).toFixed(5);
        let result = round(res);
        s.splice(a,2,result);
        n.splice(a,1)
        }
        a = n.indexOf("+")
        if(a!==-1) {
        res = (parseFloat(s[a]) + parseFloat(s[a+1])).toFixed(5);
        let result = round(res);
        s.splice(a,2,result);
        
        n.splice(a,1)

        } 
        }while(n.length)
        this.setState({
            result : s
        })
        this.setState(state=>({
            clicked : state.clicked + "=" + state.result
        }));
    }
    render() {
        return(
            <div className="app">
            <div id="calculator" className="jscalculator">
                <section className ="cal-display">
                    <span id="operation-display">{this.state.clicked}</span>
                    <p id="display" className="results">{this.state.result}</p>   
                    <button id="clear" className ="clear-display btn" onClick={this.handleClr}>AC</button>
                    <button id="divide" className ="division btn" onClick={this.handleOperation}>/</button>
                    <button id="multiply" className ="multiplication btn" onClick={this.handleOperation}>*</button>
                    <button id="nine" className="btn" onClick={this.handleClick}>9</button>
                    <button id="eight" className="btn" onClick={this.handleClick}>8</button>
                    <button id="seven" className="btn" onClick={this.handleClick}>7</button>
                    <button id="subtract" className="subtraction btn" onClick={this.handleOperation}>-</button>
                    <button id="six" className="btn" onClick={this.handleClick}>6</button>
                    <button id="five" className="btn" onClick={this.handleClick}>5</button>
                    <button id="four" className="btn" onClick={this.handleClick}>4</button>
                    <button id="add" className="addition btn" onClick={this.handleOperation}>+</button>
                    <button id="three" className="btn" onClick={this.handleClick}>3</button>
                    <button id="two" className="btn" onClick={this.handleClick}>2</button>
                    <button id="one" className="btn" onClick={this.handleClick}>1</button>
                    <button id="equals" className="equal btn" onClick={this.handleEqual}>=</button>
                    <button id="zero" className="btn" onClick={this.handleClick}>0</button>
                    <button id="decimal" className="btn" onClick={this.handleClick}>.</button>
                </section>
            </div>
            
            </div>
            
        )
    }    
}


export default App;
