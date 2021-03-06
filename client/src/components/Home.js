import React, {Component} from 'react';
import {
  Header,
  Segment,
  Input,
  Label,
  Divider,
  Image,
  Grid,
} from 'semantic-ui-react';
import BraintreeDrop from './BraintreeDrop';
import Logo from './Logo'

class Home extends Component {
  state = {amount: 150.0}

  render() {
    const {amount} = this.state
    return (
      <Grid centered>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            <Header
              as="h1"
              textAlign="center"
            >
              React Payments
        </Header>
            <Logo />
            <Label color="green">
              Payment Amount
        </Label>
            <Input
              value={amount}
              disabled
              style={{fontSize: '18px'}}
            />
          </Grid.Column>
          <Divider vertical />
          <Grid.Column>
            <BraintreeDrop amount={amount} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;

//https://farm1.staticflickr.com/909/39713108170_7198ebbb81_o.jpg