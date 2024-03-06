import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GoBackBtn } from '../../components/GoBackBtn/GoBackBtn';
import css from "./NotFoundPage.module.css";
import img from "../../assets/404notFound.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5); // Початкове значення таймера

  useEffect(() => {
    // Запускаємо таймер, який кожної секунди зменшує лічильник
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Перенаправляємо користувача на головну сторінку після 10 секунд
    const timeout = setTimeout(() => {
      if (location.pathname.startsWith("/movies")) {
        navigate("/movies");
      } else {
        navigate("/");
      }
    }, 5000); // 5 секунд

    // При знищенні компонента очищаємо таймер
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div>
      {/* <GoBackBtn path="/">Back to home page</GoBackBtn> */}
      <h2 className={css.title}>
        Oops! It seems like the page you`re looking for doesn`t exist.
      </h2>
      <div className={css.textWrap}>
        <p className={css.text}>
          Redirecting to{" "}
          {location.pathname.startsWith("/movies") ? "movies" : "home"} page in
        </p>
        <p className={css.seconds}>{secondsLeft}</p>
        <p className={css.text}>seconds...</p>
      </div>
      <img src={img} className={css.img} alt="404 page img" />
    </div>
  );
};

export default NotFoundPage;
