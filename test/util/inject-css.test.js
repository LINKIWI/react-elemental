import injectCSS from 'util/inject-css';

describe('Inject CSS', () => {
  const mockNode = {};

  beforeEach(() => {
    global.document.createElement = jest.fn(() => mockNode);
    global.document.body.appendChild = jest.fn();
  });

  test('CSS is injected into document head as style object', () => {
    injectCSS('css');

    expect(global.document.createElement).toBeCalledWith('style');
    expect(global.document.body.appendChild).toBeCalledWith(mockNode);
    expect(mockNode.innerHTML).toBe('css');
  });
});
