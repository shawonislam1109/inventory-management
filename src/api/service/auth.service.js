import api from "../../api/apiConfig";
import { userLogin } from "../../store/reducer/auth";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ data }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted({ reset }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data._id);
          localStorage.setItem("branch", data.data.branch);
          dispatch(
            userLogin({
              user: data.data,
              token: data.token,
              branches: data.branches,
            })
          );
          reset();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signUp: build.mutation({
      query: ({ data }) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted({ reset, setError }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data._id);
          localStorage.setItem("branch", data.data.branch);
          dispatch(
            userLogin({
              user: data.data,
              token: data.token,
              branches: data.branches,
            })
          );
          reset();
        } catch (error) {
          setError(error?.data?.data.path, error?.data?.data.msg);
          console.log(error);
        }
      },
    }),

    getProfile: build.query({
      query: (profileId) => {
        return {
          url: `/profile/${profileId}`,
          method: "GET",
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useGetProfileQuery } =
  authApi;
