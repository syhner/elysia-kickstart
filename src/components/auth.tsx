export const SignIn = ({ innerText = 'Sign in' }) => {
  return (
    <button
      onclick="window.location.href='/api/auth/signin'"
      class='rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3'
    >
      {innerText}
    </button>
  );
};

export const SignOut = ({ innerText = 'Sign out' }) => {
  return (
    <button
      onclick="window.location.href='/api/auth/signout'"
      class='rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 px-3'
    >
      {innerText}
    </button>
  );
};
