import { httpClient } from '../../api/http';

export async function loadArticles({ commit, dispatch }, { config, category, filterData, sort, currentPage, perPage, search }) {
  commit('fetchArticlesBegin');

  try {
    const filterQueryParam = {
      attributes: populateFilterAttributeData(filterData.attributes),
      seoUrl: filterData.seoUrl,
      userType: filterData.userType,
      media: filterData.media
    }
    const strDate = correctTimeForDateRange(filterData.date)
    if (strDate) filterQueryParam.date = strDate

    const queryParams = new URLSearchParams({
      filter: JSON.stringify(filterQueryParam),
      sort: JSON.stringify(sort),
      skip: (currentPage - 1) * perPage,
      limit: perPage,
      search: search || ''
    }).toString()

    const response = await httpClient.get(`/categories/${category.slug}/articles?${queryParams}`)

    commit('fetchArticlesSuccess', {
      articles: response.articles,
      total: response.total
    })
    commit('SET_CURRENT_PAGE', currentPage)

    dispatch('loadEvaluatedPriceForArticles', {
      config
    })
    if(response.articles && response.articles.length > 0) {
      return response.articles
    } else {
      return null
    }
  } catch (error) {
    commit('fetchArticlesError', error)
    return null
  }
}
