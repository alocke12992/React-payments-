import React from 'react';
import {Grid, Header, Divider} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import Logo from './Logo'

const PaymentSuccess = ({location: {state}}) => {
  if (state && state.transactionId)
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row centered>
          <Logo />
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign='center' width={10}>
            <Header as='h1' color='green'>Thank You For Your Purchase!</Header>
            <p>You have been successfully charged: ${state.amount}</p>
            <p>Your Transcation Id is: {state.transactionId}</p>
            <Link to='/'>Start Over</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  else
    return (<Redirect to='/' />);
}

export default PaymentSuccess;