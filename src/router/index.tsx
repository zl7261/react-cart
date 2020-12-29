import React, {createContext, useContext, useState} from 'react'
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom'
import Cart from '../cart'
import ReactPortal from '../cart/ReactPortal'


export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <AuthButton/>

                    <ul>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/public">
                            <ReactPortal/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <PrivateRoute path="/protected">
                            <Cart/>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    )
}

const fakeAuth = {
    isAuthenticated: false,
    signIn(cb: Function) {
        fakeAuth.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signOut(cb: Function) {
        fakeAuth.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const authContext = createContext(Object.create(null, {}))


const useProvideAuth = () => {
    const [user, setUser] = useState('' as string | null)

    const signIn = (cb: Function) => {
        return fakeAuth.signIn(() => {
            setUser('user')
            cb()
        })
    }

    const signOut = (cb: Function) => {
        return fakeAuth.signOut(() => {
            setUser(null)
            cb()
        })
    }

    return {
        user,
        signIn,
        signOut
    }
}

const ProvideAuth = (props: { children: React.ReactComponentElement<any> }) => {
    const auth = useProvideAuth()
    return (
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext)


const AuthButton = () => {
    let history = useHistory()
    let auth = useAuth()

    return auth.user ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    auth.signOut(() => history.push('/'))
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

const PrivateRoute = ({children, ...rest}: any) => {
    let auth = useAuth()
    return (
        <Route
            {...rest}
            render={({location}: any) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    )
}


function LoginPage() {
    let history = useHistory()
    let location = useLocation()
    let auth = useAuth()

    let {from}: any = location.state || {from: {pathname: '/'}}
    let login = () => {
        auth.signIn(() => {
            history.replace(from)
        })
    }

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    )
}
