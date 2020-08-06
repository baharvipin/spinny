import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { Component } from 'react';

import GSpinner from '../../constants/component/spinner/GSpinner';
import narutoAction from '../../store/naruto/narutoAction';
import utils from '../../utils/utils';

import './Naruto.scss';

class Naruto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: this.props.narutoData.narutoData || [],
      itemShow: 49,
      pageNo: this.props.narutoData.pageNo || 1,
      count: 55,
      newData: []
    };
  }

  // lifecycle method start
  componentDidMount() {
    const { newData } = this.state;
    this.props.dispatch(
      narutoAction.fetchNarutoData(this.state.count, this.state.pageNo, newData)
    );
    this.setState({
      ...this.state,
      suggestions: this.props.narutoData.narutoData
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { newData } = this.state;
    if (prevState.pageNo !== this.state.pageNo) {
      this.setState({
        ...this.state,
        pageNo: this.state.pageNo
      });
      this.props.dispatch(narutoAction.invalidateNarutoData());
      this.props.dispatch(
        narutoAction.fetchNarutoData(
          this.state.count,
          this.state.pageNo,
          newData
        )
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
    let { pageNo } = this.state;
    this.setState({
      ...this.state,
      itemShow: this.state.itemShow + 49,
      pageNo: pageNo + 1,
      newData: [...this.getNarutoData()],
      value: '',
      suggestions: undefined
    });
  };

  // Handler function end

  // Getter function start
  getNarutoData() {
    if (
      !utils.isDataEmpty(this.props.narutoData) &&
      !utils.isDataEmpty(this.props.narutoData.narutoData)
    ) {
      return this.props.narutoData.narutoData;
    }
    return [];
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
    const { pageNo } = this.state;
    if (pageNo > 30) {
      return true;
    }
    return false;
  }

  // Getter function end
  renderImage() {
    const { suggestions, itemShow } = this.state;
    const data = suggestions || this.getNarutoData();
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
          LOAD MORE
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
