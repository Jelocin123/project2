import './App.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import Layout from './layout/Layout';

///-------ADMIN IMPORT ---------\\\
import HomeAdmin from './views/admin/HomeAdmin';
import LayoutAdmin from './layout/admin/LayoutAdmin';
import ServiceHome from './views/servicehome/ServiceHome';
import AboutUs from './views/admin/aboutus/EditAboutUsAdmin';
import SliderService from './views/slider/SliderService';
import Vejret from './views/openweather/Vejret';
import VejretDAWAMap from './views/openweather/VejretDAWAMap';
import News1 from './views/news/News';
import EnergiData from './views/energi/EnergiData';
import EnergiDato from './views/energi/EnergiDato';
import PostReview from './views/admin/AdminSlider/PostReview';
import RetReview from './views/admin/AdminSlider/RetReviewAdmin';
import DelReview from './views/admin/AdminSlider/DeleteReview';
import SpaceX from './views/DoSelfApi/SpaceX';




function App () {

  const router = createBrowserRouter(

    createRoutesFromElements(
      <>

        {/* PUBLIC */ }
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="/servicehome/" element={ <ServiceHome /> } />
          <Route path="/sliderservice/" element={ <SliderService /> } />
          <Route path="/vejret/" element={ <Vejret /> } />
          <Route path="/vejretdawamap/" element={ <VejretDAWAMap /> } />
          <Route path="/news/" element={ <News1 /> } />
          <Route path="/energidata/" element={ <EnergiData /> } />
          <Route path="/energidato/" element={ <EnergiDato /> } />
          <Route path="/spacex/" element={ <SpaceX /> } />









          

         


        


          <Route path="*" element={ <NotFound /> } />

        </Route>


        {/* ADMIN */ }
        <Route path="/admin" element={ <LayoutAdmin /> }>
        <Route path="/admin/aboutus/" element={ <AboutUs /> } />
        <Route path="/admin/postreview/" element={ <PostReview /> } />
        <Route path="/admin/retreview/" element={ <RetReview /> } />
        <Route path="/admin/delreview/" element={ <DelReview /> } />





        


        

          <Route index element={ <HomeAdmin /> } />
          <Route path="*" element={ <NotFound /> } />

        </Route>


      </>
    )
  )


  return (
    <main className="container-fluid  p-lg-0">
      <RouterProvider router={ router } />
    </main>
  );
}

export default App;
