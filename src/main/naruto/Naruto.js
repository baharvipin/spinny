import { connect } from 'react-redux';
import React, { Component } from 'react';
import narutoAction from '../../store/naruto/narutoAction';
import Button from 'react-bootstrap/Button';
import utils from '../../utils/utils';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import GSpinner from '../../constants/component/spinner/GSpinner';
import GPagination from './GPagination';
import './Naruto.scss';

class Naruto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: this.props.narutoData.narutoData || [],
      itemShow: 9,
      pageNo: this.props.narutoData.pageNo || 1,
      count: 50
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  // lifecycle method start
  componentDidMount() {
    this.props.dispatch(
      narutoAction.fetchNarutoData(this.state.count, this.state.pageNo)
    );
    this.setState({
      ...this.state,
      suggestions: this.props.narutoData.narutoData
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNo !== this.state.pageNo) {
      this.setState({
        ...this.state,
        pageNo: this.state.pageNo
      });
      this.props.dispatch(narutoAction.invalidateNarutoData());
      this.props.dispatch(
        narutoAction.fetchNarutoData(this.state.count, this.state.pageNo)
      );
    }
  }

  // lifecycle method end

  // Handler function start
  handleSearchInput = value => {
    const suggestions = this.getNarutoData();
    this.setState({
      ...this.state,
      value: value
    });

    if (utils.isDataEmpty(value)) {
      this.setState({
        ...this.state,
        value: '',
        suggestions: suggestions
      });
    }
  };
  searchItems = () => {
    const { value } = this.state;
    const suggestions = this.getNarutoData();
    const items = suggestions.filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.setState({
      ...this.state,
      suggestions: items
    });
  };

  handleShowMore = () => {
    let { suggestions } = this.state;
    suggestions = suggestions || this.getNarutoData();
    this.setState({
      ...this.state,
      itemShow: this.state.itemShow + 9,
      suggestions: suggestions
    });
  };

  onChangePage(pageOfItems) {
    const { suggestions } = this.getNarutoData();
    // update state with new page of items
    this.setState({
      ...this.state,
      pageNo: pageOfItems,
      suggestions: suggestions
    });
  }

  // Handler function end

  // Getter function start
  getNarutoData() {
    if (
      utils.isDataEmpty(this.props.narutoData) ||
      utils.isDataEmpty(this.props.narutoData.narutoData)
    ) {
      return [];
    }

    return this.props.narutoData.narutoData;
  }

  renderDataNotFound() {
    return (
      <div className="common-margin text-center">
        <h2 style={{ fontSize: '50px', fontWeight: '800' }}>Oops...!</h2>
        <h3>No Data Found!</h3>
      </div>
    );
  }

  renderSearchExplore() {
    return (
      <div className="search">
        <Form.Group controlId="formBasicSearch">
          <InputGroup className="mb-3 skill-input">
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              size="lg"
              aria-describedby="basic-addon2"
              value={this.state.value || ''}
              onChange={e => this.handleSearchInput(e.target.value)}
            />
            <InputGroup.Append onClick={() => this.searchItems()}>
              <InputGroup.Text>Go</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </div>
    );
  }

  isDisabled() {
    const { suggestions, itemShow } = this.state;
    if (!utils.isDataEmpty(suggestions) && suggestions.length <= itemShow) {
      return true;
    }
    return false;
  }

  // Getter function end
  renderImage() {
    const { suggestions, itemShow } = this.state;
    const data = suggestions || this.getNarutoData();
    console.log('data', data.length);
    return (
      <div>
        <CardGroup>
          {!utils.isDataEmpty(data)
            ? data.map((item, index) => {
                return index < itemShow ? (
                  <Card key={'str_' + index}>
                    <Card.Img variant="top" src={item.image_url} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                ) : null;
              })
            : this.renderDataNotFound()}
        </CardGroup>
        {!utils.isDataEmpty(data) && this.renderButton()}
      </div>
    );
  }

  renderButton() {
    let isTrue = this.isDisabled();
    return (
      <div className="button">
        <Button
          variant="primary"
          disabled={isTrue}
          onClick={() => this.handleShowMore()}
        >
          SEE MORE
        </Button>
      </div>
    );
  }

  render() {
    return this.props.isFetching ? (
      <GSpinner variant="primary" />
    ) : (
      <div>
        {this.renderSearchExplore()}
        {this.renderImage()}
        <div className="text-center">
          <GPagination
            currentPage={this.state.pageNo}
            onChangePage={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { narutoData } = state;
  return {
    narutoData: narutoData,
    isFetching: narutoData.isFetching
  };
};

export default connect(mapStateToProps)(Naruto);
