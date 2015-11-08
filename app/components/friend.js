import React from 'react';

export default class Friend extends React.Component {

    render() {
        return (
            <div className={'friend' + (this.props.online ? ' friend--online' : '')
            + (this.props.selected ? ' friend--selected' : '')}
                 onClick={this.props.onClick}>
                <a href={`//vk.com/${this.props.domain}`}>
                    <img src={this.props.photo_50} alt={this.getFullName()}/>
                </a>
                <a href={`//vk.com/${this.props.domain}`} className="friend-name">
                    {this.getFullName()}
                </a>
            </div>
        );
    }

    getFullName() {
        return `${this.props.first_name} ${this.props.last_name}`;
    }
}