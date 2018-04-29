console.log('dom')
const FunctionBlock = (props) => <p id={props.ElementId} style={props.style}>  {props.name} </p>;
const Button = (props) => <div id="btnholder"><input id="btnStart" onClick={props.clickHandler} type="submit" value="start"></input></div>;

const StackBlock = (props) => {
    let functionArr = props.functionArr;
    console.log('inside stackbloack', functionArr.length);

    if (functionArr.length > 0) {
        return (
            <div className="col-md-4 stack-section">
                <div className="stackHeader">Stack Table</div>
                <div id="stackbody">
                    {functionArr.map((func, index) => (
                        <FunctionBlock key={index} elementid={func.elementid} name={func.name} />
                    ))};
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="col-md-4 stack-section">
                <div className="stackHeader">Stack Table</div>
                <div id="stackbody">
                    <h6>No function in queue </h6>
                </div>
            </div>
        )
    }
};

class ExecutionDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.startExecution = this.startExecution.bind(this);
        this.executeMain = this.executeMain.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.first = this.first.bind(this);
        this.state = {
            functionArr: []
        }

    }
    forceUpdateHandler() {
        console.log('force');
    };

    componentDidUpdate(props) {
        console.log('component updated');
        var rootElement = document.getElementById('root');

        rootElement.style = "display:block";
    }
    startExecution() {
        this.executeMain();
    }
    executeMain() {
        let obj = {
            elementid: 'main',
            name: 'main()',
            style:{
                display:'block'
            }
        }
        delayExecution().then((message) => {
            this.setState(prevState => ({
                functionArr: [...prevState.functionArr, obj]
            }));
            this.first();
        });
    }
    first() {
        let obj = {
            elementid: 'first',
            name: 'first()',
            style:{
                display:'block'
            }
        }
        delayExecution().then((message) => {
            this.setState(prevState => ({
                functionArr: [...prevState.functionArr, obj]
            }));
        });
        console.log('first function executed');
    }

    second() {
        let obj = {
            elementid: 'second',
            name: 'second()'
        }
        let newArray = this.state.functionArr;
        newArray.push(obj);
        delayExecution().then((message) => {
            this.setState({
                functionArr: newArray
            });
        })
        console.log('second function executed ');
    }

    third() {
        let obj = {
            elementid: 'third',
            name: 'third()'
        }
        let newArray = this.state.functionArr;
        newArray.push(obj);
        delayExecution().then((message) => {
            this.setState({
                functionArr: newArray
            });
        })
        console.log('third function executed');
    }


    render() {
        console.log('render  ', this.state);
        return (
            <React.Fragment>
                <Button clickHandler={this.startExecution} />
                <StackBlock functionArr={this.state.functionArr} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <ExecutionDisplay />,
    document.getElementById('root')
);

function delayExecution() {
    return new Promise((resolve, reject) => {
        let d = new Date();
        let currentMS = d.getMilliseconds();
        let delayedTime = currentMS + 1000000000;
        while (currentMS < delayedTime) {
            currentMS++;
        }
        resolve('done');
    });
}