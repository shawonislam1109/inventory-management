import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const init = {
  isLoggedIn: false,
  user: null,
  token: null,
  mode: false,
  branch: null,
};

// +> SET BRANCH IN STATE
const activeBranch = (state, branchId, payload) => {
  localStorage.setItem("branch", branchId);
  if (localStorage.getItem("branch")) {
    const branchGetItem = localStorage.getItem("branch");
    const findBranch = payload?.find((item) => item._id === branchGetItem);
    state.branch = findBranch;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: init,
  reducers: {
    userLogin: (state, { payload }) => {
      const branchId = localStorage.getItem("branch");
      state.isLoggedIn = true;
      state.token = payload.token;
      state.user = payload.user;
      activeBranch(state, branchId, payload?.branches);
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.clear();
      redirect("/auth/login");
    },

    // -> ACTIVE BRANCH SET UP
    activeBranchSetup: (state, { payload }) => {
      activeBranch(state, payload.branch, payload.branches);
    },

    setMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const { userLogin, userLogout, setMode, activeBranchSetup } =
  authSlice.actions;
export default authSlice.reducer;
