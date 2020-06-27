import { httpClient } from 'src/api/http';

export async function loadArticles({ commit, dispatch }, { filterData, page, size }) {
  commit('fetchStationsBegin');

  try {
    const filterQueryParam = {
    }

    const queryParams = new URLSearchParams({
      filter: JSON.stringify(filterQueryParam),
      page: page,
      size: size
    }).toString()

    const response = await httpClient.get(`/stations?${queryParams}`)

    commit('fetchStationSuccess', {
      stations: response.Data,
      paging: response.Paging
    })

    if(response.stations && response.stations.length > 0) {
      return response.stations
    } else {
      return null
    }
  } catch (error) {
    commit('fetchStationsError', error)
    return null
  }
}
