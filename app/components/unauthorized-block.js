import React from 'react';
import VKService from 'es6!services/vk-service';

export default class UnauthorizedBlock extends React.Component {

    render() {
        return (
            <div>
                <h2>You are not authorized.</h2>

                <div id='vk-auth-btn-wrap' onClick={this.login.bind(this)}></div>
            </div>
        );
    }

    login() {
        this.props.vk.login()
            .then(this.props.onLogin);
    }

    componentDidMount() {
        VK.UI.button('vk-auth-btn-wrap');
    }
}