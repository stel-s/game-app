import React from 'react';
import './cards.css';
import { useSelector, useDispatch } from 'react-redux';

interface ICardsProps {
  selected?: boolean;
  rank: string;
  suit: string;
  weight: number;
  visible: boolean;
  selectCard?: any;
}

export interface ICard {
  rank: string;
  suit: string;
  weight: number;
}
interface ICardSimpleProps {
  rank: string;
  suit: string;
  weight: number;
  visible: boolean;
  selectCard?: any;
}
const CardBody = ({ rank, suit }) => {
  return (
  <span>
    <span className="rank">{rank}</span>
    <span className="suit" dangerouslySetInnerHTML={{__html: `&${suit};`}}></span>
  </span>
  );
};



const CardSimple: React.FC<ICardSimpleProps>  = ({ rank, suit, weight, visible, selectCard }) => {
  const card = visible ? `card rank-${rank.toLowerCase()} ${suit}`: `card back`;
  return  (
    <span className={card} onClick={() => selectCard({rank, suit, weight})}>
      <CardBody rank={rank} suit={suit} />
    </span>
  ) 
};

const Card: React.FC<ICardsProps> = (props) => {
  const { selected } = props;
  const card = <CardSimple {...props} />;
  return selected ? <strong>{card}</strong> : card;
};

export default Card;