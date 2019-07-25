import React from 'react';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';

class PhotoGrid extends React.Component {
    static propTypes = {
        photos: PropTypes.array
    };

    render() {
        let { photos } = this.props;

        return (
            <section className="content">
                <Gallery photos={photos}/>
            </section>
        );
    }
}

export default PhotoGrid;
