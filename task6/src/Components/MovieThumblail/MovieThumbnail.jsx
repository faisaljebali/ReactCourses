import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './MovieThumbnail.scss';


class MovieThumbnail extends Component {

    getYear(isoDate) {
        return new Date(isoDate).getFullYear();
    }

    renderGenres(arr) {
        return arr.map((item) => (<span className="genres" key={item}>{item}</span>));
    }

    render() {
        const {poster_path, title, release_date, genres} = this.props.movie;

        return (
            <div className="movieThumbnailContainer">
                <Link to={"/film/" + this.props.movie.id} className="link-wrapper">
                    <div className="poster"><img src={poster_path} alt="poster"/></div>
                    <div className="title-year">
                        <div> {title}</div>
                        <span>{this.getYear(release_date)}</span>
                    </div>
                    <div>{this.renderGenres(genres)}</div>
                </Link>
            </div>

        )
    }
}

MovieThumbnail.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieThumbnail;
