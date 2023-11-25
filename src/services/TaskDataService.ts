import GeneralSettings from '@/config/general';
import axios from 'axios';

class TaskDataService {
    static baseURL = GeneralSettings.baseURL;

    static getAll(): Promise<any> {
        return axios.get(this.baseURL + 'tasks');
    }

    static get(id: string): Promise<any> {
        return axios.get(this.baseURL +'tasks/' + id);
    }

    static create(title: string, priority: string): Promise<any> {
        return axios.post(this.baseURL + 'tasks', {
            title,
            priority,
        });
    }

    static update(task: string, title: string, priority: string): Promise<any> {
        return axios.put(this.baseURL + 'tasks/' + task, {
            title,
            priority,
        });
    }

    static delete(task: string): Promise<any> {
        return axios.delete(this.baseURL + 'tasks/' + task);
    }
}

export default TaskDataService;
