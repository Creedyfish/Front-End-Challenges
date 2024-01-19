import "./App.css";

function App() {
  return (
    <div className="bg-off-black-neutral h-full flex justify-center items-center font-inter">
      <div className="bg-dark-grey-neutral p-8 flex flex-col gap-4 justify-center items-center rounded-md">
        <div className="flex">
          <img
            className="rounded-full h-20 w-20"
            src="/images/avatar-jessica.jpeg"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold text-white">
            Jessica Randall
          </div>
          <div className="text-sm font-semibold text-green-primary">
            London, United Kingdom
          </div>
        </div>
        <div className="text-white text-sm py-2 px-4">
          "Front-end developer and avid reader."
        </div>
        <button className="font-semibold text-sm p-3 rounded-md text-white bg-grey-neutral w-full flex justify-center items-center hover:text-off-black-neutral hover:bg-green-primary focus:text-off-black-neutral focus:bg-green-primary transition-colors duration-200 ease-in-out">
          GitHub
        </button>
        <button className="font-semibold text-sm p-3 rounded-md text-white bg-grey-neutral w-full flex justify-center items-center hover:text-off-black-neutral hover:bg-green-primary focus:text-off-black-neutral focus:bg-green-primary transition-colors duration-200 ease-in-out">
          Frontend Mentor
        </button>
        <button className="font-semibold text-sm p-3 rounded-md text-white bg-grey-neutral w-full flex justify-center items-center hover:text-off-black-neutral hover:bg-green-primary focus:text-off-black-neutral focus:bg-green-primary transition-colors duration-200 ease-in-out">
          LinkedIn
        </button>
        <button className="font-semibold text-sm p-3 rounded-md text-white bg-grey-neutral w-full flex justify-center items-center hover:text-off-black-neutral hover:bg-green-primary focus:text-off-black-neutral focus:bg-green-primary transition-colors duration-200 ease-in-out">
          Twitter
        </button>
        <button className="font-semibold text-sm p-3 rounded-md text-white bg-grey-neutral w-full flex justify-center items-center hover:text-off-black-neutral hover:bg-green-primary focus:text-off-black-neutral focus:bg-green-primary transition-colors duration-200 ease-in-out">
          Instagram
        </button>
      </div>
    </div>
  );
}

export default App;
