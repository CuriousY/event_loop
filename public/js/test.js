const ExternalLib = {
    addPoint: function (el, point) {
        console.log('insdie ExternalLib'); 
        var li = document.createElement("li");
        li.innerHTML = point;
        el.appendChild(li);        
        console.log('ExternalLib EL' , el);
    }
}

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

class Child extends React.Component {

    componentDidMount() {
    }

    componentDidUpdate() {

        this.renderPoints();
    }

    renderPoints() {
        const el = this.refs.points;
        el.innerHTML = '';
        console.log('renderpoints ', this.props.points);
        this.props.points.forEach(function (point) {
            ExternalLib.addPoint(el, point);
        });
    }

    render() {
        console.log('render')
        return (
            <div>
                <ul ref="points"></ul>
            </div>
        );
    }
}

class Parent extends React.Component {

    constructor() {

        super();

        this.state = {
            points: []
        };
    }

    addPoint() {
        const points = this.state.points.slice();
        points.push((new Date()).getTime());
        delayExecution().then((message) => {
            this.setState({
                points: points
            });
            this.first();
        });

    }

    first() {
        const points = this.state.points.slice();
        points.push((new Date()).getTime());
        delayExecution().then((message) => {
            this.setState({
                points: points
            });
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.addPoint.bind(this)}>Add Point</button>
                <Child points={this.state.points} />
            </div>
        );
    }
}

ReactDOM.render(
    <Parent />,
    document.getElementById('root')
);
