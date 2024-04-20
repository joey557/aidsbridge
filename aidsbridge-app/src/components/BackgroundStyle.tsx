const getBackgroundStyle = (imageUrl: string) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center 15%",
    backgroundRepeat: "no-repeat",
    height: "70vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "2rem",
    marginBottom: "100px",
  });
  
  export { getBackgroundStyle };