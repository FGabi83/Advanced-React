function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

describe('sample test 101', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
    const age = 100;
    expect(age).toEqual(100);
  });
  it('can add numbers together', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('can add strings of number together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
