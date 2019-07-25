import React from 'react';
import PropTypes from 'prop-types';

class Sidebar extends React.Component {
    static propTypes = {
        findUserProfile : PropTypes.func,
        selectedUser: PropTypes.object
    };

    render() {
        let { findUserProfile, selectedUser } = this.props;

        return (
            <aside className="sidebar">
                <div className="sidebar__search-container">
                    <input
                        className="sidebar__search-container--search"
                        type="text"
                        onChange={(e)=>findUserProfile(e)}
                        placeholder="Search username"
                    />
                </div>
                {
                    selectedUser &&
                    <div className="sidebar__user-list-container">
                        <div className="sidebar__user-list-container--card">
                            <img className="avatar" src={selectedUser.profile_image.small} alt=""/>
                            <div className="info">
                                <span className="name">{selectedUser.first_name} {selectedUser.last_name}</span>
                                <span className="bio">{selectedUser.bio}</span>
                            </div>
                        </div>
                        {
                            selectedUser.tags && selectedUser.tags.custom.length > 0 &&
                            <div className="sidebar__user-list-container--interests">
                                <span className="title">Interests</span>
                                <div className="tags-container">
                                    {
                                        selectedUser.tags.custom.map(function(item){
                                            return <span className="tag" key={item.title}>{item.title}</span>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            </aside>
        );
    }
}

export default Sidebar;
