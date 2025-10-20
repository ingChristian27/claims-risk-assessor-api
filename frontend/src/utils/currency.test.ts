import { describe, it, expect } from 'vitest';
import { formatCurrency } from './currency';

describe('formatCurrency', () => {
  it('should format positive amounts correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(999999.99)).toBe('$999,999.99');
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should format small amounts correctly', () => {
    expect(formatCurrency(0.99)).toBe('$0.99');
    expect(formatCurrency(5.5)).toBe('$5.50');
  });

  it('should round to two decimal places', () => {
    expect(formatCurrency(10.999)).toBe('$11.00');
    expect(formatCurrency(10.444)).toBe('$10.44');
  });
});

