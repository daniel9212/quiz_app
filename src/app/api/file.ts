import { promises as fs } from 'fs';

interface Response<T> {
  data: T,
  error: Error | null,
}

export async function readFromFile<T>(filePath: string): Promise<Response<T>> {
  const response: Response<T> = {
    data: {} as T,
    error: null,
  };

  try {
    const file = await fs.readFile(`${process.cwd()}${filePath}`, 'utf8');
    response.data = JSON.parse(file);
  } catch (error) {
    response.error = error as Error;
  }

  return response;
};

export async function writeToFile(filePath: string, data: string): Promise<{ error: Error }> {
  const response = {
    error: null! as Error,
  };

  try {
    await fs.writeFile(`${process.cwd()}${filePath}`, data);
  } catch (error) {
    response.error = error as Error;
  }

  return response;
};