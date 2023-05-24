import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-cyan-100 h-screen flex flex-grow items-center justify-center">
      <div>
        <h1 className="text-4xl">Page Not Found!</h1>
        {/* <div className="flex flex-col items-center p-10 space-y-5">
            <div className="text-xl">
              Take me&nbsp;
            <Link to='/' className="text-3xl text-blue-500 hover:text-blue-300 hover:underline">
              Home
            </Link>
            &nbsp;!
          </div>
          <div className="text-xl">
            What is this&nbsp;
            <Link to='/about' className="text-3xl text-blue-500 hover:text-blue-300 hover:underline">
              About
            </Link>
            &nbsp;?
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default NotFound;