export default class VKService {

    constructor(apiId) {
        VK.init({apiId: apiId});
        this.api = VK.Api;
        this.auth = VK.Auth;
    }

    apiCall(method, params) {
        return new Promise((resolve, reject) => {
            this.api.call(method, params, r => {
                if (r.response) {
                    console.info(JSON.stringify(r.response));
                    resolve(r.response)
                } else {
                    console.error(JSON.stringify(r));
                    reject('error');
                }
            });
        });
    }

    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.auth.getLoginStatus(response => response.session ? resolve(response.session) : reject('unauthorized'))
        });
    }

    login() {
        return new Promise((resolve, reject) => {
            this.auth.login(response => response.session ? resolve(response.session) : reject('login canceled'))
        });
    }

    getFriends(user_id, fields) {
        return this.apiCall('friends.get', {
            user_id,
            fields
        });
    }

    getUserPhotos(user_id) {
        return this.apiCall('photos.getUserPhotos', {user_id});
    }
}