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
    `
  });

  test('be an object', () => {
    expect(typeof gameController).toEqual('object');
  });
  describe('start the game', () => {
    test("display error message if players are null", () => {
      let rst = gameController.startGame(gameBoard)
      let alert = document.querySelector('.alert span')
      expect(rst).toEqual(false);
      expect(alert.innerHTML === '').toBeFalsy();
      expect(alert.innerHTML === 'Please enter your name to start the game!!').toBeTruthy();
    });
    test("display player turn if players inputs are not null", () => {
      document.querySelector('#playerOne').value = 'Yair'
      document.querySelector('#playerTwo').value = 'Joseph'
      let rst = gameController.startGame(gameBoard)
      let turn = document.querySelector('.player span')
      expect(rst).toEqual(true);
      expect(turn.innerHTML === "It is Yair's turn").toBeTruthy();
    });
  });

});