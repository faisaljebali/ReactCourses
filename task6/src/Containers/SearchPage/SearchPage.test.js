import React from 'react';
import {Provider} from 'react-redux'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import expect from 'expect';
import {mount} from 'enzyme';
import mainReducer from '../../Reducers/mainReducer';
import SearchPage from './SearchPage';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';

const initialState = {
    movies: [],
    sortBy: 'release_date',
    searchBy: 'title',
    searchText: ""
};

describe ('SearchPage', () => {

    it('should match snapshot with data', () => {

        const mock = new MockAdapter(axios);
        mock.onGet('https://reactjs-cdp.herokuapp.com/movies?').reply(200, {data: []});
        mock.onGet('https://reactjs-cdp.herokuapp.com/movies?searchBy=title&sortBy=release_date&sortOrder=desc').reply(200, {data: []});

        const state = {
            movies: [],
            sortBy: 'release_date',
            searchBy: 'title',
            searchText: ""
        };

        const store = createStore(mainReducer, initialState, applyMiddleware(thunkMiddleware));

        const component = renderer.create(
            <Provider store={store}>
                <Router>
                    <SearchPage />
                </Router>
            </Provider>
        );
        const json = component.toJSON();

        expect(json).toMatchSnapshot();
    });

    it('should handle store "movies" changes', () => {
        const searchText = "Star war";

        const expectedMovies =
            [
                {
                    id: 1,
                    title: "Star war",
                    poster_path: "http://www.theamazingpics.com/wp-content/uploads/2014/05/Amazing-Picture-of-A-Japanese-Garden-in-Portland-USA.jpg",
                    genres: ["horror"],
                    release_date: "2011-10-05T14:48:00.000Z"
                }
            ];

        const expectedStore = {
            movies: expectedMovies,
            sortBy: 'release_date',
            searchBy: 'title',
            searchText: searchText
        };

        const mock = new MockAdapter(axios);
        mock.onGet('https://reactjs-cdp.herokuapp.com/movies?').reply(200, {data: []});
        mock.onGet('https://reactjs-cdp.herokuapp.com/movies?searchBy=title&sortBy=release_date&sortOrder=desc').reply(200, {data: []});
        mock.onGet(`https://reactjs-cdp.herokuapp.com/movies?search=${searchText}&searchBy=title&sortBy=release_date&sortOrder=desc`).reply(200, {data: expectedMovies});

        const store = createStore(mainReducer, initialState, applyMiddleware(thunkMiddleware));

        const content = mount(
            <Provider store={store}>
                <Router>
                    <SearchPage />
                </Router>
            </Provider>
        );

        content.find('input.searchMovie').simulate('change', {target: {value: searchText}});
        const form = content.find('form').at(0);
        form.simulate('submit');

        setTimeout(() => {
            expect(store.getState()).toEqual(expectedStore);
        });
    });
});
