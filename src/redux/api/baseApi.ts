import { createApi } from '@reduxjs/toolkit/query/react'
import { tagTypesList } from '../tag-types'
import { axiosBaseQuery } from '../../helpers/axiosBaseQuery'
export const baseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  endpoints: () => ({}),
  tagTypes:tagTypesList
})