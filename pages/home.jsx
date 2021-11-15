const Home = () => {
  return (
    <div>
      <section className="bg-blue-50 p-6 flex justify-around items-center">
        <div>
          <h1 className="text-blue-600 font-semibold text-4xl">
            Good Morning Paul!
          </h1>
          <p className="text-gray-600 text-xl my-4">
            How are you feeling today? Take a survey today
          </p>
          <button className="bg-blue-600 shadow-md px-4 py-2 text-white rounded">
            Take a survey
          </button>
        </div>
        <div>
          <img src="/images/home-vector.png" className="h-56" />
        </div>
      </section>
    </div>
  );
};

export default Home;
