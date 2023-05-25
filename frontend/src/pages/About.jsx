
function About() {
  return (
    <div className="d-flex text-lg h-screen text-center justify-center py-10 bg-blue-100">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-800 uppercase mb-4">
          JusChat
        </h1>
        <h2 className="text-base font-semibold text-gray-500 mb-10">
          Pursuit 9.4 Cohort Module 4 Project
        </h2>
        <div className="space-y-2">
          <p>Have you ever being tired filling out all your information just to register an account?</p>
          <p>Well, say no more to those forms!</p>
          <p>In "JusChat", you can simply log in with the username and start chatting with your friend.</p>
          <p>After you are done, simply log out and don't need to be worried about having to remember your information.</p>
          <p>After logging out, your account and messages will be automatically deleted.</p>
          <p>But, if you want to come back and have your messages saved, just go to the settings and update your password.</p>
        </div>
      </div>
    </div>
  )
}

export default About;