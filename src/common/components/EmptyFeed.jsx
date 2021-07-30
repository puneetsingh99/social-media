import emptyImage from "../../assets/empty_robo.png";

export const EmptyFeed = ({ message }) => {
  return (
    <section>
      <img src={emptyImage} alt="shows that the feed is empty" />
      <h1>{message}</h1>
    </section>
  );
};
