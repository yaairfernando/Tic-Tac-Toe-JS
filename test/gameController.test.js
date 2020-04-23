import gameController from '../src/packages/gameController';
import gameBoard from '../src/packages/gameBoard';

describe('The gameController should', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="winMessage"></div>
      <div class="main__messages"></div>
      <div class="player"></div>
      <div class="alert"></div>
      <input id="playerOne" />
      <input id="playerTwo" />
      <div class="main__container">
        <div class="main__container__square">o</div>
        <div class="main__container__square">x</div>
        <div class="main__container__square">x</div>
        <div class="main__container__square"></div>
      </div>
    `;
  });

  test('be an object', () => {
    expect(typeof gameController).toEqual('object');
  });
  describe('play with the selected square and', () => {
    it('should fail if the square is already taken', () => {
      const alert = document.querySelector('.alert');
      document.querySelector('#playerOne').value = 'Yair';
      document.querySelector('#playerTwo').value = 'Joseph';
      gameController.startGame(gameBoard);
      gameBoard.squares = [
        { innerText: 'o' },
        { innerText: 'x' },
        { innerText: 'o' },
        { innerText: '' },
        { innerText: '' },
      ];
      gameController.brd = gameBoard;
      gameController.play(2);
      expect(alert.firstElementChild.innerHTML).toEqual('Please select a valid square!!');
      alert.firstElementChild.innerHTML = '';
    });
    it('should succeed if the square is not already taken', () => {
      const alert = document.querySelector('.alert');
      document.querySelector('#playerOne').value = 'Yair';
      document.querySelector('#playerTwo').value = 'Joseph';
      gameController.startGame(gameBoard);
      gameBoard.squares = [
        { innerText: 'x' },
        { innerText: 'x' },
        { innerText: 'o' },
        { innerText: '' },
      ];
      gameController.brd = gameBoard;
      gameController.play(3);
      expect(alert.firstElementChild.innerHTML).toEqual('');
    });
    it('should win if you have 3 in a row', () => {
      document.querySelector('#playerOne').value = 'Yair';
      document.querySelector('#playerTwo').value = 'Joseph';
      gameController.startGame(gameBoard);
      gameBoard.boardArray = [
        { name: 'Yair', num: 3 },
        { name: 'Yair', num: 1 },
      ];
      gameBoard.squares = [
        { innerText: 'x' },
        { innerText: 'x' },
        { innerText: '' },
      ];
      gameController.brd = gameBoard;
      gameController.play(2);
      const winMessage = document.querySelector('.winMessage p');
      expect(winMessage.innerHTML).toEqual('Congratulations Yair, you won!!!');
    });
    it('should draw if nobody won', () => {
      document.querySelector('#playerOne').value = 'Yair';
      document.querySelector('#playerTwo').value = 'Joseph';

      gameController.startGame(gameBoard);
      gameBoard.boardArray = [
        { name: 'Yair', num: 1 },
        { name: 'Yair', num: 2 },
        { name: 'Joseph', num: 3 },
        { name: 'Joseph', num: 4 },
        { name: 'Joseph', num: 5 },
        { name: 'Yair', num: 6 },
        { name: 'Yair', num: 7 },
        { name: 'Joseph', num: 8 },
      ];

      gameBoard.squares = [
        { innerText: 'x' },
        { innerText: 'x' },
        { innerText: 'o' },
        { innerText: 'o' },
        { innerText: 'o' },
        { innerText: 'x' },
        { innerText: 'x' },
        { innerText: 'o' },
        { innerText: '' },
      ];
      gameController.brd = gameBoard;
      gameController.play(8);
      const winMessage = document.querySelector('.winMessage p');
      expect(winMessage.innerHTML).toEqual("It's draw!!");
    });
  });
  describe('start the game', () => {
    test('display error message if players are null', () => {
      const rst = gameController.startGame(gameBoard);
      const alert = document.querySelector('.alert span');
      expect(rst).toEqual(false);
      expect(alert.innerHTML === '').toBeFalsy();
      expect(alert.innerHTML === 'Please enter your name to start the game!!').toBeTruthy();
    });
    test('display player turn if players inputs are not null', () => {
      document.querySelector('#playerOne').value = 'Yair';
      document.querySelector('#playerTwo').value = 'Joseph';
      const rst = gameController.startGame(gameBoard);
      const turn = document.querySelector('.player span');
      expect(rst).toEqual(true);
      expect(turn.innerHTML === "It is Yair's turn").toBeTruthy();
    });
  });
});