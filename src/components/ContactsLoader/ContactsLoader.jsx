import { Puff } from "react-loader-spinner";
import css from "./ContactsLoader.module.css";

const ContactsLoader = () => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loaderWrapper}>
        <Puff
          visible={true}
          height="80"
          width="80"
          color="yellow"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default ContactsLoader;
