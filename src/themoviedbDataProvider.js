
import { GET_LIST, GET_ONE } from 'react-admin';
import { fetchUtils } from 'react-admin';

const API_URL = 'https://api.themoviedb.org';
const API_KEY = '91dd36dcc51c92862485f14714c32742';
const LANGUAGE = 'en-US';
const queryString = require('query-string');
const truncate = require('truncate');

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'movies, genres'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {

    switch (type) {

    case GET_LIST: {
        if (resource === 'movies' && !params.query) {
            const now  = new Date();
            const query = {
                api_key: API_KEY,
                language: LANGUAGE,
                sort_by: "revenue.desc",
                "vote_count.gte": 50,
                page: params.page || 1,
                "primary_release_date.gte":
                    params && params.release_date_after ?
                        params.release_date_after :
                        new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split("T")[0],
            }
            return { url: `${API_URL}/3/discover/movie?${queryString.stringify(query)}` };
        } else if (resource === 'movies' && params.query) {
            const query = {
                api_key: API_KEY,
                language: LANGUAGE,
                page: params.page || 1,
                query: params.query,
            }
            return { url: `${API_URL}/3/search/movie?${queryString.stringify(query)}` };
        } else if (resource === 'genres') {
            const query = {
                api_key: API_KEY
            }
            return { url: `${API_URL}/3/genre/movie/list?${queryString.stringify(query)}` };
        } else if (resource === 'casts') {
            const query = {
                api_key: API_KEY
            }
            return { url: `${API_URL}/3/movie/${params.movie_id}/casts?${queryString.stringify(query)}` };
        }
        break;
    }

    case GET_ONE: {
        const query = {
            api_key: API_KEY
        }
        return { url: `${API_URL}/3/movie/${params.id}?${queryString.stringify(query)}` };
    }

    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};


/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'movies, genres'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const poster_base_url = "http://image.tmdb.org/t/p/w342";
const avatar_base_url = "http://image.tmdb.org/t/p/w92";
const poster_show_base_url = "http://image.tmdb.org/t/p/w500/";
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { json } = response;
    switch (type) {
    case GET_LIST: {
        if (resource === 'movies') {
            return ({
                data: json.results.map( x => {
                    return ({
                        ...x,
                        ...{image_path: x.poster_path ? `${poster_base_url}${x.poster_path}` : ""},
                        ...{avatar_path: x.poster_path ? `${avatar_base_url}${x.poster_path}` : ""},
                        ...{short_overview: x.overview.length > 240
                                ? truncate(x.overview, 240) : x.overview},
                    });
                }),
                total: json.results.length,
            });
        } else if (resource === 'genres') {
            return ({
                data: json.genres,
                total: json.genres.length
            });
        } else if (resource === 'casts') {
            return ({
                data: json.cast.map( x => ({
                    ...x,
                    ...{"profile_path": avatar_base_url + x.profile_path}
                })),
                total: json.cast.length,
            });
        }
        break;
    }
    case GET_ONE: {
        json["image_path"] = poster_show_base_url + json.poster_path;
        const logos = json.production_companies.reduce(
            (acc, c) => {
                if (c.logo_path) {
                    const logoPath = c.logo_path.split(".png")[0] + ".svg";
                    acc.push(avatar_base_url + logoPath);
                }
                return acc;
            } , []
        );
        console.log(logos);
        json["company_logos"] = logos;
        return {
            data: json
        };
    }
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "movies, genres"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
	const { fetchJson } = fetchUtils;
	const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
	return fetchJson(url, options)
		.then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};
