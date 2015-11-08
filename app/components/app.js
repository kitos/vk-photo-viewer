import React from 'react';

import VKService from 'es6!services/vk-service';
import Friends from 'es6!components/friends';
import Images from 'es6!components/users-images';
import UnauthorizedBlock from 'es6!components/unauthorized-block';

export default class AppComponent extends React.Component {

    render() {
        return (
            this.state.loading ? <div className="message-block">Loading...</div>

                : this.state.session ?
                <div>
                    <Friends friends={this.state.friends} onSelectUser={this.onSelectUser.bind(this)}/>

                    <div className="right-container">
                        {this.state.selectedUserId ? <Images imgs={this.state.images}/>
                            : <div className="message-block">No user was selected.</div>}
                    </div>
                </div>

                : <UnauthorizedBlock onLogin={this.onLogin.bind(this)}/>
        );
    }

    componentWillMount() {
        var vk = new VKService(5114552);

        this.setState({vk, loading: true});
        vk.getLoginStatus()
            .catch(cause => {
                this.setState({loading: false});
                return Promise.reject(cause);
            })
            .then(session => {
                this.setState({session: session});
                this.loadFriends();
            });
    }

    onLogin() {
        this.setState({loading: true});
        this.state.vk.login()
            .then((session) => {
                this.setState({session});
                this.loadFriends()
            })
    }

    onSelectUser(selectedUser) {
        this.state.selectedUserId = selectedUser.uid;
        this.loadImages(selectedUser.uid);
        this.state.friends.forEach(friend => friend.selected = friend.uid === selectedUser.uid);
        this.forceUpdate();
    }

    loadFriends() {
        this.state.vk.getFriends(this.state.session.mid, ['photo_50', 'domain'])
            .then(friends => {
                this.setState({friends: friends, loading: false})
            });
    }

    loadImages(selectedUserId) {
        this.state.vk.getUserPhotos(selectedUserId)
            .then(r => {
                this.setState({images: r})
            })
    }
}