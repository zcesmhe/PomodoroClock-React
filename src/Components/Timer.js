import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLengthSecs: this.props.sessionLength * 60,
            breakLengthSecs: this.props.breakLength * 60,
        }

        this.initialSessionLengthSecs = this.props.sessionLength * 60;
        this.initialBreakLengthSecs = this.props.breakLength * 60;

        this.getSessionMinsRemaining = this.getSessionMinsRemaining.bind(this);
        this.getSessionSecsRemaining = this.getSessionSecsRemaining.bind(this);
        this.getBreakMinsRemaining = this.getBreakMinsRemaining.bind(this);
        this.getBreakSecsRemaining = this.getBreakSecsRemaining.bind(this);
        this.play = this.play.bind(this);
        this.countdown = this.countdown.bind(this);
        this.pause = this.pause.bind(this);
        this.reset = this.reset.bind(this);
    }

    getSessionMinsRemaining() {
        return (this.state.sessionLengthSecs - (this.getSessionSecsRemaining())) / 60;
    }

    getSessionSecsRemaining() {
        return this.state.sessionLengthSecs % 60;
    }

    getBreakMinsRemaining() {
        return (this.state.breakLengthSecs - (this.getBreakSecsRemaining())) / 60;
    }

    getBreakSecsRemaining() {
        return this.state.breakLengthSecs % 60;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sessionLengthSecs: nextProps.sessionLength * 60,
            breakLengthSecs: nextProps.breakLength * 60
        });

        this.initialSessionLengthSecs = nextProps.sessionLength * 60;
        this.initialBreakLengthSecs = nextProps.breakLength * 60;
    }

    componentWillUpdate() {
        if(this.state.breakLengthSecs === 0) {
            this.reset();
            this.play();
        }
    }

    play() {
        this.interval = setInterval(this.countdown, 1000);
    }

    countdown() {
        if (this.state.sessionLengthSecs === 0) {
            this.setState({
                breakLengthSecs: this.state.breakLengthSecs - 1
            });
        }
        else {
            this.setState({
                sessionLengthSecs: this.state.sessionLengthSecs - 1
            });
        }
    }

    pause() {
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.setState({
            sessionLengthSecs: this.initialSessionLengthSecs,
            breakLengthSecs: this.initialBreakLengthSecs
        });

    }

    render() {

        var mins;
        var secs;

        if (this.state.sessionLengthSecs === 0) {
            mins = ("0" + this.getBreakMinsRemaining()).slice(-2);
            secs = ("0" + this.getBreakSecsRemaining()).slice(-2);

            return (
                <div className="timer">
                    <h3>Break</h3>
                    <h3>{mins + ":" + secs}</h3>
                    <button onClick={this.play}>Play</button>
                    <button onClick={this.pause}>Pause</button>
                    <button onClick={this.reset}>Reset</button>
                </div>
            )
        }

        else {
            mins = ("0" + this.getSessionMinsRemaining()).slice(-2);
            secs = ("0" + this.getSessionSecsRemaining()).slice(-2);

            return (
                <div className="timer">
                    <h3>Session</h3>
                    <h3>{mins + ":" + secs}</h3>
                    <button onClick={this.play}><i class="fas fa-play fa-3x"></i></button>
                    <button onClick={this.pause}><i class="fas fa-pause fa-3x"></i></button>
                    <button onClick={this.reset}><i class="fas fa-undo fa-3x"></i></button>
                </div>
            )
        }
    }
}




export default Timer;