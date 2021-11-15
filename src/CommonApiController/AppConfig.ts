import { METHOD } from '../helpers';

/**
 * Define endpoint menthod and header for API
 */
export const endPoints = {
	AuthToken: { endpoint: '/auth', method: METHOD.POST },
	Results: { endpoint: '/results', method: METHOD.GET }
};
