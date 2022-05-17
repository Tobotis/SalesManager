import NavigationBar from "./NavigationBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
