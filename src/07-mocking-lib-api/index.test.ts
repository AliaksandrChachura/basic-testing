// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';
const mockedAxios = axios as jest.Mocked<typeof axios>;

const baseURL = 'https://jsonplaceholder.typicode.com';

const createMockAxiosInstance = (getMock: jest.Mock): AxiosInstance => {
  return {
    get: getMock,
  } as unknown as AxiosInstance;
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts1';

    const mockGet = jest.fn().mockResolvedValue('foo');

    const axiosCreateMock = jest
      .spyOn(mockedAxios, 'create')
      .mockReturnValue(createMockAxiosInstance(mockGet));

    await throttledGetDataFromApi(relativePath);
    await jest.runAllTimersAsync();

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts12345';

    const mockGet = jest.fn().mockResolvedValue('baz');

    jest
      .spyOn(mockedAxios, 'create')
      .mockReturnValue(createMockAxiosInstance(mockGet));

    await throttledGetDataFromApi(relativePath);
    await jest.runAllTimersAsync();

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = Math.random().toFixed(8);

    interface Item {
      id: number;
      name: string;
    }

    const mockedResolvedValue: Item[] = [
      {
        id: 1,
        name: 'wow',
      },
      {
        id: 2,
        name: 'baz',
      },
    ];

    const mockGet = jest.fn().mockResolvedValue({ data: mockedResolvedValue });

    jest
      .spyOn(mockedAxios, 'create')
      .mockReturnValue(createMockAxiosInstance(mockGet));

    const expectedResponseItem = {
      id: expect.any(Number),
      name: expect.any(String),
    };

    const responseData = await throttledGetDataFromApi(relativePath);
    await jest.runAllTimersAsync();

    expect(responseData).toContainEqual(
      expect.objectContaining<typeof expectedResponseItem>(
        expectedResponseItem,
      ),
    );
  });
});
