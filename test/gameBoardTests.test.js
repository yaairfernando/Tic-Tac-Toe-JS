import gameBoard from '../src/packages/gameBoard';

describe('The gameboard should', () => {
  test('be an object', () => {
    expect(typeof gameBoard).toEqual('object');
  });
  describe('check for empty squares and', () => {
    const squares = [
      { innerText: '' },
      { innerText: 'x' },
      { innerText: 'o' },
    ];
    test("return true if it's empty", () => {
      expect(gameBoard.checkSquare(0, squares)).toEqual(true);
    });
    test("return false if it's empty", () => {
      expect(gameBoard.checkSquare(1, squares)).toEqual(false);
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