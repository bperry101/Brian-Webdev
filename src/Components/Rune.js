import React, { Component } from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import './Rune.css';
import brian from '../Images/brian.png'; 
import jack from '../Images/jack.png'; 
import jordan from '../Images/jordan.png'; 
import matt from '../Images/matt.png'; 
import michael from '../Images/michael.png'; 
import bg from '../Images/osrsbg.png';
import logo from '../Images/rune.png';
import music from '../Audio/osrsloginmusic.mp3';
import seashanty from '../Audio/ss2.mp3';
import { render } from '@testing-library/react';
class Rune extends Component {
  render() {
    return (
    <div className="rune">
      <div className="grid-pos">
        <Grid verticalAlign='middle' columns={5} padded centered>
          <Grid.Row>
            <Grid.Column>
            {/* Brian */}
            <Card>
              <Image src={brian} />
              <Card.Content>
                <Card.Header>
                  Brian Perry
                </Card.Header>
              </Card.Content>
            </Card>
            </Grid.Column>
​
            <Grid.Column>
            {/* Jack */}
            <Card>
              <Image src={jack} />
              <Card.Content>
                <Card.Header>
                  Jack Carton
                </Card.Header>
              </Card.Content>
            
          </Card>
          </Grid.Column>
​
          <Grid.Column>
          {/* Jordan */}
          <Card>
            <Image src={jordan} />
            <Card.Content>
              <Card.Header>
                Jordan Logan
              </Card.Header>
            </Card.Content>
          </Card>
          </Grid.Column>
​
          <Grid.Column>
          {/* Matt */}
          <Card>
            <Image src={matt} />
            <Card.Content>
              <Card.Header>
                Matt Heywood
              </Card.Header>
            </Card.Content>
          </Card>
          </Grid.Column>
​
          <Grid.Column>
          {/* Michael */}
          <Card>
            <Image src={michael} />
            <Card.Content>
              <Card.Header>
                Michael Potter
              </Card.Header>
            </Card.Content>
          </Card>
          </Grid.Column>
​
          {/* End Grid */}
          </Grid.Row>
​
          <Grid.Row>
            <Grid.Column>
            {/* Logo */}
              <Image src={logo} />
              <audio src={music} controls autoPlay/>
              <audio src={seashanty} controls />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </div>
    )
  }
}
export default Rune