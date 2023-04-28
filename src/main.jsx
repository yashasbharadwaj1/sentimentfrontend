import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MovieFilterForm from "./MovieFilterForm.jsx";
import AllVerdicts from "./AllVerdicts.jsx";
import './index.css'
import E from "./E.jsx";
import IndustryVerdicts from "./IndustryVerdicts.jsx";
import HeroAnalytics from "./HeroAnalytics.jsx";
import HeroineAnalytics from "./HeroineAnalytics.jsx";
import FilterByVerdict from "./FilterByVerdict.jsx";



import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
    {
        path: "/sentimentfrontend/",
        element: <App />,
    },
    {
        path: "/sentimentfrontend/Explanation",
        element: <E/>,
    },
    {
        path: "/sentimentfrontend/Allverdicts",
        element: <AllVerdicts/>,
    },
    {
        path: "/sentimentfrontend/Filtersentimentbymovie",
        element: <MovieFilterForm/>,
    },
    {
        path: "/sentimentfrontend/FiltersentimentbyIndustry",
        element: <IndustryVerdicts/>,
    },
    {
        path: "/sentimentfrontend/FiltersentimentbyHero",
        element: <HeroAnalytics/>,
    },
    {
        path: "/sentimentfrontend/FiltersentimentbyHeroine",
        element: <HeroineAnalytics/>,
    },
    {
        path: "/sentimentfrontend/Filterdatabyverdict",
        element: <FilterByVerdict/>,
    },


]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
