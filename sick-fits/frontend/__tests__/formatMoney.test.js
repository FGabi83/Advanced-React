import formatMoney from '../lib/formatMoney';

const formatMoneyFn = formatMoney.default || formatMoney;

describe('formatMoney function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoneyFn(1)).toEqual('$0.01');
    expect(formatMoneyFn(10)).toEqual('$0.10');
    expect(formatMoneyFn(9)).toEqual('$0.09');
  });
  it('leaves off cents when its a whole dollar amount', () => {
    expect(formatMoneyFn(5000)).toEqual('$50');
    expect(formatMoneyFn(400)).toEqual('$4');
    expect(formatMoneyFn(0)).toEqual('$0');
  });
  it('works with whole and fractional dollars', () => {
    expect(formatMoneyFn(140)).toEqual('$1.40');
    expect(formatMoneyFn(5012)).toEqual('$50.12');
    expect(formatMoneyFn(110)).toEqual('$1.10');
  });
});
