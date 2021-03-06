import React from 'react';
import PropTypes from 'prop-types';

import './LineResultMovieList.scss';

const LineResultMovieList = ({moviesCount, sortBy, sortByChanged}) => {
    const sortByReleaseDate = () => sortByChanged('release_date');
    const sortByRating = () => sortByChanged('vote_average');

    return moviesCount === null || sortBy === null
        ? null
        : <div className="lineResultContainer">
            <span>{moviesCount} movies found</span>
            <span className="sortByWrapper">
            <span>Sort by</span>
            <span
                id="sortByRelease"
                className={(sortBy === "release_date")? "active" : null}
                onClick={sortByReleaseDate}
            >release date</span>
            <span
                  id="sortByRating"
                  className={(sortBy === "vote_average")? "active" : null}
                  onClick={sortByRating}
            >rating</span>
            </span>
        </div>
};

LineResultMovieList.propTypes = {
    moviesCount: PropTypes.number,
    sortBy:  PropTypes.string,
    sortByChanged: PropTypes.func,
};

export default LineResultMovieList;
