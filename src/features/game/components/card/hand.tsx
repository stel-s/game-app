import React from 'react';
import Card from './Card';
var _ = require('lodash');
// import { connect } from 'react-redux';

let keyId = 0;
const Hand: React.FC<any> = (props) => {
  const { hand, visible } = props;
  return (
    <div className="playingCards simpleCards">
      {/* {hand.map(({rank, suit, weight}) => (
        <Card rank={rank} suit={suit} weight={weight} key={`Hand-id-${keyId++}`}
          visible={visible} />
      ))} */}
    </div>
  )
}

// export default connect(
//   (state) => ({
//     cardsToChange: state.cardsToChange
//   })
// )(Hand);
export default Hand;
