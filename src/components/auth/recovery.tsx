import React, {Component} from 'react';
import API from "../../service/apiService";
import  {Link} from "react-router-dom";
interface State {
    message?: any,
    email?:string,
    pass?: string,
    pass2?: string
}

class Recovery extends Component<{},State> {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = event => {
        this.setState({'message': ""});
        event.preventDefault();
        if (this.state.pass === this.state.pass2) {
            API.recoveryPass(this.state)
                .then(r => {
                    switch (r.response.status) {
                        case 200: {
                            document.location.pathname = "/login";
                            break;
                        }
                        case 400: {
                            let _tmp = '';
                            if (r.json.errors.password)
                                _tmp += r.json.errors.password + "\n";
                            else if (r.json.errors.confirmationPassword)
                                _tmp += r.json.errors.confirmationPassword + "\n";

                            this.setState({'message': _tmp});
                            break;
                        }
                    }
                    console.log(r.response.status);
                })
                .catch(error => console.log(error))
        }else {
            this.setState({'message': "Password confirmation does not match password"});
        }
    };

    render() {
        return (
            <form className="form-auth" onSubmit={this.handleSubmit}>
                <img src="./laptop.jpg" alt=""/>
                <div className="form__inputs">
                    <h2>Recovery</h2>
                    <input required type="email" name="email" id="email" onChange={this.handleChange} placeholder="Email"/>
                    <input minLength={5}  maxLength={255} required type="password" name="pass" onChange={this.handleChange} placeholder="New password"/>
                    <input minLength={5}  maxLength={255} required type="password" name="pass2" onChange={this.handleChange} placeholder="Confirm password"/>
                    <button type="submit" onSubmit={this.handleSubmit}>Recovery</button>
                    <p className="message-error">{this.state.message}</p>
                    <Link to="/">Have account?</Link> <br/>
                    <Link to="/sing-up">Create your account</Link>
                </div>
            </form>
        )
    }
}

export default Recovery;