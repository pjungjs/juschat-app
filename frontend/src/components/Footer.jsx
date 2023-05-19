import { Link } from "react-router-dom";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai"; 

function Footer() {
  return (
    <div className="bg-green-100 text-center lg:text-left">
      <div className="flex p-6 items-center justify-center border-b-2 border-gray-400">
        <div className="mr-12">
          <span>Get connected with the developer:</span>
        </div>
        <div className="flex justify-center">
          <a href="https://www.linkedin.com/in/jinseok-jung/" 
            className="mr-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin className="h-7 w-7 text-black hover:text-blue-700" />
          </a>
          <a href="https://github.com/pjungjs" 
            className="mr-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="h-7 w-7 text-black hover:text-blue-700" />
          </a>
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-11 md:grid-cols-2 lg:grid-cols-4">
          <div className="">
            <Link to="/">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start hover:underline">
                JusChat App
              </h6>
            </Link>
            <p>
              Tired of setting up an account and had to put all the personal and unnecessary informations?
              No more! Here in "JusChat" you can just log in and start chatting with whoever is online,
              or you can invite your friend just to chat.
              And if you wish to come back, you can set you basic informations.
              If not, your account will be automatically deleted, so no worries about security!
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p>
              <a href="https://github.com/pjungjs/juschat-app"
                className="text-neutral-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project's Repo
              </a>
            </p>
          </div>
          <div>
            <Link to="/about">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start hover:underline">
                About
              </h6>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-green-200 p-6 text-center">
        <span>© 2023 Copyright: </span>
        <span className="font-semibold">JusChat</span>
      </div>
    </div>
  )
}

export default Footer;