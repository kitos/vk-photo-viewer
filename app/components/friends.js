import React from 'react';
import Friend from 'es6!components/friend';

export default class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {search: ''};
    }

    render() {
        return (
            <div className="friend-block">
                <div className="search-block">
                    <input type="text" placeholder="Search..." className="input search-block__input"
                           onChange={this.handleSearchChange.bind(this)}/>
                    <label className="search-block__only-online">
                        <input type="checkbox" className="only-online-checkbox"
                               onChange={this.handleOnlyOnlineChange.bind(this)}/>
                        <span className="only-online-text">Only online</span>
                    </label>
                </div>
                <ul className="friend-list">
                    {this.props.friends
                        .filter(this.filterFriends.bind(this))
                        .map((friend, i) =>  (
                            <li className="friend-list__item" key={friend.uid}>
                                <Friend {...friend} onClick={this.onUserSelect.bind(this, i)}/>
                            </li>)
                        )}
                </ul>
            </div>
        );
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
    }

    handleOnlyOnlineChange(event) {
        this.setState({onlyOnline: event.target.checked})
    }

    filterFriends(friend) {
        return (friend.online || !this.state.onlyOnline)
            && JSON.stringify(friend)
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) > -1
    }

    onUserSelect(userIndex) {
        this.props.onSelectUser(this.props.friends[userIndex]);
    }
}