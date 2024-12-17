import {createBrowserRouter} from 'react-router-dom'
import MainPages from './pages/MainPages'
import Indonesia from './pages/Indonesia'
import Programming from './pages/Programming'
import SavedNews from './pages/SavedNews'
import SearchPages from './pages/SearchPages'

const router = createBrowserRouter([
    {
    path: '',
    element: <MainPages/>,
    children: [
        {
            path: '/',
            element: <Indonesia />
        },
        {
            path: '/programming',
            element: <Programming />
        },
        {
            path: '/saved',
            element: <SavedNews/>
        },
        {
            path: '/search/:query',
            element: <SearchPages/>
        }
    ]
}
])

export default router