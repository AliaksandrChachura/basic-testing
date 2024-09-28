// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
const mockedAxios = axios as jest.Mocked<typeof axios>;

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts1';

    const axiosCreateMock = jest.spyOn(mockedAxios, 'create');

    jest.spyOn(mockedAxios.Axios.prototype, 'get').mockResolvedValueOnce('foo');

    await throttledGetDataFromApi(relativePath);

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts12345';

    const mockedGet = jest
      .spyOn(mockedAxios.Axios.prototype, 'get')
      .mockResolvedValueOnce('baz');

    await throttledGetDataFromApi(relativePath);

    expect(mockedGet).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = Math.random().toFixed(8);

    interface Item {
      id: number;
      name: string;
    }

    const mockedResolvedValue: Record<'data', Item[]> = {
      data: [
        {
          id: 1,
          name: 'wow',
        },
        {
          id: 2,
          name: 'baz',
        },
      ],
    };

    jest
      .spyOn(mockedAxios.Axios.prototype, 'get')
      .mockResolvedValueOnce(mockedResolvedValue);

    const expectedResponseItem = {
      id: expect.any(Number),
      name: expect.any(String),
    };

    const responseData = await throttledGetDataFromApi(relativePath);

    expect(responseData).toContainEqual(
      expect.objectContaining<typeof expectedResponseItem>(
        expectedResponseItem,
      ),
    );
  });
});
