import gameBoard from '../src/packages/gameBoard';

describe('The gameboard should', () => {
  beforeAll(() => {
    gameBoard.squares = [
      { innerText: '' },
      { innerText: 'x' },
      { innerText: 'o' },
    ];
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
});