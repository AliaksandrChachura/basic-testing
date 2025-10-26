// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  let account = getBankAccount(100);
  let mockFetchBalanceSuccess: jest.Mock<Promise<number>, []>;
  let mockFetchBalanceFailure: jest.Mock<Promise<null>, []>;

  beforeEach(() => {
    account = getBankAccount(100);
    mockFetchBalanceSuccess = jest.fn().mockResolvedValue(200);
    mockFetchBalanceFailure = jest.fn().mockResolvedValue(null);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const targetAccount = getBankAccount(0);
    expect(() => account.transfer(150, targetAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(25, account)).toThrow();
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const targetAccount = getBankAccount(50);
    account.transfer(50, targetAccount);
    expect(account.getBalance()).toBe(50);
    expect(targetAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    account.fetchBalance = mockFetchBalanceSuccess;
    await expect(account.fetchBalance()).resolves.toBe(200);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    account.fetchBalance = mockFetchBalanceSuccess;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = mockFetchBalanceFailure;
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
