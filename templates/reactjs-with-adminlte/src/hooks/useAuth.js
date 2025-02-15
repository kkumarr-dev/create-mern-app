import { useDispatch } from 'react-redux'
import { apiRequest, formSubmitStart, formSubmitSuccess, formSubmitError, forwardTo } from 'Utilities'
import { AuthActions } from 'reducers/AuthReducer'

const useAuth = (data) => {

    const dispatch = useDispatch()
    
    const login = async (payload) => {
        try {
            formSubmitStart('login')
            const response = await apiRequest({
                method: 'POST',
                url: `auth/login`,
                data: payload
            })
            dispatch(AuthActions.setAuth(response.data.data))
            formSubmitSuccess('login', response.data.message)
        } catch (error) {
            formSubmitError('login', error)
        }
    }

    const signup = async (payload) => {
        try {
            formSubmitStart('signup')
            const response = await apiRequest({
                method: 'POST',
                url: `auth/signup`,
                data: payload
            })
            dispatch(AuthActions.setAuth(response.data.data))
            formSubmitSuccess('signup', response.data.message)
        } catch (error) {
            formSubmitError('signup', error)
        }
    }

    const getUsers = async () => {
        try {
            const response = await apiRequest({
                method: 'GET',
                url: `auth/users`,
            })
            dispatch(AuthActions.setUsers(response.data.data))
        } catch (error) {
            console.log('users', error)
        }
    }

    const logout = () => {
        dispatch(AuthActions.logout())
        forwardTo('/login')
    }

    return {
        login,
        signup,
        logout,
        getUsers
    }
};

export default useAuth;
