import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface ApiResponse {
    data: any;
}

export default function createApi(endpoint: string): { fetchData(): Promise<ApiResponse> } {
    const api: AxiosInstance = axios.create({
        baseURL: endpoint,
    });

    return {
        async fetchData(): Promise<ApiResponse> {
            try {
                const response: AxiosResponse<ApiResponse> = await api.get('');
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    };
}
