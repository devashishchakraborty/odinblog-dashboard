const Profile = ({ user, token }) => {
  return (
    <section className="pico container">
      <div>
        <b>Name</b>: {user.name}
      </div>
      <div>
        <b>Email</b>: {user.email}
      </div>
      <div>
        <b>API Key</b>:{" "}
        <button
          onClick={() => {
            navigator.clipboard.writeText(token);
          }}
        >
          Copy API Key
        </button>
      </div>
    </section>
  );
};

export default Profile;
