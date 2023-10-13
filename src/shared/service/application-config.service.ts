import { BASE_API_URL } from "@/app.constants";


export class ApplicationConfigService {
    private endpointPrefix = BASE_API_URL;

    setEndpointPrefix(endpointPrefix: string): void {
        this.endpointPrefix = endpointPrefix;
    }

    getEndpointFor(api: string, microservice?: string): string {
        if (microservice) {
            return `${this.endpointPrefix}services/${microservice}/${api}`;
        }
        return `${this.endpointPrefix}${api}`;
    }
}
