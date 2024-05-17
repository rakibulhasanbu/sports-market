import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypesList";
import { serverUrl } from "../../config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    credentials: "include",
  }),

  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
