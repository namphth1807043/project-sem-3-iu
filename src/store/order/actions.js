import {httpClient} from 'src/api/http';

export async function loadOrders({commit, dispatch}, {filter, page, size}) {
  commit('fetchOrdersBegin');

  try {
    const queryParams = new URLSearchParams({
      ...filter,
      page: page,
      size: size
    }).toString()
    const response = await httpClient.get(`/orders?${queryParams}`)

    commit('fetchOrdersSuccess', {
      orders: response.Data,
      paging: response.Paging
    })

    if (response.orders && response.orders.length > 0) {
      return response.orders
    } else {
      return null
    }
  } catch (error) {
    commit('fetchOrdersError', error)
    return null
  }
}

export async function loadOrderDetail({commit, dispatch}, {orderId}) {
  commit('fetchOrderBegin');

  try {

    const response = await httpClient.get(`/orders/${orderId}`)
    console.log(response)
    commit('fetchOrderSuccess', {
      orderDetail: response
    })

    if (response && response.length > 0) {
      return response
    } else {
      return null
    }
  } catch (error) {
    commit('fetchOrderError', error)
    return null
  }
}

export async function updateOrder({commit}, {order}) {
  commit('updateOrderBegin')

  const data = {
    ...order
  }

  try {
    order = await httpClient.put(`/orders/${order.Id}`, data)

    commit('updateOrderSuccess', {
      order: {...order},
      isSaved: true
    })
  } catch (error) {
    commit('updateOrderError', error)
  }
}

export function clearFilter({commit}) {
  commit('clearStateFilter')
}
