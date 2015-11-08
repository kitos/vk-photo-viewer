import React from 'react';
import VKService from 'es6!services/vk-service';

export default class UsersImages extends React.Component {

    render() {
        return (
            <div className="image-block">
                {this.props.imgs && this.props.imgs.map(img => <img key={img.pid} src={img.src} alt=""/>)}
            </div>
        );
    }
}