import axios  from 'axios';
import GeneralSettings from '@/config/general';

const apiClient: AxiosInstance = axios.create({
  baseURL: GeneralSettings.baseURL,
  headers: {
    'Content-type': 'application/json',
    'Client-tiers': 'oca-vue-app',
  },
  timeout: 60000,
});

export default apiClient;
