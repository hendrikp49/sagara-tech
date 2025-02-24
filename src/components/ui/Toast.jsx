const Toast = ({ children }) => {
  return (
    <div className="absolute line-clamp-1 top-5 right-5 rounded-lg bg-slate-800 p-4 text-foreground">
      <p>{children}</p>
    </div>
  );
};

export default Toast;
