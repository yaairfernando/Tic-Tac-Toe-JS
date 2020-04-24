import gameBoard from '../src/packages/gameBoard';

describe('The gameboard should', () => {
  beforeAll(() => {
    gameBoard.squares = [
      { innerText: '' },
      { innerText: 'x' },
      { innerText: 'o' },
    ];
    document.body.innerHTML = `
      <div class="main__container">
        <div class="main__container__square">o</div>
        <div class="main__container__square">x</div>
        <div class="main__container__square">x</div>
      </div>
    `;
  });

  test('be an object', () => {
    expect(typeof gameBoard).toEqual('object');
  });
  describe('check for empty squares and', () => {
    test("return true if it's empty", () => {
      expect(gameBoard.checkSquare(0)).toEqual(true);
    });
    test("return false if it's empty", () => {
      expect(gameBoard.checkSquare(1)).toEqual(false);
    });
  });
  test('have an empty board array at the beggining', () => {
    expect(gameBoard.boardArray.length).toEqual(0);
  });
  test('have 1 item in the boardarray after filling a square', () => {
    gameBoard.fillSquare({ name: 'joseph', mark: 'x' }, 1);
    expect(gameBoard.boardArray.length).toEqual(1);
  });

  describe('clear the board', () => {
    test('game board array is not empty', () => {
      expect(gameBoard.boardArray.length).toEqual(1);
    });
    test('game board array is empty', () => {
      gameBoard.clearBoard();
      expect(gameBoard.boardArray.length).toEqual(0);
    });
    test('squares should not be empty', () => {
      document.querySelectorAll('.main__container__square').forEach(square => {
        expect(square.innerHTML === '').toBeFalsy();
      });
    });
    test('squares should be empty', () => {
      gameBoard.clearBoard();
      document.querySelectorAll('.main__container__square').forEach(square => {
        expect(square.innerText).toEqual('');
        expect(square.innerText === '').toBeTruthy();
      });
    });
  });
});