import React from 'react';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';

class PhotoGrid extends React.Component {
    static propTypes = {
        selectedUser: PropTypes.object,
        photos: PropTypes.array
    };

    render() {
        let { selectedUser, photos } = this.props;

        return (
            <section className="content">
                {
                    selectedUser && photos.length > 0 ?
                        <Gallery photos={photos}/>
                    : selectedUser && photos.length==0 &&
                        <div className="no-image">No images found for the user</div>
                }
            </section>
        );
    }
}

export default PhotoGrid;
