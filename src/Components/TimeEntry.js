import React from "react";
import Timer from "./Timer";

class TimeEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5
        }

        this.changeBreakLength = this.changeBreakLength.bind(this);
        this.changeSessionLength = this.changeSessionLength.bind(this);
    }

    changeSessionLength(amount) {
        if (this.state.sessionLength > 1) {

            this.setState({
                sessionLength: this.state.sessionLength + (amount)
            });
        }
        else {
            if(amount > 0) {
                this.setState({
                    sessionLength: this.state.sessionLength + (amount)
                });
            }
        }
    }

    changeBreakLength(amount) {
        if (this.state.breakLength > 1) {
            this.setState({
                breakLength: this.state.breakLength + (amount)
            });
        }
        else {
            if(amount > 0) {
                this.setState({
                    breakLength: this.state.breakLength + (amount)
                });
            }
        }
    }

    render() {
        return (
            <div className="timeEntry">
                <divc className="header">
                    <h1>Pomodoro Clock</h1>
                </divc>
                <div className="breakLength">
                    <h3>Break Length</h3>
                    <button onClick={() => this.changeBreakLength(1)}><i class="fas fa-angle-up fa-3x"></i></button>
                    <h3>{this.state.breakLength}</h3>
                    <button onClick={() => this.changeBreakLength(-1)}><i class="fas fa-angle-down fa-3x"></i></button>
                </div>
                <div className="sessionLength">
                    <h3>Session Length</h3>
                    <button onClick={() => this.changeSessionLength(1)}><i class="fas fa-angle-up fa-3x"></i></button>
                    <h3>{this.state.sessionLength}</h3>
                    <button onClick={() => this.changeSessionLength(-1)}><i class="fas fa-angle-down fa-3x"></i></button>
                </div>
                <Timer sessionLength={this.state.sessionLength} breakLength={this.state.breakLength} />
            </div>
        )
    }
}

export default TimeEntry;