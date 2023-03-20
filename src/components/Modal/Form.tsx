export const Form = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
