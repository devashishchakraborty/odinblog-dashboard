import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="container pico">
        <section>
          <h2>Welcome to Your OdinBlog Dashboard!</h2>
          <p>
            Your Creative Hub Awaits! Whether you're a seasoned blogger or
            just starting out, our Blog Dashboard is designed to make your
            content creation journey seamless, intuitive, and inspiring.
          </p>
        </section>
        <section>
          <h3>Key Features</h3>
          <ul>
            <li>
              Craft stunning blog posts with our rich text editor.
            </li>
            <li>
              Categorize your posts, add tags, and schedule content for future
              publishing.
            </li>
            <li>
              Manage comments, respond to feedback, and build a community around
              your blog.
            </li>
            <li>
              Your content is safe with us. Enjoy secure hosting, automatic
              backups, and peace of mind.
            </li>
          </ul>
        </section>
        <section>
          <h3>Get Started Today</h3>
          <p>
            Ready to take your blog to the next level? Explore the tools and
            features designed to help you succeed.
          </p>
          <Link role="button" to="/sign-up">
            Get Started &nbsp;&#10140;
          </Link>
        </section>
      </section>
    </>
  );
};

export default Home;
