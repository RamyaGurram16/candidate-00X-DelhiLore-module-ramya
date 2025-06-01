import Header from './components/Header';
import Footer from './components/Footer';
import StoryGrid from './components/StoryGrid';
import SubmitForm from './components/SubmitForm';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div id="home">
        <section className="hero">
          <h2>Welcome to DelhiLore</h2>
          <p>Discover and share hidden stories of Delhi through photos, poems, and local lore.</p>
        </section>
      </div>

      <div id="stories">
        <StoryGrid />
      </div>

      <div id="submit">
        <SubmitForm />
      </div>

      <Footer />
    </>
  );
}

export default App;
