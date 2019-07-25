import React from 'react';
import Sidebar from './sidebar/Sidebar';
import PhotoGrid from './photoGrid/PhotoGrid';
import Footer from './footer/Footer';
import { toJson } from "unsplash-js";
import './App.scss';

// require syntax
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
    applicationId: "c0bcdb01ab155b7f9f8ea31b4559b9686fc13695cefb2296ed225f3f4c4fe8e8",
    secret: "1bee5515432944f9ea2fb19dd373f310fdbbf0124833160cb7e3b752e38643b8"
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedUser : null,
          selectedUserPhotos: []
        };

        this.findUserProfile = this.findUserProfile.bind(this);
        this.getSelectedUserPhotos = this.getSelectedUserPhotos.bind(this);
    }

    componentDidMount() {

    }

    findUserProfile(e) {
        let value = e.target.value.toLowerCase();
        let that = this;

        if(value) {
            unsplash.users.profile(value)
                .then(toJson)
                .then(json => {
                    console.log(json);
                   if(json && !json.errors) {
                       that.setState({selectedUser: json}, that.getSelectedUserPhotos);
                   } else {
                       that.setState({selectedUser: null});
                   }
                });
        }
    }

    getSelectedUserPhotos() {
        let { selectedUser } = this.state;
        let that = this;

        unsplash.users.photos(selectedUser.username, 1, 10, "popular", false)
            .then(toJson)
            .then(json => {
                if(json && !json.errors && json.length >0 ) {
                    let photos = json.map(function(item) {
                       return {
                           width: item.width,
                           height: item.height,
                           src: item.urls.regular
                       }
                    });
                    that.setState({selectedUserPhotos: photos});
                } else if (!json.errors && json.length === 0) {
                    that.setState({selectedUserPhotos: []});
                }
            });
    }


    render() {
        let { selectedUserPhotos, selectedUser } = this.state;

        return (
            <main>
                <div className="flex-container wrapper">
                    <Sidebar findUserProfile={this.findUserProfile} selectedUser={selectedUser}/>
                    <PhotoGrid
                        selectedUser={selectedUser}
                        photos={selectedUserPhotos}/>
                </div>
                <Footer/>
            </main>
        );
    }
}

export default App;
