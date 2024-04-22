const serverURL = 'http://localhost:3000';

export const search = async <T>(path: string, params: any = {}): Promise<T[]> => {
    const query: URLSearchParams = new URLSearchParams(params);
    const response = await fetch(`${serverURL}/${path}?${query}`, {
        method: 'GET',
    })
    return response.json();
}