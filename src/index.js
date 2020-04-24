import './css/styles.css';
import gameController from './packages/gameController';
import gameBoard from './packages/gameBoard';

document.querySelector('#startGame').addEventListener('click', () => {
  gameController.startGame(gameBoard);
});
