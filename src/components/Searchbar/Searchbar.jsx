import PropTypes from 'prop-types';

import { Component } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  SearchForm,
  Header,
  Button,
  BtnLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      Notify.info('Uuups! You have search images and photos!!!');
      return;
    }

    this.props.handleSearchFormSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <BtnLabel>Search</BtnLabel>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
};
