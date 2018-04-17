import React, {Component} from 'react';
import {Dimmer, Loader, Segment, Grid} from 'semantic-ui-react';
import {setFlash} from '../actions/flash';
import {connect} from 'react-redux';
import {setHeaders} from '../actions/headers';
import {Redirect} from 'react-router-dom';
import braintree from 'braintree-web-drop-in';
import BraintreeDropin from 'braintree-dropin-react';
import BraintreeSubmitButton from './BraintreeSubmitButton';
import axios from 'axios';


class BraintreeDrop extends React.Component {
  state = {
    loaded: false,
    token: '',
    redirect: false,
    transactionId: '',
  };

  componentDidMount() {
    const {dispatch} = this.props
    axios.get ('/api/braintree_token')
      .then( ({data: token, headers}) => {
        dispatch(setHeaders(headers))
        this.setState({ token, loaded: true})
      })
      .catch( ({ headers}) => {
        dispatch(setHeaders(headers))
        dispatch(setFlash('Bad Stuff!', 'red'))
      })
  }

  handlePaymentMethod = (payload) => {
    const {dispatch, amount} = this.props;

    axios.post('/api/payment', {amount, ...payload})
      .then(res => {
        const {headers, data: transactionId} = res;
        dispatch(setHeaders(headers));
        this.setState({redirect: true, transactionId});
      })
      .catch(res => {
        dispatch(setFlash('Error Posting Payment. Try Again!', 'red'));
        dispatch(setHeaders(res.headers));
        window.location.reload();
      });
  }


  loading = () => {
    return(
      <Dimmer active>
        <Loader>
          Loading payment experience...
          </Loader>
      </Dimmer>
    )
  }

  brainTree = () => {
    const {token} = this.state;
    return (
      <Segment basic textAlign="center">
        <BraintreeDropin
          braintree={braintree}
          authorizationToken={token}
          handlePaymentMethod={this.handlePaymentMethod}
          renderSubmitButton={BraintreeSubmitButton}
        />
      </Segment>
    )
  }

  redirect = () => {
    const {transactionId} = this.state
    return (
      <Redirect to={{
        pathname: '/payment_success',
        state: {amount: this.props.amount, transactionId}
      }} />
    );
  }

  render() {
    const {loaded, redirect} = this.state
    return(
      <Grid centered>
        <Grid.Row centered>
          <Grid.Column width={10}>
          {redirect && this.redirect()}
          {
            loaded ? 
            this.brainTree()
            :
            this.loading()
          }
          </Grid.Column> 
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect()(BraintreeDrop);