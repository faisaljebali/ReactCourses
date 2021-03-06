// @flow
import React, {Component} from 'react';
import injectSheet from 'react-jss';

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '180px',
        paddingLeft: '30px',
        backgroundColor: '#333736',
        color: 'white'
    },
    netflex: {
        color: '#c15d69'
    },

    titleFind: {
        fontFamily: 'Arial',
        fontSize: '12px',
        fontWeight: 600,
        color: 'white'
    },

    inputContainer: {
        width: '96%',
        borderBottom: '2px solid #c15d69'
    },
    searchTitle: {
        fontSize: '12px',
        fontWeight: 600,
        marginRight: '20px',
    },

    searchMovie: {
        width: '100%',
        height: '40px',
        paddingLeft: '20px',
        boxSizing: 'border-box',
        color: 'white',
        backgroundColor: 'black',
        border: 'none',
        outline: 'none'
    },

    filterContainer: {
        width: '96%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        color: 'white'
    },
    filterOptionsContainer: {
        display: 'flex'
    },

    button: {
        backgroundColor: 'darkgray',
        marginRight: '20px',
        padding: '10px 15px',
    },

    activeButton: {
        backgroundColor: '#c15d69',
        padding: '10px 15px',
        color: 'white',
        border: 'none',
        outline: 'none'
    },
    search: {
        height: '30px',
        width: '170px',
        color: 'white',
        backgroundColor: '#f45364',
        border: 'none',
        outline: 'none'
    }
};

type Props = {
    searchText: string,
    searchBy: string,
    searchTextChanged: (searchText: string) => void,
    searchByChanged:(searchBy: string) => void,
    search: (searchText: string, searchBy: string) => void,
    classes: {
        header: {},
        netflex: {},
        titleFind: {},
        inputContainer: {},
        searchTitle: {},
        searchMovie: {},
        filterContainer: {},
        filterOptionsContainer: {},
        button: {},
        activeButton: {},
        search: {}
    }
};

class Header extends Component<Props> {

    setSearchBy = (searchBy) => {
        const {searchByChanged} = this.props;

        searchByChanged(searchBy);
    };

    handleSearchByTitle = () => this.setSearchBy("title");
    handleSearchByGenre = () => this.setSearchBy("genres");

    handleInputChange = (event) => {
        const {searchTextChanged} = this.props;
        searchTextChanged(event.target.value);
    };

    handleSubmit = (e) => {
        const {search, searchText, searchBy} = this.props;

        e.preventDefault();
        search(searchText, searchBy);
    };

    render() {

        const {searchText, searchBy, classes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className={classes.header}>
                    <span className={classes.netflex}>netflexroulette</span>
                    <span className={classes.titleFind}>FIND YOUR MOVIE</span>
                    <div className={classes.inputContainer }>
                        <input
                            className={classes.searchMovie}
                            placeholder="search your movie"
                            value={searchText}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={classes.filterContainer }>
                        <div className={classes.filterOptionsContainer}>
                            <span className={classes.searchTitle}>SEARCH BY</span>
                            <button
                                id="title"
                                type="button"
                                className= { [ classes.button,((searchBy === "title") ?  classes.activeButton  : null)].join(' ') }
                                onClick={this.handleSearchByTitle}
                            >TITLE
                            </button>
                            <button
                                id="genre"
                                type="button"
                                className= {  [classes.button, ((searchBy === "genres") ? classes.activeButton : null)].join(' ') }
                                onClick={this.handleSearchByGenre}
                            >GENRE
                            </button>
                        </div>
                        <button className={classes.search}>SEARCH</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default injectSheet(styles)(Header);