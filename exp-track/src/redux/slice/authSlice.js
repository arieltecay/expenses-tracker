import { createSlice } from "@reduxjs/toolkit"

//initial state
const authSlice = createSlice({
	name: "auth",
	initialState: {
		//check if user is authenticated in localstorage
		user: JSON.parse(localStorage.getItem("userInfo")) || null,
	},
	reducers: {
		authSuccess: (state, action) => {
			state.user = action.payload
		},
		authFail: (state) => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
			state.loading = false
		},
		logout: (state) => {
			state.user = null
		},
	},
})

//Genereate actions
export const { authSuccess, authFail, logout } = authSlice.actions

//generate reducers
const authReducer = authSlice.reducer
export default authReducer
